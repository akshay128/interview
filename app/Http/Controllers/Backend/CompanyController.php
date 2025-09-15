<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\UserActiveCompany;

class CompanyController extends Controller
{
    public function index()
    {

        if (!auth()->check()) {
            return redirect()->route('/');
        }       
        $user = Auth::user();
        $companies = Company::where('user_id', $user->id)->get();

        $activeCompanyId = UserActiveCompany::where('user_id', $user->id)->value('company_id');

        $companies = $companies->map(function ($company) use ($activeCompanyId) {
            $company->active = ($company->id == $activeCompanyId) ? 1 : 0;
            return $company;
        });

        return inertia('Backend/Companies', [
            'companies' => $companies,
        ]);
    }

    public function create()
    {
        return inertia('Backend/AddCompany');
    }

    public function store(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
        ]);
        $validated['user_id'] = $user->id;
        $company = Company::create($validated);

        if ($request->has('isActive')) {
            $company->activateForUser($user->id);
        }

        return redirect()->route('companies');
    }

    public function setActive($companyId)
    {
        $user = Auth::user();
        $company = Company::where('id', $companyId)->where('user_id', $user->id)->firstOrFail();
        $company->activateForUser($user->id);

        return redirect()->route('companies');
    }

    public function unsetActive($companyId)
    {
        $user = Auth::user();
        $company = Company::where('id', $companyId)->where('user_id', $user->id)->firstOrFail();
        $company->deactivateForUser($user->id);

        return redirect()->route('companies');
    }

    public function destroy($companyId)
    {
        $user = Auth::user();
        $company = Company::where('id', $companyId)->where('user_id', $user->id)->firstOrFail();
        $company->delete();
        $company->deactivateForUser($user->id);

        return redirect()->route('companies');
    }

    public function show($companyId)
    {
        $user = Auth::user();
        // Only allow access if the company belongs to the logged-in user
        $company = Company::where('id', $companyId)
            ->where('user_id', $user->id)
            ->firstOrFail();

        $company->active = $company->isActiveForUser($user->id) ? 1 : 0;

        // Only fetch projects for this company
        $projects = $company->projects()->orderByDesc('created_at')->get();

        return inertia('Backend/CompanyDetails', [
            'company' => $company,
            'projects' => $projects,
        ]);
    }

    public function edit($companyId)
    {
        $user = Auth::user();
        $company = Company::where('id', $companyId)->where('user_id', $user->id)->firstOrFail();
        return inertia('Backend/EditCompany', ['company' => $company]);
    }

    public function update(Request $request, $companyId)
    {
        $user = Auth::user();
        $company = Company::where('id', $companyId)->where('user_id', $user->id)->firstOrFail();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'industry' => 'required|string|max:255',
        ]);

        $company->update($validated);

        return redirect()->route('companies');
    }
}
