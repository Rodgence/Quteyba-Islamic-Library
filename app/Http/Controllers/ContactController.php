<?php

namespace App\Http\Controllers;

use App\Models\ContactMessage;
use App\Models\Subscriber;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\RateLimiter;

class ContactController extends Controller
{
    public function contact()
    {
        return Inertia::render('Public/Contact', [
            'seo' => [
                'title' => 'Contact Us | Quteyba Islamic Library',
                'description' => 'Get in touch with the Quteyba Islamic Library team for inquiries and support.',
            ],
        ]);
    }

    public function submitContact(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:50',
            'country' => 'required|string|max:100',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|max:5000',
        ]);

        $rateKey = 'contact:' . $request->ip();
        if (RateLimiter::tooManyAttempts($rateKey, 3)) {
            return back()->withErrors(['email' => 'Too many attempts. Please try again later.']);
        }
        RateLimiter::hit($rateKey, 3600);

        ContactMessage::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'],
            'country' => $validated['country'],
            'subject' => $validated['subject'],
            'message' => $validated['message'],
            'ip_address' => $request->ip(),
        ]);

        return back()->with('success', 'Your message has been sent successfully. We will be in touch soon.');
    }

    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
        ]);

        $rateKey = 'subscribe:' . $request->ip();
        if (RateLimiter::tooManyAttempts($rateKey, 3)) {
            return back()->withErrors(['email' => 'Too many attempts. Please try again later.']);
        }
        RateLimiter::hit($rateKey, 3600);

        Subscriber::firstOrCreate(
            ['email' => $validated['email']],
            [
                'is_active' => true,
                'subscribed_at' => now(),
                'ip_address' => $request->ip(),
            ]
        );

        return back()->with('success', 'Subscribed successfully.');
    }
}
