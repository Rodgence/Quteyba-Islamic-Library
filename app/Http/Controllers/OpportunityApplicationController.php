<?php

namespace App\Http\Controllers;

use App\Models\Opportunity;
use App\Models\OpportunityApplication;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class OpportunityApplicationController extends Controller
{
    public function submit(Request $request, string $slug)
    {
        $opportunity = Opportunity::published()->where('slug', $slug)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'nullable|string|max:5000',
        ]);

        $rateKey = 'opportunity-application:' . $request->ip();
        if (RateLimiter::tooManyAttempts($rateKey, 5)) {
            return back()->withErrors(['email' => 'Too many attempts. Please try again later.']);
        }
        RateLimiter::hit($rateKey, 3600);

        OpportunityApplication::create([
            'opportunity_id' => $opportunity->id,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Your application has been submitted successfully. Our team will be in touch soon.');
    }
}
