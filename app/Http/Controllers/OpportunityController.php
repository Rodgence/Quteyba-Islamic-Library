<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OpportunityController extends Controller
{
    public function index(Request $request)
    {
        $query = Opportunity::published()->with(['opportunityType', 'country', 'featuredImage']);

        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('organization', 'like', "%{$search}%");
            });
        }

        if ($request->filled('type')) {
            $query->filterByType($request->input('type'));
        }

        if ($request->filled('country')) {
            $query->filterByCountry($request->input('country'));
        }

        if ($request->filled('category')) {
            $query->filterByCategory($request->input('category'));
        }

        if ($request->filled('funding')) {
            $query->where('funding_type', $request->input('funding'));
        }

        if ($request->filled('education')) {
            $query->where('education_level', $request->input('education'));
        }

        if ($request->filled('status_filter')) {
            if ($request->input('status_filter') === 'open') {
                $query->open();
            } elseif ($request->input('status_filter') === 'closed') {
                $query->where('application_deadline', '<', now()->toDateString());
            }
        }

        if ($request->filled('sort')) {
            match ($request->input('sort')) {
                'oldest' => $query->oldest('published_at'),
                'deadline' => $query->orderBy('application_deadline', 'asc'),
                default => $query->latest('published_at'),
            };
        } else {
            $query->latest('published_at');
        }

        $opportunities = $query->paginate(12)->withQueryString();

        $opportunities->getCollection()->transform(fn ($o) => [
            'id' => $o->id,
            'title' => $o->title,
            'slug' => $o->slug,
            'excerpt' => $o->excerpt,
            'opportunity_type' => $o->opportunityType ? ['name' => $o->opportunityType->name, 'slug' => $o->opportunityType->slug] : null,
            'country' => $o->country ? ['name' => $o->country->name, 'slug' => $o->country->slug] : null,
            'featured_image' => $o->featuredImage ? ['url' => $o->featuredImage->url, 'alt' => $o->featuredImage->alt_text] : null,
            'application_deadline' => $o->application_deadline?->format('Y-m-d'),
            'funding_type' => $o->funding_type,
            'salary_amount' => $o->salary_amount,
            'salary_currency' => $o->salary_currency,
            'salary_period' => $o->salary_period,
            'status' => $o->status,
            'published_at' => $o->published_at?->format('Y-m-d'),
        ]);

        $types = \App\Models\OpportunityType::orderBy('id')->get()->map(fn ($t) => ['name' => $t->name, 'slug' => $t->slug]);
        $countries = \App\Models\Country::orderBy('id')->get()->map(fn ($c) => ['name' => $c->name, 'slug' => $c->slug]);
        $categories = \App\Models\Category::orderBy('id')->get()->map(fn ($c) => ['name' => $c->name, 'slug' => $c->slug]);

        return Inertia::render('Public/Opportunities', [
            'opportunities' => $opportunities,
            'types' => $types,
            'countries' => $countries,
            'categories' => $categories,
            'filters' => $request->only(['search', 'type', 'country', 'category', 'funding', 'education', 'status_filter', 'sort']),
            'seo' => [
                'title' => 'Opportunities | Quteyba Islamic Library',
                'description' => 'Browse all available scholarships, jobs, internships, and visa opportunities from around the world.',
            ],
        ]);
    }

    public function show(string $slug)
    {
        $opportunity = Opportunity::where('slug', $slug)
            ->with(['opportunityType', 'category', 'country', 'featuredImage', 'tags'])
            ->firstOrFail();

        $related = Opportunity::published()
            ->where('id', '!=', $opportunity->id)
            ->where(function ($q) use ($opportunity) {
                $q->where('opportunity_type_id', $opportunity->opportunity_type_id)
                    ->orWhere('country_id', $opportunity->country_id)
                    ->orWhere('category_id', $opportunity->category_id);
            })
            ->latest('published_at')
            ->limit(4)
            ->get()
            ->map(fn ($o) => [
                'id' => $o->id,
                'title' => $o->title,
                'slug' => $o->slug,
                'excerpt' => $o->excerpt,
                'opportunity_type' => $o->opportunityType ? ['name' => $o->opportunityType->name, 'slug' => $o->opportunityType->slug] : null,
                'country' => $o->country ? ['name' => $o->country->name, 'slug' => $o->country->slug] : null,
                'featured_image' => $o->featuredImage ? ['url' => $o->featuredImage->url, 'alt' => $o->featuredImage->alt_text] : null,
                'application_deadline' => $o->application_deadline?->format('Y-m-d'),
                'status' => $o->status,
            ]);

        $formatted = [
            'id' => $opportunity->id,
            'title' => $opportunity->title,
            'slug' => $opportunity->slug,
            'excerpt' => $opportunity->excerpt,
            'content' => $opportunity->content,
            'opportunity_type' => $opportunity->opportunityType ? ['name' => $opportunity->opportunityType->name, 'slug' => $opportunity->opportunityType->slug] : null,
            'category' => $opportunity->category ? ['name' => $opportunity->category->name, 'slug' => $opportunity->category->slug] : null,
            'country' => $opportunity->country ? ['name' => $opportunity->country->name, 'slug' => $opportunity->country->slug] : null,
            'organization' => $opportunity->organization,
            'featured_image' => $opportunity->featuredImage ? ['url' => $opportunity->featuredImage->url, 'alt' => $opportunity->featuredImage->alt_text] : null,
            'funding_type' => $opportunity->funding_type,
            'education_level' => $opportunity->education_level,
            'employment_type' => $opportunity->employment_type,
            'salary_amount' => $opportunity->salary_amount,
            'salary_currency' => $opportunity->salary_currency,
            'salary_period' => $opportunity->salary_period,
            'application_deadline' => $opportunity->application_deadline?->format('Y-m-d'),
            'application_url' => $opportunity->application_url,
            'official_source_url' => $opportunity->official_source_url,
            'benefits' => $opportunity->benefits,
            'eligibility' => $opportunity->eligibility,
            'required_documents' => $opportunity->required_documents,
            'application_process' => $opportunity->application_process,
            'important_notes' => $opportunity->important_notes,
            'status' => $opportunity->status,
            'is_featured' => $opportunity->is_featured,
            'published_at' => $opportunity->published_at?->format('Y-m-d'),
            'created_at' => $opportunity->created_at->format('Y-m-d'),
            'updated_at' => $opportunity->updated_at->format('Y-m-d'),
        ];

        $title = ($opportunity->title['en'] ?? $opportunity->title['ar'] ?? '') . ' | Quteyba Islamic Library';

        return Inertia::render('Public/OpportunityDetail', [
            'opportunity' => $formatted,
            'related' => $related,
            'seo' => [
                'title' => $title,
                'description' => $opportunity->excerpt['ar'] ?? '',
            ],
        ]);
    }
}
