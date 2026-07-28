<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Opportunity;
use App\Models\ContactMessage;
use App\Models\ServiceRequest;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'opportunities' => Opportunity::count(),
                'published' => Opportunity::where('status', 'published')->count(),
                'draft' => Opportunity::where('status', 'draft')->count(),
                'messages' => ContactMessage::where('is_read', false)->count(),
                'requests' => ServiceRequest::where('status', 'new')->count(),
            ],
        ]);
    }
}
