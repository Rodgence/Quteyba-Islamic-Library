<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;

class PageController extends Controller
{
    public function show(string $slug)
    {
        $page = Page::published()->where('slug', $slug)->firstOrFail();
        $title = $this->localizedText($page->title);
        $content = $this->localizedText($page->content);
        $seoDescription = $this->localizedText($page->seo_description);

        return Inertia::render('Public/StaticPage', [
            'page' => [
                'title' => $title,
                'slug' => $page->slug,
                'content' => $content,
            ],
            'seo' => [
                'title' => $page->seo_title ?: $title . ' | Quteyba Islamic Library',
                'description' => $seoDescription,
            ],
        ]);
    }

    private function localizedText(mixed $value): string
    {
        for ($depth = 0; $depth < 3; $depth++) {
            if (is_array($value)) {
                $value = $value['en'] ?? $value['ar'] ?? reset($value) ?: '';
                continue;
            }

            if (is_string($value)) {
                $decoded = json_decode($value, true);

                if (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_string($decoded))) {
                    $value = $decoded;
                    continue;
                }
            }

            break;
        }

        return is_scalar($value) ? (string) $value : '';
    }
}
