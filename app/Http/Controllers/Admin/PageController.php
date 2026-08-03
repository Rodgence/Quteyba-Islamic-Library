<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
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
        $validated = $this->validatePage($request);
        $featuredImage = $request->file('featured_image')
            ? $this->storeFeaturedImage($request)
            : null;

        unset($validated['featured_image'], $validated['featured_image_alt'], $validated['remove_featured_image']);
        $validated['featured_image_id'] = $featuredImage?->id;
        $validated['title'] = $this->localizedPayload($validated['title'], $validated['title_ar'] ?? null);
        $validated['content'] = $this->localizedPayload($validated['content'] ?? null, $validated['content_ar'] ?? null);
        unset($validated['title_ar'], $validated['content_ar']);

        Page::create($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Page created successfully.');
    }

    public function edit(Page $page)
    {
        $page->load('featuredImage');

        return Inertia::render('Admin/Pages/Form', [
            'page' => [
                ...$page->toArray(),
                'featured_image' => $page->featuredImage ? [
                    'url' => $page->featuredImage->url,
                    'alt_text' => $page->featuredImage->alt_text,
                ] : null,
            ],
        ]);
    }

    public function update(Request $request, Page $page)
    {
        $validated = $this->validatePage($request, $page);
        $featuredImage = $request->file('featured_image')
            ? $this->storeFeaturedImage($request)
            : null;

        unset($validated['featured_image'], $validated['featured_image_alt'], $validated['remove_featured_image']);

        if ($featuredImage) {
            $validated['featured_image_id'] = $featuredImage->id;
        } elseif ($request->boolean('remove_featured_image')) {
            $validated['featured_image_id'] = null;
        } elseif ($page->featuredImage) {
            $page->featuredImage->update([
                'alt_text' => $request->input('featured_image_alt'),
            ]);
        }

        $validated['title'] = $this->localizedPayload($validated['title'], $validated['title_ar'] ?? null, $page->title);
        $validated['content'] = $this->localizedPayload($validated['content'] ?? null, $validated['content_ar'] ?? null, $page->content);
        unset($validated['title_ar'], $validated['content_ar']);

        $page->update($validated);

        return redirect()->route('admin.pages.index')->with('success', 'Page updated successfully.');
    }

    public function destroy(Page $page)
    {
        $page->delete();
        return redirect()->route('admin.pages.index')->with('success', 'Page deleted successfully.');
    }

    private function validatePage(Request $request, ?Page $page = null): array
    {
        return $request->validate([
            'title' => 'required|string|max:1000',
            'title_ar' => 'nullable|string|max:1000',
            'slug' => [
                'required',
                'string',
                'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/',
                'unique:pages,slug' . ($page ? ',' . $page->id : ''),
            ],
            'content' => 'required|string',
            'content_ar' => 'nullable|string',
            'status' => 'required|in:draft,published',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:5120',
            'featured_image_alt' => 'nullable|string|max:255',
            'remove_featured_image' => 'nullable|boolean',
        ], [
            'slug.regex' => 'The slug may only contain lowercase letters, numbers, and hyphens.',
        ]);
    }

    private function storeFeaturedImage(Request $request): Media
    {
        $file = $request->file('featured_image');
        $path = $file->store('pages', 'public');

        return Media::create([
            'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            'file_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType() ?: $file->getClientMimeType(),
            'size' => $file->getSize(),
            'disk' => 'public',
            'path' => $path,
            'alt_text' => $request->input('featured_image_alt'),
        ]);
    }
}
