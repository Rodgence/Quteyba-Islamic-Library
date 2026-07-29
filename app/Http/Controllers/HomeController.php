<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use App\Models\Service;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function __invoke()
    {
        $featured = Opportunity::published()
            ->featured()
            ->latest('published_at')
            ->limit(6)
            ->get()
            ->map(fn ($o) => $this->formatOpportunity($o));

        $latest = Opportunity::published()
            ->latest('published_at')
            ->limit(3)
            ->get()
            ->map(fn ($o) => $this->formatOpportunity($o));

        $services = Service::published()
            ->ordered()
            ->limit(3)
            ->get()
            ->map(fn ($s) => [
                'id' => $s->id,
                'title' => $s->title,
                'slug' => $s->slug,
                'short_description' => $s->short_description,
                'icon' => $s->icon,
                'featured_image' => $s->featuredImage ? ['url' => $s->featuredImage->url] : null,
            ]);

        $stats = [
            ['label' => 'Opportunities', 'value' => Opportunity::published()->count()],
            ['label' => 'Countries', 'value' => \App\Models\Country::count()],
            ['label' => 'Opportunity Types', 'value' => \App\Models\OpportunityType::count()],
        ];

        return Inertia::render('Home', [
            'featured' => $featured,
            'latest' => $latest,
            'services' => $services,
            'stats' => $stats,
            'seo' => [
                'title' => 'Quteyba Islamic Library - Your Opportunity to Study, Work, and Travel',
                'description' => 'Discover the latest scholarships, jobs, internships, and visa opportunities from trusted sources around the world.',
            ],
        ]);
    }

    private function formatOpportunity(Opportunity $o): array
    {
        return [
            'id' => $o->id,
            'title' => $o->title,
            'slug' => $o->slug,
            'excerpt' => $o->excerpt,
            'opportunity_type' => $o->opportunityType ? ['name' => $o->opportunityType->name, 'slug' => $o->opportunityType->slug] : null,
            'country' => $o->country ? ['name' => $o->country->name, 'slug' => $o->country->slug] : null,
            'featured_image' => $o->featuredImage ? ['url' => $o->featuredImage->url, 'alt' => $o->featuredImage->alt_text] : null,
            'application_deadline' => $o->application_deadline?->format('Y-m-d'),
            'funding_type' => $o->funding_type,
            'status' => $o->status,
            'is_featured' => $o->is_featured,
            'published_at' => $o->published_at?->format('Y-m-d'),
        ];
    }
}
