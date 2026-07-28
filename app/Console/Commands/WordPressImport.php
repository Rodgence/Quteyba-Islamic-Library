<?php

namespace App\Console\Commands;

use App\Models\Opportunity;
use App\Models\Page;
use App\Models\Media;
use App\Models\Redirect;
use App\Models\WordPressImportLog;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class WordPressImport extends Command
{
    /**
     * The name and signature of the console command.
     */
    protected $signature = 'wordpress:import
        {--source=xml : Source type: xml, api, or sql}
        {--dry-run : Run without persisting changes}
        {--only= : Import only: pages, posts, or media}
        {--resume : Resume from last interrupted import}';

    /**
     * The console command description.
     */
    protected $description = 'Import content from WordPress XML export, API, or SQL dump';

    private bool $dryRun = false;
    private string $only = '';
    private array $stats = ['imported' => 0, 'skipped' => 0, 'failed' => 0, 'redirects' => 0];

    public function handle(): int
    {
        $this->dryRun = $this->option('dry-run');
        $this->only = $this->option('only') ?? '';

        $source = $this->option('source');

        if ($this->dryRun) {
            $this->info('🚀 Running in DRY RUN mode - no changes will be persisted.');
        }

        $this->info("Starting WordPress import from {$source}...");

        return match ($source) {
            'xml' => $this->importFromXml(),
            'api' => $this->importFromApi(),
            'sql' => $this->importFromSql(),
            default => $this->errorAndExit("Unknown source: {$source}"),
        };
    }

    private function importFromXml(): int
    {
        $path = storage_path('app/import/wordpress/export.xml');

        if (! file_exists($path)) {
            return $this->errorAndExit("XML file not found at: {$path}");
        }

        $this->info("Reading XML from {$path}...");
        $xml = simplexml_load_file($path);

        if (! $xml) {
            return $this->errorAndExit('Failed to parse XML file.');
        }

        $namespaces = $xml->getNamespaces(true);
        $wp = $namespaces['wp'] ?? null;
        $content = $namespaces['content'] ?? null;
        $excerpt = $namespaces['excerpt'] ?? null;

        $channel = $xml->channel;

        $this->processItems($channel->item ?? [], $wp, $content, $excerpt);
        $this->printStats();

        return 0;
    }

    private function importFromApi(): int
    {
        $baseUrl = env('WORDPRESS_API_URL');

        if (! $baseUrl) {
            return $this->errorAndExit('WORDPRESS_API_URL not set in .env');
        }

        $this->info("Importing from WordPress API: {$baseUrl}");
        $this->processApiPosts($baseUrl);
        $this->processApiPages($baseUrl);
        $this->processApiMedia($baseUrl);
        $this->printStats();

        return 0;
    }

    private function importFromSql(): int
    {
        $path = storage_path('app/import/wordpress/database.sql');

        if (! file_exists($path)) {
            return $this->errorAndExit("SQL file not found at: {$path}");
        }

        $this->info("SQL import not yet implemented. Import the SQL dump into a separate database and use --source=api instead.");
        $this->printStats();

        return 0;
    }

    private function processItems($items, $wp, $content, $excerpt): void
    {
        $total = count($items);
        $this->info("Processing {$total} items...");
        $bar = $this->output->createProgressBar($total);
        $bar->start();

        foreach ($items as $item) {
            $postType = (string) $item->children($wp)->post_type;
            $status = (string) $item->children($wp)->status;

            if ($status === 'trash' || $status === 'auto-draft') {
                $bar->advance();
                continue;
            }

            try {
                if ($postType === 'post' && ($this->only === '' || $this->only === 'posts')) {
                    $this->importPost($item, $wp, $content, $excerpt);
                } elseif ($postType === 'page' && ($this->only === '' || $this->only === 'pages')) {
                    $this->importPage($item, $wp, $content);
                } elseif ($postType === 'attachment' && ($this->only === '' || $this->only === 'media')) {
                    $this->importMedia($item, $wp);
                }
            } catch (\Throwable $e) {
                $this->stats['failed']++;
                $this->logImport('post', (int) $item->children($wp)->post_id, 'failed', $e->getMessage());
            }

            $bar->advance();
        }

        $bar->finish();
        $this->newLine();
    }

    private function importPost($item, $wp, $content, $excerpt): void
    {
        $wpId = (int) $item->children($wp)->post_id;
        $title = (string) $item->title;
        $link = (string) $item->link;
        $postDate = (string) $item->children($wp)->post_date;
        $postContent = (string) $item->children($content)->encoded;
        $postExcerpt = (string) $item->children($excerpt)->encoded;
        $postStatus = (string) $item->children($wp)->status;
        $postSlug = (string) $item->children($wp)->post_name ?: Str::slug($title);

        $existing = Opportunity::where('wordpress_id', $wpId)->first();
        if ($existing) {
            if ($this->option('resume')) {
                $existing->update(['content' => json_encode(['ar' => $this->sanitizeHtml($postContent)])]);
            }
            $this->stats['skipped']++;
            $this->logImport('post', $wpId, 'skipped', 'Already exists');
            return;
        }

        $statusMap = ['publish' => 'published', 'draft' => 'draft', 'pending' => 'draft', 'future' => 'scheduled'];

        $data = [
            'wordpress_id' => $wpId,
            'title' => json_encode(['ar' => $title]),
            'slug' => $postSlug,
            'excerpt' => json_encode(['ar' => $postExcerpt]),
            'content' => json_encode(['ar' => $this->sanitizeHtml($postContent)]),
            'original_content' => json_encode(['ar' => $postContent]),
            'status' => $statusMap[$postStatus] ?? 'draft',
            'published_at' => $postDate !== '0000-00-00 00:00:00' ? $postDate : null,
            'old_wordpress_url' => $link,
        ];

        $this->mapCategories($data, $item);
        $this->mapMeta($data, $item, $wp);

        if ($this->dryRun) {
            $this->stats['imported']++;
            return;
        }

        DB::transaction(function () use ($data, $wpId, $link) {
            $opportunity = Opportunity::create($data);
            $this->createRedirect($link, $opportunity);
            $this->stats['imported']++;
            $this->logImport('post', $wpId, 'imported', 'OK', ['local_id' => $opportunity->id]);
        });
    }

    private function importPage($item, $wp, $content): void
    {
        $wpId = (int) $item->children($wp)->post_id;
        $title = (string) $item->title;
        $link = (string) $item->link;
        $postContent = (string) $item->children($content)->encoded;
        $postSlug = (string) $item->children($wp)->post_name ?: Str::slug($title);

        $existing = Page::where('wordpress_id', $wpId)->first();
        if ($existing) {
            $this->stats['skipped']++;
            $this->logImport('page', $wpId, 'skipped', 'Already exists');
            return;
        }

        $data = [
            'wordpress_id' => $wpId,
            'title' => json_encode(['ar' => $title]),
            'slug' => $postSlug,
            'content' => json_encode(['ar' => $this->sanitizeHtml($postContent)]),
            'status' => 'published',
            'old_wordpress_url' => $link,
        ];

        if ($this->dryRun) {
            $this->stats['imported']++;
            return;
        }

        DB::transaction(function () use ($data, $wpId, $link) {
            $page = Page::create($data);
            $this->createRedirect($link, $page);
            $this->stats['imported']++;
            $this->logImport('page', $wpId, 'imported', 'OK', ['local_id' => $page->id]);
        });
    }

    private function importMedia($item, $wp): void
    {
        $wpId = (int) $item->children($wp)->post_id;
        $title = (string) $item->title;
        $attachmentUrl = (string) $item->children($wp)->attachment_url;
        $link = (string) $item->link;

        if (! $attachmentUrl) {
            $this->stats['failed']++;
            $this->logImport('media', $wpId, 'failed', 'No attachment URL');
            return;
        }

        $existing = Media::where('wordpress_id', $wpId)->first();
        if ($existing) {
            $this->stats['skipped']++;
            return;
        }

        if ($this->dryRun) {
            $this->stats['imported']++;
            return;
        }

        $this->downloadMedia($wpId, $title, $attachmentUrl, $link);
    }

    private function downloadMedia(int $wpId, string $title, string $url, string $link): void
    {
        try {
            $contents = file_get_contents($url);
            if (! $contents) {
                $this->stats['failed']++;
                $this->logImport('media', $wpId, 'failed', 'Could not download');
                return;
            }

            $extension = pathinfo(parse_url($url, PHP_URL_PATH), PATHINFO_EXTENSION) ?: 'jpg';
            $fileName = Str::slug($title) . '-' . $wpId . '.' . $extension;
            $filePath = 'media/' . date('Y/m') . '/' . $fileName;

            if (file_exists(storage_path('app/public/' . $filePath))) {
                $this->stats['skipped']++;
                return;
            }

            \Illuminate\Support\Facades\Storage::disk('public')->put($filePath, $contents);

            Media::create([
                'name' => $title,
                'file_name' => $fileName,
                'mime_type' => $this->getMimeType($extension),
                'size' => strlen($contents),
                'disk' => 'public',
                'path' => $filePath,
                'alt_text' => $title,
                'wordpress_id' => $wpId,
                'old_wordpress_url' => $link,
            ]);

            $this->stats['imported']++;
            $this->logImport('media', $wpId, 'imported', 'OK');
        } catch (\Throwable $e) {
            $this->stats['failed']++;
            $this->logImport('media', $wpId, 'failed', $e->getMessage());
        }
    }

    private function mapCategories(&$data, $item): void
    {
        $categories = [];
        foreach ($item->category ?? [] as $cat) {
            $domain = (string) $cat['domain'];
            if ($domain === 'category') {
                $categories[] = (string) $cat;
            }
        }
        if ($categories) {
            $data['categories'] = $categories;
        }
    }

    private function mapMeta(&$data, $item, $wp): void
    {
        $metaItems = $item->children($wp)->postmeta ?? [];
        foreach ($metaItems as $meta) {
            $key = (string) $meta->meta_key;
            $value = (string) $meta->meta_value;

            if ($key === '_thumbnail_id') {
                $data['wp_featured_image_id'] = (int) $value;
            }
        }
    }

    private function createRedirect(string $wpLink, $model): void
    {
        $path = parse_url($wpLink, PHP_URL_PATH) ?? '/';
        $newPath = match (get_class($model)) {
            Opportunity::class => '/opportunities/' . $model->slug,
            Page::class => '/' . $model->slug,
            default => null,
        };

        if ($newPath && $path !== $newPath && $path !== '/') {
            $existing = Redirect::where('from_url', $path)->first();
            if (! $existing) {
                Redirect::create([
                    'from_url' => $path,
                    'to_url' => $newPath,
                    'status_code' => 301,
                ]);
                $this->stats['redirects']++;
            }
        }
    }

    private function sanitizeHtml(string $html): string
    {
        $html = strip_tags($html, '<p><a><ul><ol><li><strong><em><b><i><h1><h2><h3><h4><h5><h6><br><img><table><tr><td><th><thead><tbody><blockquote><div><span><figure><figcaption>');
        $html = preg_replace('/<img[^>]+>/', '', $html);

        return trim($html);
    }

    private function getMimeType(string $extension): string
    {
        return match (strtolower($extension)) {
            'jpg', 'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'gif' => 'image/gif',
            'webp' => 'image/webp',
            'avif' => 'image/avif',
            'svg' => 'image/svg+xml',
            'pdf' => 'application/pdf',
            default => 'application/octet-stream',
        };
    }

    private function processApiPosts(string $baseUrl): void
    {
        $this->info('Fetching posts from API...');
        $page = 1;
        $perPage = 100;

        do {
            $url = "{$baseUrl}/wp-json/wp/v2/posts?per_page={$perPage}&page={$page}&_embed";
            $posts = $this->fetchApiData($url);

            if (! $posts) {
                break;
            }

            foreach ($posts as $post) {
                try {
                    $this->importApiPost($post);
                } catch (\Throwable $e) {
                    $this->stats['failed']++;
                }
            }

            $page++;
        } while (count($posts) >= $perPage);
    }

    private function processApiPages(string $baseUrl): void
    {
        $this->info('Fetching pages from API...');
        $page = 1;
        $perPage = 100;

        do {
            $url = "{$baseUrl}/wp-json/wp/v2/pages?per_page={$perPage}&page={$page}";
            $pages = $this->fetchApiData($url);

            if (! $pages) {
                break;
            }

            foreach ($pages as $page) {
                try {
                    $this->importApiPage($page);
                } catch (\Throwable $e) {
                    $this->stats['failed']++;
                }
            }

            $page++;
        } while (count($pages) >= $perPage);
    }

    private function processApiMedia(string $baseUrl): void
    {
        $this->info('Fetching media from API...');
        $page = 1;
        $perPage = 100;

        do {
            $url = "{$baseUrl}/wp-json/wp/v2/media?per_page={$perPage}&page={$page}";
            $items = $this->fetchApiData($url);

            if (! $items) {
                break;
            }

            foreach ($items as $media) {
                try {
                    $this->importApiMedia($media);
                } catch (\Throwable $e) {
                    $this->stats['failed']++;
                }
            }

            $page++;
        } while (count($items) >= $perPage);
    }

    private function importApiPost(array $post): void
    {
        $wpId = $post['id'];

        $existing = Opportunity::where('wordpress_id', $wpId)->first();
        if ($existing) {
            $this->stats['skipped']++;
            return;
        }

        $data = [
            'wordpress_id' => $wpId,
            'title' => json_encode(['ar' => $post['title']['rendered'] ?? '']),
            'slug' => $post['slug'],
            'excerpt' => json_encode(['ar' => strip_tags($post['excerpt']['rendered'] ?? '')]),
            'content' => json_encode(['ar' => $this->sanitizeHtml($post['content']['rendered'] ?? '')]),
            'original_content' => json_encode(['ar' => $post['content']['rendered'] ?? '']),
            'status' => $post['status'] === 'publish' ? 'published' : 'draft',
            'published_at' => $post['date'] ?? null,
            'old_wordpress_url' => $post['link'] ?? '',
        ];

        if ($this->dryRun) {
            $this->stats['imported']++;
            return;
        }

        DB::transaction(function () use ($data, $post) {
            $opportunity = Opportunity::create($data);
            $this->createRedirect($post['link'] ?? '', $opportunity);
            $this->stats['imported']++;
        });
    }

    private function importApiPage(array $post): void
    {
        $wpId = $post['id'];

        $existing = Page::where('wordpress_id', $wpId)->first();
        if ($existing) {
            $this->stats['skipped']++;
            return;
        }

        $data = [
            'wordpress_id' => $wpId,
            'title' => json_encode(['ar' => $post['title']['rendered'] ?? '']),
            'slug' => $post['slug'],
            'content' => json_encode(['ar' => $this->sanitizeHtml($post['content']['rendered'] ?? '')]),
            'status' => 'published',
            'old_wordpress_url' => $post['link'] ?? '',
        ];

        if ($this->dryRun) {
            $this->stats['imported']++;
            return;
        }

        DB::transaction(function () use ($data, $post) {
            $page = Page::create($data);
            $this->createRedirect($post['link'] ?? '', $page);
            $this->stats['imported']++;
        });
    }

    private function importApiMedia(array $media): void
    {
        $wpId = $media['id'];
        $url = $media['source_url'] ?? '';

        if (! $url) {
            $this->stats['failed']++;
            return;
        }

        $existing = Media::where('wordpress_id', $wpId)->first();
        if ($existing) {
            $this->stats['skipped']++;
            return;
        }

        if ($this->dryRun) {
            $this->stats['imported']++;
            return;
        }

        $this->downloadMedia(
            $wpId,
            $media['title']['rendered'] ?? 'Media ' . $wpId,
            $url,
            $media['link'] ?? ''
        );
    }

    private function fetchApiData(string $url): ?array
    {
        try {
            $json = file_get_contents($url);
            return json_decode($json, true);
        } catch (\Throwable) {
            return null;
        }
    }

    private function logImport(string $entityType, ?int $wpId, string $status, string $message, array $metadata = []): void
    {
        if ($this->dryRun) {
            return;
        }

        WordPressImportLog::create([
            'entity_type' => $entityType,
            'wordpress_id' => $wpId,
            'status' => $status,
            'message' => $message,
            'metadata' => $metadata ?: null,
        ]);
    }

    private function errorAndExit(string $message): int
    {
        $this->error($message);
        return 1;
    }

    private function printStats(): void
    {
        $this->newLine();
        $this->table(
            ['Metric', 'Count'],
            [
                ['Imported', $this->stats['imported']],
                ['Skipped', $this->stats['skipped']],
                ['Failed', $this->stats['failed']],
                ['Redirects created', $this->stats['redirects']],
            ]
        );

        if ($this->dryRun) {
            $this->warn('🔍 Dry run completed. Run without --dry-run to persist changes.');
        }
    }
}
