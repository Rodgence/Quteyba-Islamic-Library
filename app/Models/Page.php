<?php

namespace App\Models;

use App\Casts\NormalizedJson;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Page extends Model
{
    protected $fillable = [
        'title', 'slug', 'content', 'featured_image_id', 'status',
        'seo_title', 'seo_description',
        'wordpress_id', 'old_wordpress_url',
    ];

    protected function casts(): array
    {
        return [
            'title' => NormalizedJson::class,
            'content' => NormalizedJson::class,
            'seo_description' => NormalizedJson::class,
        ];
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function featuredImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'featured_image_id');
    }
}
