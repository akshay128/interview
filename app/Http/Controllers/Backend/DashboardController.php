<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

class DashboardController extends Controller
{
    public function index()
    {
        if (!auth()->check()) {
            return redirect()->route('/');
        }   
        return inertia('Backend/Dashboard');
    }
}
