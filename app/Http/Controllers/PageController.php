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

}
