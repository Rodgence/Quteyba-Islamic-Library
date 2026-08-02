<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::ordered()->with(['featuredImage'])->withCount('serviceRequests')->get();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services->map(fn ($service) => [
                ...$service->toArray(),
                'title' => $this->localizedText($service->title),
                'short_description' => $this->localizedText($service->short_description),
                'content' => $this->plainText($service->content),
                'featured_image' => $service->featuredImage ? [
                    'url' => $service->featuredImage->url,
                    'alt_text' => $service->featuredImage->alt_text,
                ] : null,
            ]),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Services/Form', [
            'service' => null,
        ]);
    }

    public function edit(Service $service)
    {
        $service->load('featuredImage');

        return Inertia::render('Admin/Services/Form', [
            'service' => [
                ...$service->toArray(),
                'featured_image' => $service->featuredImage ? [
                    'url' => $service->featuredImage->url,
                    'alt_text' => $service->featuredImage->alt_text,
                ] : null,
            ],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateService($request);

        $featuredImage = $request->file('featured_image')
            ? $this->storeFeaturedImage($request)
            : null;

        unset($validated['featured_image'], $validated['featured_image_alt'], $validated['remove_featured_image']);
        $validated['featured_image_id'] = $featuredImage?->id;
        $validated['title'] = $this->localizedPayload($validated['title'], $validated['title_ar'] ?? null);
        $validated['short_description'] = $this->localizedPayload($validated['short_description'] ?? null, $validated['short_description_ar'] ?? null);
        $validated['content'] = $this->localizedPayload($validated['content'] ?? null, $validated['content_ar'] ?? null);
        unset($validated['title_ar'], $validated['short_description_ar'], $validated['content_ar']);

        Service::create($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    public function update(Request $request, Service $service)
    {
        if (! $request->has('title')) {
            $service->update($request->validate([
                'is_active' => 'required|boolean',
            ]));

            return back()->with('success', 'Service status updated.');
        }

        $validated = $this->validateService($request, $service);
        $featuredImage = $request->file('featured_image')
            ? $this->storeFeaturedImage($request)
            : null;

        unset($validated['featured_image'], $validated['featured_image_alt'], $validated['remove_featured_image']);

        if ($featuredImage) {
            $validated['featured_image_id'] = $featuredImage->id;
        } elseif ($request->boolean('remove_featured_image')) {
            $validated['featured_image_id'] = null;
        } elseif ($service->featuredImage) {
            $service->featuredImage->update([
                'alt_text' => $request->input('featured_image_alt'),
            ]);
        }

        $validated['title'] = $this->localizedPayload($validated['title'], $validated['title_ar'] ?? null, $service->title);
        $validated['short_description'] = $this->localizedPayload($validated['short_description'] ?? null, $validated['short_description_ar'] ?? null, $service->short_description);
        $validated['content'] = $this->localizedPayload($validated['content'] ?? null, $validated['content_ar'] ?? null, $service->content);
        unset($validated['title_ar'], $validated['short_description_ar'], $validated['content_ar']);

        $service->update($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    private function validateService(Request $request, ?Service $service = null): array
    {
        return $request->validate([
            'title' => 'required|string|max:1000',
            'title_ar' => 'nullable|string|max:1000',
            'slug' => 'required|string|unique:services,slug' . ($service ? ',' . $service->id : ''),
            'short_description' => 'required|string|max:5000',
            'short_description_ar' => 'nullable|string|max:5000',
            'content' => 'required|string',
            'content_ar' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'whatsapp_url' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'is_active' => 'boolean',
            'display_order' => 'nullable|integer',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:5120',
            'featured_image_alt' => 'nullable|string|max:255',
            'remove_featured_image' => 'nullable|boolean',
        ]);
    }

    private function storeFeaturedImage(Request $request): Media
    {
        $file = $request->file('featured_image');
        $path = $file->store('services', 'public');

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

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted successfully.');
    }
}
