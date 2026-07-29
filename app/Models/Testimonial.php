<?php

namespace App\Models;

use App\Casts\NormalizedJson;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    protected $fillable = [
        'name', 'position', 'content',
        'avatar_id', 'is_active', 'sort_order',
    ];

    protected function casts(): array
    {
        return [
            'content' => NormalizedJson::class,
            'is_active' => 'boolean',
        ];
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
