<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Inertia\Inertia;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::published()->ordered()->with('featuredImage')->get()->map(fn ($s) => [
            'id' => $s->id,
            'title' => $s->title,
            'slug' => $s->slug,
            'short_description' => $s->short_description,
            'icon' => $s->icon,
            'featured_image' => $s->featuredImage ? ['url' => $s->featuredImage->url] : null,
            'price' => $s->price,
            'price_currency' => $s->price_currency,
        ]);

        return Inertia::render('Public/Services', [
            'services' => $services,
            'seo' => [
                'title' => 'Services | Quteyba Islamic Library',
                'description' => 'Comprehensive services for university and scholarship applications, document translation, and employment and visa assistance.',
            ],
        ]);
    }

    public function show(string $slug)
    {
        $service = Service::where('slug', $slug)->firstOrFail();

        $formatted = [
            'id' => $service->id,
            'title' => $service->title,
            'slug' => $service->slug,
            'short_description' => $service->short_description,
            'content' => $this->markdownToHtml($service->content),
            'deliverables' => $service->deliverables,
            'required_documents' => $service->required_documents,
            'process_steps' => $service->process_steps,
            'price' => $service->price,
            'price_currency' => $service->price_currency,
            'faq' => $service->faq,
            'whatsapp_url' => $service->whatsapp_url,
            'featured_image' => $service->featuredImage ? ['url' => $service->featuredImage->url] : null,
        ];

        return Inertia::render('Public/ServiceDetail', [
            'service' => $formatted,
            'seo' => [
                'title' => ($service->title['en'] ?? $service->title['ar'] ?? '') . ' | Quteyba Islamic Library',
                'description' => $service->short_description['en'] ?? $service->short_description['ar'] ?? '',
            ],
        ]);
    }
}
