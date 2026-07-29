<?php

namespace App\Models;

use App\Casts\NormalizedJson;
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
            'name' => NormalizedJson::class,
            'description' => NormalizedJson::class,
            'seo_description' => NormalizedJson::class,
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
