<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminCategoriesController extends Controller
{
    public function index()
    {
        $categories = Category::withCount('opportunities')->get()->map(fn ($category) => [
            ...$category->toArray(),
            'name' => $this->localizedText($category->name),
        ]);

        return Inertia::render('Admin/Categories/Index', ['categories' => $categories]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories',
        ]);
        $validated['name'] = $this->localizedPayload($validated['name']);

        Category::create($validated);

        return back()->with('success', 'Category created.');
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string|unique:categories,slug,' . $category->id,
        ]);
        $validated['name'] = $this->localizedPayload($validated['name'], existing: $category->name);
        $category->update($validated);

        return back()->with('success', 'Category updated.');
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return back()->with('success', 'Category deleted.');
    }
}
