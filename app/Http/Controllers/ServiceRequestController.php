<?php

namespace App\Http\Controllers;

use App\Models\ServiceRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;

class ServiceRequestController extends Controller
{
    public function submit(Request $request)
    {
        $validated = $request->validate([
            'service_id' => 'required|exists:services,id',
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'message' => 'nullable|string|max:5000',
        ]);

        $rateKey = 'service-request:' . $request->ip();
        if (RateLimiter::tooManyAttempts($rateKey, 5)) {
            return back()->withErrors(['email' => 'Too many attempts. Please try again later.']);
        }
        RateLimiter::hit($rateKey, 3600);

        ServiceRequest::create([
            'service_id' => $validated['service_id'],
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Your request has been submitted successfully. We will be in touch soon.');
    }
}
