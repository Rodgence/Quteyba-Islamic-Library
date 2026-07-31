<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = ServiceRequest::with('service')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $requests = $query->paginate(20)->withQueryString();

        $requests->getCollection()->transform(fn ($r) => [
            'id' => $r->id,
            'name' => $r->name,
            'email' => $r->email,
            'phone' => $r->phone,
            'message' => $r->message,
            'status' => $r->status,
            'service' => $r->service ? ['title' => $this->localizedText($r->service->title)] : null,
            'created_at' => $r->created_at,
        ]);

        return Inertia::render('Admin/ServiceRequests/Index', [
            'requests' => $requests,
            'filters' => $request->only(['status']),
        ]);
    }

    public function update(Request $request, ServiceRequest $serviceRequest)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,contacted,completed,cancelled',
        ]);

        $serviceRequest->update($validated);

        return back()->with('success', 'Request updated.');
    }

    public function destroy(ServiceRequest $serviceRequest)
    {
        $serviceRequest->delete();

        return back()->with('success', 'Request deleted.');
    }
}
