<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::published()->with('featuredImage')->get()->map(fn ($c) => [
            'id' => $c->id,
            'name' => $c->name,
            'slug' => $c->slug,
            'description' => $this->plainText($c->description),
            'language' => $c->language,
            'level' => $c->level,
            'duration' => $c->duration,
            'delivery_method' => $c->delivery_method,
            'instructor' => $c->instructor,
            'price' => $c->price,
            'price_currency' => $c->price_currency,
            'registration_status' => $c->registration_status,
            'featured_image' => $c->featuredImage ? ['url' => $c->featuredImage->url] : null,
        ]);

        return Inertia::render('Public/Courses', [
            'courses' => $courses,
            'seo' => [
                'title' => 'الدورات | مكتبة قتيبة الإسلامية',
                'description' => 'دورات باللغات العربية والإنجليزية والألمانية والفرنسية والإسبانية واليابانية.',
            ],
        ]);
    }

    public function show(string $slug)
    {
        $course = Course::where('slug', $slug)->firstOrFail();

        $formatted = [
            'id' => $course->id,
            'name' => $course->name,
            'slug' => $course->slug,
            'description' => $this->markdownToHtml($course->description),
            'language' => $course->language,
            'level' => $course->level,
            'duration' => $course->duration,
            'delivery_method' => $course->delivery_method,
            'instructor' => $course->instructor,
            'price' => $course->price,
            'price_currency' => $course->price_currency,
            'registration_status' => $course->registration_status,
            'featured_image' => $course->featuredImage ? ['url' => $course->featuredImage->url] : null,
        ];

        return Inertia::render('Public/CourseDetail', [
            'course' => $formatted,
            'related' => Course::published()->with('featuredImage')->where('id', '!=', $course->id)->limit(4)->get()->map(fn ($c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'description' => $this->plainText($c->description),
                'language' => $c->language,
                'level' => $c->level,
                'price' => $c->price,
                'price_currency' => $c->price_currency,
                'featured_image' => $c->featuredImage ? [
                    'url' => $c->featuredImage->url,
                    'alt_text' => $c->featuredImage->alt_text,
                ] : null,
            ]),
            'seo' => [
                'title' => ($course->name['ar'] ?? $course->name['en'] ?? '') . ' | مكتبة قتيبة الإسلامية',
                'description' => $course->description['ar'] ?? $course->description['en'] ?? '',
            ],
        ]);
    }
}
