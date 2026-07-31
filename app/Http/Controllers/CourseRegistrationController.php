<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\CourseRegistration;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class CourseRegistrationController extends Controller
{
    public function submit(Request $request, string $slug)
    {
        $course = Course::published()->where('slug', $slug)->firstOrFail();

        if ($course->registration_status !== 'open') {
            return back()->withErrors(['name' => 'Registration is not open for this course.']);
        }

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
        ]);

        $rateKey = 'course-registration:' . $request->ip();
        if (RateLimiter::tooManyAttempts($rateKey, 5)) {
            return back()->withErrors(['email' => 'Too many attempts. Please try again later.']);
        }
        RateLimiter::hit($rateKey, 3600);

        CourseRegistration::create([
            'course_id' => $course->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Your registration has been submitted successfully. We will be in touch soon.');
    }
}
