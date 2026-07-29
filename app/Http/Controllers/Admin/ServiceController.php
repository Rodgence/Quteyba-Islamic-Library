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
            'services' => $services,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|json',
            'slug' => 'required|string|unique:services',
            'short_description' => 'nullable|json',
            'content' => 'nullable|json',
            'icon' => 'nullable|string|max:255',
            'whatsapp_url' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'is_active' => 'boolean',
            'display_order' => 'nullable|integer',
        ]);

        Service::create($validated);

        return redirect()->route('admin.services.index')
            ->with('success', 'Service created successfully.');
    }

    public function update(Request $request, Service $service)
    {
        $validated = $request->validate([
            'title' => 'required|json',
            'slug' => 'required|string|unique:services,slug,' . $service->id,
            'short_description' => 'nullable|json',
            'content' => 'nullable|json',
            'icon' => 'nullable|string|max:255',
            'whatsapp_url' => 'nullable|string|max:255',
            'status' => 'required|in:draft,published',
            'is_active' => 'boolean',
            'display_order' => 'nullable|integer',
        ]);

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
