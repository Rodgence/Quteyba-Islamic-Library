<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Page;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PageController extends Controller
{
    public function index()
    {
        $pages = Page::latest()->paginate(20);

        return Inertia::render('Admin/Pages/Index', [
            'pages' => $pages->through(fn ($p) => [
                'id' => $p->id,
                'title' => $this->localizedText($p->title),
                'slug' => $p->slug,
                'status' => $p->status,
                'created_at' => $p->created_at->format('Y-m-d'),
            ]),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Pages/Form', ['page' => null]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:1000',
            'slug' => 'required|string|unique:pages',
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
        ]);

        $validated['title'] = $this->localizedPayload($validated['title']);
        $validated['content'] = $this->localizedPayload($validated['content']);

        Page::create($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Page created successfully.');
    }

    public function edit(Page $page)
    {
        return Inertia::render('Admin/Pages/Form', [
            'page' => [
                ...$page->toArray(),
                'title' => $this->localizedText($page->title),
                'content' => $this->localizedText($page->content),
            ],
        ]);
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:1000',
            'slug' => 'required|string|unique:pages,slug,' . $page->id,
            'content' => 'required|string',
            'status' => 'required|in:draft,published',
        ]);

        $validated['title'] = $this->localizedPayload($validated['title'], $page->title);
        $validated['content'] = $this->localizedPayload($validated['content'], $page->content);

        $page->update($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Page updated successfully.');
    }

    public function destroy(Page $page)
    {
        $page->delete();
        return redirect()->route('admin.pages.index')->with('success', 'Page deleted successfully.');
    }
}
