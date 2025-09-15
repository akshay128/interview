<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Company extends Model
{
    use SoftDeletes;

    protected $fillable = [
        'user_id',
        'name',
        'address',
        'industry',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function projects()
    {
        return $this->hasMany(\App\Models\Project::class);
    }

    // Activate this company for a user (only one active at a time)
    public function activateForUser($userId)
    {
        UserActiveCompany::where('user_id', $userId)->delete();
        UserActiveCompany::create([
            'user_id' => $userId,
            'company_id' => $this->id,
        ]);
    }

    // Deactivate this company for a user
    public function deactivateForUser($userId)
    {
        UserActiveCompany::where('user_id', $userId)
            ->where('company_id', $this->id)
            ->delete();
    }

    // Check if this company is active for a user
    public function isActiveForUser($userId)
    {
        return UserActiveCompany::where('user_id', $userId)
            ->where('company_id', $this->id)
            ->exists();
    }
}
