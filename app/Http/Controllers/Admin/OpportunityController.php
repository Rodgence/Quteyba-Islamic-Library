<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Opportunity;
use App\Models\OpportunityType;
use App\Models\Category;
use App\Models\Country;
use App\Models\Tag;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class OpportunityController extends Controller
{
    public function index(Request $request)
    {
        $query = Opportunity::with(['opportunityType', 'country']);

        if ($request->filled('search')) {
            $query->where('title', 'like', "%{$request->search}%");
        }

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $opportunities = $query->latest()->paginate(20)->withQueryString();

        return Inertia::render('Admin/Opportunities/Index', [
            'opportunities' => $opportunities->through(fn ($o) => [
                'id' => $o->id,
                'title' => $this->localizedText($o->title),
                'slug' => $o->slug,
                'status' => $o->status,
                'opportunity_type' => $o->opportunityType ? [
                    'name' => $this->localizedText($o->opportunityType->name),
                    'slug' => $o->opportunityType->slug,
                ] : null,
                'country' => $o->country ? [
                    'name' => $this->localizedText($o->country->name),
                    'slug' => $o->country->slug,
                ] : null,
                'is_featured' => $o->is_featured,
                'published_at' => $o->published_at?->format('Y-m-d'),
                'created_at' => $o->created_at->format('Y-m-d'),
            ]),
            'filters' => $request->only(['search', 'status']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Opportunities/Form', [
            'opportunity' => null,
            'types' => $this->selectOptions(OpportunityType::orderBy('id')->get()),
            'categories' => $this->selectOptions(Category::orderBy('id')->get()),
            'countries' => $this->selectOptions(Country::orderBy('id')->get()),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:1000',
            'slug' => 'required|string|unique:opportunities',
            'excerpt' => 'nullable|string|max:5000',
            'content' => 'nullable|string',
            'opportunity_type_id' => 'nullable|exists:opportunity_types,id',
            'category_id' => 'nullable|exists:categories,id',
            'country_id' => 'nullable|exists:countries,id',
            'organization' => 'nullable|string|max:255',
            'funding_type' => 'nullable|string|max:255',
            'application_deadline' => 'nullable|date',
            'application_url' => 'nullable|url',
            'status' => 'required|in:draft,scheduled,published,closed,archived',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $validated['title'] = $this->localizedPayload($validated['title']);
        $validated['excerpt'] = $this->localizedPayload($validated['excerpt'] ?? null);
        $validated['content'] = $this->localizedPayload($validated['content'] ?? null);

        Opportunity::create($validated);

        return redirect()->route('admin.opportunities.index')
            ->with('success', 'Opportunity created successfully.');
    }

    public function edit(Opportunity $opportunity)
    {
        return Inertia::render('Admin/Opportunities/Form', [
            'opportunity' => [
                ...$opportunity->toArray(),
                'title' => $this->localizedText($opportunity->title),
                'excerpt' => $this->localizedText($opportunity->excerpt),
                'content' => $this->localizedText($opportunity->content),
                'application_deadline' => $opportunity->application_deadline?->format('Y-m-d'),
                'published_at' => $opportunity->published_at?->format('Y-m-d\TH:i'),
            ],
            'types' => $this->selectOptions(OpportunityType::orderBy('id')->get()),
            'categories' => $this->selectOptions(Category::orderBy('id')->get()),
            'countries' => $this->selectOptions(Country::orderBy('id')->get()),
        ]);
    }

    public function update(Request $request, Opportunity $opportunity)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:1000',
            'slug' => 'required|string|unique:opportunities,slug,' . $opportunity->id,
            'excerpt' => 'nullable|string|max:5000',
            'content' => 'nullable|string',
            'opportunity_type_id' => 'nullable|exists:opportunity_types,id',
            'category_id' => 'nullable|exists:categories,id',
            'country_id' => 'nullable|exists:countries,id',
            'organization' => 'nullable|string|max:255',
            'funding_type' => 'nullable|string|max:255',
            'application_deadline' => 'nullable|date',
            'application_url' => 'nullable|url',
            'status' => 'required|in:draft,scheduled,published,closed,archived',
            'is_featured' => 'boolean',
            'published_at' => 'nullable|date',
        ]);

        $validated['title'] = $this->localizedPayload($validated['title'], $opportunity->title);
        $validated['excerpt'] = $this->localizedPayload($validated['excerpt'] ?? null, $opportunity->excerpt);
        $validated['content'] = $this->localizedPayload($validated['content'] ?? null, $opportunity->content);

        $opportunity->update($validated);

        return redirect()->route('admin.opportunities.index')
            ->with('success', 'Opportunity updated successfully.');
    }

    public function destroy(Opportunity $opportunity)
    {
        $opportunity->delete();

        return redirect()->route('admin.opportunities.index')
            ->with('success', 'Opportunity deleted successfully.');
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        Opportunity::whereIn('id', $ids)->delete();

        return redirect()->route('admin.opportunities.index')
            ->with('success', 'Selected opportunities deleted.');
    }

    public function bulkUpdateStatus(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'status' => 'required|in:draft,scheduled,published,closed,archived',
        ]);

        Opportunity::whereIn('id', $request->ids)->update(['status' => $request->status]);

        return redirect()->route('admin.opportunities.index')
            ->with('success', 'Status of selected opportunities updated.');
    }

    private function selectOptions($items)
    {
        return $items->map(fn ($item) => [
            'id' => $item->id,
            'name' => $this->localizedText($item->name),
        ]);
    }
}
