<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;

class ProfileController extends Controller
{
    public function index()
    {
        return inertia('Backend/Profile');
    }
}
