<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Backend\DashboardController;
use App\Http\Controllers\Backend\CompanyController;
use App\Http\Controllers\Backend\ProfileController;
use App\Http\Controllers\Backend\InvoiceController;
use App\Http\Controllers\Backend\ProjectController;
use Inertia\Inertia;

Route::get('/',[LoginController::class,'index'])->name('home');
Route::post('/logout',[LoginController::class,'logout'])->name('logout');
Route::post('/login/check',[LoginController::class,'check'])->name('login.check');
Route::post('/register/users',[LoginController::class,'createUser'])->name('register.users');
Route::get('/dashboard',[DashboardController::class,'index'])->name('dashboard');
Route::get('/companies',[CompanyController::class,'index'])->name('companies');
Route::post('/companies', [CompanyController::class, 'store'])->name('companies.store');
Route::get('/profile',[ProfileController::class,'index'])->name('profile');
Route::get('/add_company', [CompanyController::class, 'create'])->name('companies.create');
Route::post('/add_company', [CompanyController::class, 'store'])->name('companies.store');
Route::post('/companies/{company}/set_active', [CompanyController::class, 'setActive'])->name('companies.set_active');
Route::delete('/companies/{company}/set_active', [CompanyController::class, 'unsetActive'])->name('companies.unset_active');
Route::delete('/companies/{company}', [CompanyController::class, 'destroy'])->name('companies.destroy');
Route::get('/companies/{company}', [CompanyController::class, 'show'])->name('companies.show');
Route::get('/companies/{company}/edit', [CompanyController::class, 'edit'])->name('companies.edit');
Route::put('/companies/{company}', [CompanyController::class, 'update'])->name('companies.update');
Route::get('/companies/{company}/invoices/create', [InvoiceController::class, 'create'])->name('invoices.create');
Route::get('/companies/{company}/projects/create', [ProjectController::class, 'create'])->name('projects.create');
Route::post('/companies/{company}/projects', [ProjectController::class, 'store'])->name('projects.store');
Route::get('/projects/{project}/invoices/create', [InvoiceController::class, 'createForProject'])->name('projects.invoices.create');
Route::post('/projects/{project}/invoices', [InvoiceController::class, 'storeForProject'])->name('projects.invoices.store');