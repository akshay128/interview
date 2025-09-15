<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'company_id',
        'company_phone',
        'client_name',
        'client_email',
        'client_phone',
        'client_address',
        'product_name',
        'product_model',
        'delivery_date',
        'project_title',
        'start_date',
        'draft_date',
        'project_description',
        'documents',
        'project_cost',
        'include_tax',
        'total',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }
    
    public function invoices()
    {
        return $this->hasMany(\App\Models\Invoice::class);
    }
}
