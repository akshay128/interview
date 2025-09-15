<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'project_id',
        'name',
        'model',
        'quantity',
        'delivery_date',
        'cost',
    ];

    public function project()
    {
        return $this->belongsTo(Project::class);
    }
}
