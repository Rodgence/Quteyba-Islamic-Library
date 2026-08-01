<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\OpportunityApplication;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OpportunityApplicationController extends Controller
{
    public function index(Request $request)
    {
        $query = OpportunityApplication::with('opportunity')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $applications = $query->paginate(20)->withQueryString();

        $applications->getCollection()->transform(fn ($a) => [
            'id' => $a->id,
            'name' => $a->name,
            'email' => $a->email,
            'phone' => $a->phone,
            'message' => $a->message,
            'status' => $a->status,
            'opportunity' => $a->opportunity ? [
                'title' => $this->localizedText($a->opportunity->title),
                'slug' => $a->opportunity->slug,
            ] : null,
            'created_at' => $a->created_at,
        ]);

        return Inertia::render('Admin/OpportunityApplications/Index', [
            'applications' => $applications,
            'filters' => $request->only(['status']),
        ]);
    }

    public function update(Request $request, OpportunityApplication $opportunityApplication)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,contacted,submitted,cancelled',
        ]);

        $opportunityApplication->update($validated);

        return back()->with('success', 'Application updated.');
    }

    public function destroy(OpportunityApplication $opportunityApplication)
    {
        $opportunityApplication->delete();

        return back()->with('success', 'Application deleted.');
    }
}
