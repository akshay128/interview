<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\Project;

class ProjectController extends Controller
{
    public function create($companyId)
    {
        $user = Auth::user();
        $company = Company::where('id', $companyId)->where('user_id', $user->id)->firstOrFail();
        return inertia('Backend/CreateProject', [
            'companyId' => $companyId,
            'company' => $company,
        ]);
    }

    public function store(Request $request, $companyId)
    {
        $user = Auth::user();

        // Validate input
        $validated = $request->validate([
            'company_phone' => 'nullable|string|max:255',
            'client_name' => 'required|string|max:255',
            'client_email' => 'required|email|max:255',
            'client_phone' => 'nullable|string|max:255',
            'client_address' => 'nullable|string|max:255',
            'product_name' => 'required|string|max:255',
            'product_model' => 'nullable|string|max:255',
            'delivery_date' => 'nullable|date',
            'project_title' => 'required|string|max:255',
            'start_date' => 'nullable|date',
            'draft_date' => 'nullable|string|max:255',
            'project_description' => 'nullable|string',
            'documents' => 'nullable|file',
            'project_cost' => 'nullable|numeric',
            'include_tax' => 'nullable|boolean',
            'total' => 'nullable|numeric',
        ]);

        $validated['company_id'] = $companyId;

        // Handle file upload if present
        if ($request->hasFile('documents')) {
            // Get the uploaded file
            $file = $request->file('documents');

            // Create a unique name
            $fileName = time() . '_' . $file->getClientOriginalName();

            // Move it to public/project_documents
            $file->move(public_path('project_documents'), $fileName);

            // Save the relative path in DB (optional: save only the filename)
            $validated['documents'] = 'project_documents/' . $fileName;
        }

        Project::create($validated);

        return redirect()->route('companies.show', $companyId)->with('success', 'Project created successfully!');
    }
}
