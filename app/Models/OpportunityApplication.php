<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OpportunityApplication extends Model
{
    protected $fillable = [
        'opportunity_id', 'name', 'email', 'phone',
        'message', 'admin_notes', 'status', 'ip_address',
    ];

    public function opportunity()
    {
        return $this->belongsTo(Opportunity::class);
    }
}
