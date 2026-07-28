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
                'title' => $o->title,
                'slug' => $o->slug,
                'status' => $o->status,
                'type' => $o->opportunityType?->name,
                'country' => $o->country?->name,
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
            'types' => OpportunityType::orderBy('id')->get(),
            'categories' => Category::orderBy('id')->get(),
            'countries' => Country::orderBy('id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|json',
            'slug' => 'required|string|unique:opportunities',
            'excerpt' => 'nullable|json',
            'content' => 'nullable|json',
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

        $opportunity = Opportunity::create($validated);

        return redirect()->route('admin.opportunities.index')
            ->with('success', 'تم إنشاء الفرصة بنجاح.');
    }

    public function edit(Opportunity $opportunity)
    {
        return Inertia::render('Admin/Opportunities/Form', [
            'opportunity' => $opportunity->load(['tags']),
            'types' => OpportunityType::orderBy('id')->get(),
            'categories' => Category::orderBy('id')->get(),
            'countries' => Country::orderBy('id')->get(),
        ]);
    }

    public function update(Request $request, Opportunity $opportunity)
    {
        $validated = $request->validate([
            'title' => 'required|json',
            'slug' => 'required|string|unique:opportunities,slug,' . $opportunity->id,
            'excerpt' => 'nullable|json',
            'content' => 'nullable|json',
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

        $opportunity->update($validated);

        return redirect()->route('admin.opportunities.index')
            ->with('success', 'تم تحديث الفرصة بنجاح.');
    }

    public function destroy(Opportunity $opportunity)
    {
        $opportunity->delete();

        return redirect()->route('admin.opportunities.index')
            ->with('success', 'تم حذف الفرصة بنجاح.');
    }

    public function bulkDelete(Request $request)
    {
        $ids = $request->input('ids', []);
        Opportunity::whereIn('id', $ids)->delete();

        return redirect()->route('admin.opportunities.index')
            ->with('success', 'تم حذف الفرص المحددة.');
    }

    public function bulkUpdateStatus(Request $request)
    {
        $request->validate([
            'ids' => 'required|array',
            'status' => 'required|in:draft,scheduled,published,closed,archived',
        ]);

        Opportunity::whereIn('id', $request->ids)->update(['status' => $request->status]);

        return redirect()->route('admin.opportunities.index')
            ->with('success', 'تم تحديث حالة الفرص المحددة.');
    }
}
