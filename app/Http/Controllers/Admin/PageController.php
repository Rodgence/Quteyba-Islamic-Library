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
                'title' => $p->title,
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
            'title' => 'required|json',
            'slug' => 'required|string|unique:pages',
            'content' => 'required|json',
            'status' => 'required|in:draft,published',
        ]);

        Page::create($validated);

        return redirect()->route('admin.pages.index')->with('success', 'تم إنشاء الصفحة بنجاح.');
    }

    public function edit(Page $page)
    {
        return Inertia::render('Admin/Pages/Form', ['page' => $page]);
    }

    public function update(Request $request, Page $page)
    {
        $validated = $request->validate([
            'title' => 'required|json',
            'slug' => 'required|string|unique:pages,slug,' . $page->id,
            'content' => 'required|json',
            'status' => 'required|in:draft,published',
        ]);

        $page->update($validated);

        return redirect()->route('admin.pages.index')->with('success', 'تم تحديث الصفحة بنجاح.');
    }

    public function destroy(Page $page)
    {
        $page->delete();
        return redirect()->route('admin.pages.index')->with('success', 'تم حذف الصفحة بنجاح.');
    }
}
