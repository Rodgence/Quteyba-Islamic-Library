<?php

namespace App\Http\Controllers;

use App\Models\Country;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCountriesController extends Controller
{
    public function index()
    {
        $countries = Country::withCount('opportunities')
            ->get()
            ->map(fn ($country) => [
                ...$country->toArray(),
                'name' => $this->localizedText($country->name),
            ])
            ->sortBy('name', SORT_NATURAL | SORT_FLAG_CASE)
            ->values();

        return Inertia::render('Admin/Countries/Index', ['countries' => $countries]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:countries',
            'code' => 'required|string|size:3|unique:countries',
        ]);
        $validated['name'] = $this->localizedPayload($validated['name']);

        Country::create($validated);

        return back()->with('success', 'Country created.');
    }

    public function update(Request $request, Country $country)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:countries,slug,' . $country->id,
            'code' => 'required|string|size:3|unique:countries,code,' . $country->id,
        ]);
        $validated['name'] = $this->localizedPayload($validated['name'], $country->name);
        $country->update($validated);

        return back()->with('success', 'Country updated.');
    }

    public function destroy(Country $country)
    {
        $country->delete();

        return back()->with('success', 'Country deleted.');
    }
}
