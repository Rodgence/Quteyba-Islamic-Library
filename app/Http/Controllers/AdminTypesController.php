<?php

namespace App\Http\Controllers;

use App\Models\OpportunityType;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminTypesController extends Controller
{
    public function index()
    {
        $types = OpportunityType::withCount('opportunities')->get()->map(fn ($type) => [
            ...$type->toArray(),
            'name' => $this->localizedText($type->name),
        ]);

        return Inertia::render('Admin/Types/Index', ['types' => $types]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:opportunity_types',
            'icon' => 'nullable|string|max:255',
        ]);
        $validated['name'] = $this->localizedPayload($validated['name']);

        OpportunityType::create($validated);

        return back()->with('success', 'Type created successfully.');
    }

    public function update(Request $request, OpportunityType $type)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:opportunity_types,slug,' . $type->id,
            'icon' => 'nullable|string|max:255',
        ]);
        $validated['name'] = $this->localizedPayload($validated['name'], existing: $type->name);
        $type->update($validated);

        return back()->with('success', 'Type updated.');
    }

    public function destroy(OpportunityType $type)
    {
        $type->delete();

        return back()->with('success', 'Type deleted.');
    }
}
