<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Course extends Model
{
    protected $fillable = [
        'name', 'slug', 'description', 'language', 'level',
        'duration', 'delivery_method', 'instructor',
        'price', 'price_currency', 'registration_status',
        'featured_image_id', 'status', 'seo_title', 'seo_description',
    ];

    protected function casts(): array
    {
        return [
            'name' => 'json',
            'description' => 'json',
            'seo_description' => 'json',
            'price' => 'decimal:2',
        ];
    }

    public function featuredImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'featured_image_id');
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
