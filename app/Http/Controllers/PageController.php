<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Inertia\Inertia;

class PageController extends Controller
{
    public function show(string $slug)
    {
        $page = Page::published()->where('slug', $slug)->firstOrFail();

        return Inertia::render('Public/StaticPage', [
            'page' => [
                'title' => $page->title,
                'slug' => $page->slug,
                'content' => $page->content,
            ],
            'seo' => [
                'title' => $page->seo_title ?? ($page->title['ar'] ?? '') . ' | مكتبة قتيبة الإسلامية',
                'description' => $page->seo_description['ar'] ?? '',
            ],
        ]);
    }
}
