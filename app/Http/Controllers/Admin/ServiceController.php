<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::ordered()->withCount('serviceRequests')->get();

        return Inertia::render('Admin/Services/Index', [
            'services' => $services->map(fn ($service) => [
                ...$service->toArray(),
                'title' => $this->localizedText($service->title),
                'short_description' => $this->localizedText($service->short_description),
                'content' => $this->localizedText($service->content),
            ]),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:1000',
            'slug' => 'required|string|unique:services',
            'short_description' => 'nullable|string|max:5000',
            'content' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'whatsapp_url' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'is_active' => 'boolean',
            'display_order' => 'nullable|integer',
        ]);

        $validated['title'] = $this->localizedPayload($validated['title']);
        $validated['short_description'] = $this->localizedPayload($validated['short_description'] ?? null);
        $validated['content'] = $this->localizedPayload($validated['content'] ?? null);

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

        $validated = $request->validate([
            'title' => 'required|string|max:1000',
            'slug' => 'required|string|unique:services,slug,' . $service->id,
            'short_description' => 'nullable|string|max:5000',
            'content' => 'nullable|string',
            'icon' => 'nullable|string|max:255',
            'whatsapp_url' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'is_active' => 'boolean',
            'display_order' => 'nullable|integer',
        ]);

        $validated['title'] = $this->localizedPayload($validated['title'], $service->title);
        $validated['short_description'] = $this->localizedPayload($validated['short_description'] ?? null, $service->short_description);
        $validated['content'] = $this->localizedPayload($validated['content'] ?? null, $service->content);

        $service->update($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service updated successfully.');
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return redirect()->route('admin.services.index')
            ->with('success', 'Service deleted successfully.');
    }
}
