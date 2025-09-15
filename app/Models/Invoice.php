<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = [
        'project_id',
        'invoice_number',
        'invoice_date',
        'payment_status',
        'paid_amount',
        'due_date',
        'gst_included',
        'gst_amount',
        'total',
        'notes',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
