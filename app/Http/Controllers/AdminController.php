<?php

namespace App\Http\Controllers;

class AdminController extends Controller
{
    public function __construct()
    {
        $this->middleware(['auth', 'role_or_permission:access admin']);
    }
}
