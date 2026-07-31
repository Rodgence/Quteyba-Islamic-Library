<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CourseRegistration;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseRegistrationController extends Controller
{
    public function index(Request $request)
    {
        $query = CourseRegistration::with('course')->latest();

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        $registrations = $query->paginate(20)->withQueryString();

        $registrations->getCollection()->transform(fn ($r) => [
            'id' => $r->id,
            'name' => $r->name,
            'email' => $r->email,
            'phone' => $r->phone,
            'status' => $r->status,
            'course' => $r->course ? ['name' => $this->localizedText($r->course->name)] : null,
            'created_at' => $r->created_at,
        ]);

        return Inertia::render('Admin/CourseRegistrations/Index', [
            'registrations' => $registrations,
            'filters' => $request->only(['status']),
        ]);
    }

    public function update(Request $request, CourseRegistration $courseRegistration)
    {
        $validated = $request->validate([
            'status' => 'required|string|in:new,contacted,registered,cancelled',
        ]);

        $courseRegistration->update($validated);

        return back()->with('success', 'Registration updated.');
    }

    public function destroy(CourseRegistration $courseRegistration)
    {
        $courseRegistration->delete();

        return back()->with('success', 'Registration deleted.');
    }
}
