<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Course;
use App\Models\Media;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Courses/Index', [
            'courses' => Course::with('featuredImage')->latest()->get()->map(fn ($course) => [
                ...$course->toArray(),
                'name' => $this->localizedText($course->name),
                'description' => $this->plainText($course->description),
                'featured_image' => $course->featuredImage ? [
                    'url' => $course->featuredImage->url,
                    'alt_text' => $course->featuredImage->alt_text,
                ] : null,
            ]),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Courses/Form', ['course' => null]);
    }

    public function store(Request $request)
    {
        $validated = $this->validateCourse($request);
        $featuredImage = $request->file('featured_image')
            ? $this->storeFeaturedImage($request)
            : null;

        unset($validated['featured_image'], $validated['featured_image_alt'], $validated['remove_featured_image']);
        $validated['featured_image_id'] = $featuredImage?->id;
        $validated['name'] = $this->localizedPayload($validated['name']);
        $validated['description'] = $this->localizedPayload($this->plainText($validated['description']));

        Course::create($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course created successfully.');
    }

    public function edit(Course $course)
    {
        $course->load('featuredImage');

        return Inertia::render('Admin/Courses/Form', [
            'course' => [
                ...$course->toArray(),
                'name' => $this->localizedText($course->name),
                'description' => $this->plainText($course->description),
                'featured_image' => $course->featuredImage ? [
                    'url' => $course->featuredImage->url,
                    'alt_text' => $course->featuredImage->alt_text,
                ] : null,
            ],
        ]);
    }

    public function update(Request $request, Course $course)
    {
        $validated = $this->validateCourse($request, $course);
        $featuredImage = $request->file('featured_image')
            ? $this->storeFeaturedImage($request)
            : null;

        unset($validated['featured_image'], $validated['featured_image_alt'], $validated['remove_featured_image']);

        if ($featuredImage) {
            $validated['featured_image_id'] = $featuredImage->id;
        } elseif ($request->boolean('remove_featured_image')) {
            $validated['featured_image_id'] = null;
        } elseif ($course->featuredImage) {
            $course->featuredImage->update([
                'alt_text' => $request->input('featured_image_alt'),
            ]);
        }

        $validated['name'] = $this->localizedPayload($validated['name'], $course->name);
        $validated['description'] = $this->localizedPayload(
            $this->plainText($validated['description']),
            $course->description
        );

        $course->update($validated);

        return redirect()->route('admin.courses.index')->with('success', 'Course updated successfully.');
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('admin.courses.index')->with('success', 'Course deleted successfully.');
    }

    private function validateCourse(Request $request, ?Course $course = null): array
    {
        return $request->validate([
            'name' => 'required|string|max:1000',
            'slug' => 'required|string|unique:courses,slug' . ($course ? ',' . $course->id : ''),
            'description' => 'required|string',
            'language' => 'required|string|max:100',
            'level' => 'required|string|max:100',
            'duration' => 'nullable|string|max:100',
            'delivery_method' => 'required|string|max:100',
            'instructor' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'price_currency' => 'nullable|string|size:3',
            'registration_status' => 'required|in:open,closed,soon',
            'status' => 'required|in:draft,published,archived',
            'featured_image' => 'nullable|image|mimes:jpg,jpeg,png,webp,gif|max:5120',
            'featured_image_alt' => 'nullable|string|max:255',
            'remove_featured_image' => 'nullable|boolean',
        ]);
    }

    private function storeFeaturedImage(Request $request): Media
    {
        $file = $request->file('featured_image');
        $path = $file->store('courses', 'public');

        return Media::create([
            'name' => pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME),
            'file_name' => $file->getClientOriginalName(),
            'mime_type' => $file->getMimeType() ?: $file->getClientMimeType(),
            'size' => $file->getSize(),
            'disk' => 'public',
            'path' => $path,
            'alt_text' => $request->input('featured_image_alt'),
        ]);
    }
}
