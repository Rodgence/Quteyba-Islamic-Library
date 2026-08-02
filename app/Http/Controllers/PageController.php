<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;

class PageController extends Controller
{
    public function show(string $slug)
    {
        $page = Page::published()->with('featuredImage')->where('slug', $slug)->firstOrFail();
        $title = $this->localizedText($page->title);
        $content = $this->markdownToHtml($page->content);
        $seoDescription = $this->localizedText($page->seo_description);

        return Inertia::render('Public/StaticPage', [
            'page' => [
                'title' => $title,
                'slug' => $page->slug,
                'content' => $content,
                'featured_image' => $page->featuredImage ? [
                    'url' => $page->featuredImage->url,
                    'alt_text' => $page->featuredImage->alt_text,
                ] : null,
            ],
            'seo' => [
                'title' => $page->seo_title ?: $title . ' | مكتبة قتيبة الإسلامية',
                'description' => $seoDescription,
            ],
        ]);
    }

}
