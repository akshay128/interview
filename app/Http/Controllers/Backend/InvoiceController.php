<?php

namespace App\Http\Controllers\Backend;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\Project;

class InvoiceController extends Controller
{
    public function create($companyId)
    {
        $user = Auth::user();
        // Optionally, check if $companyId belongs to $user for security
        return inertia('Backend/CreateInvoice', ['companyId' => $companyId]);
    }

    public function createForProject($projectId)
    {
        $project = Project::findOrFail($projectId);
        $company = $project->company;
        $projectInvoices = $project->invoices()->orderByDesc('created_at')->get();
        return inertia('Backend/CreateInvoice', [
            'company' => $company,
            'project' => $project,
            'projectInvoices' => $projectInvoices,
        ]);
    }

    public function storeForProject(Request $request, $projectId)
    {
        $project = Project::findOrFail($projectId);

        $validated = $request->validate([
            'invoice_number' => 'required|string|max:255',
            'invoice_date' => 'required|date',
            'paid_amount' => 'required|numeric|min:0',
            'due_date' => 'nullable|date',
            'gst_included' => 'nullable|boolean',
            'notes' => 'nullable|string',
            'payment_status' => 'required|string|max:50',
        ]);

        $validated['gst_included'] = $request->has('gst_included') ? 1 : 0;

        // Calculate GST and total
        $gstAmount = 0;
        $total = $validated['paid_amount'];
        if ($validated['gst_included']) {
            $gstAmount = round($validated['paid_amount'] * 0.18, 2);
            $total = $validated['paid_amount'] + $gstAmount;
        }
        $validated['gst_amount'] = $gstAmount;
        $validated['total'] = $total;
        $validated['project_id'] = $projectId;
        $validated['payment_status'] = (string) $validated['payment_status'];

        Invoice::create($validated);

        return redirect()->route('projects.invoices.create', $projectId);
    }
}
