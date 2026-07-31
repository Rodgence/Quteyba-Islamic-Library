<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Redirect;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class RedirectController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'from_url' => 'required|string|max:255|unique:redirects,from_url',
            'to_url' => 'required|string|max:255',
            'status_code' => 'required|integer|in:301,302',
            'is_active' => 'boolean',
        ]);

        Redirect::create($validated);

        return back()->with('success', 'Redirect created.');
    }

    public function update(Request $request, Redirect $redirect)
    {
        $validated = $request->validate([
            'from_url' => ['required', 'string', 'max:255', Rule::unique('redirects', 'from_url')->ignore($redirect->id)],
            'to_url' => 'required|string|max:255',
            'status_code' => 'required|integer|in:301,302',
            'is_active' => 'boolean',
        ]);

        $redirect->update($validated);

        return back()->with('success', 'Redirect updated.');
    }

    public function destroy(Redirect $redirect)
    {
        $redirect->delete();

        return back()->with('success', 'Redirect deleted.');
    }
}
