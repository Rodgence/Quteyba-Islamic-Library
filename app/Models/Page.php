<?php

namespace App\Models;

use App\Casts\NormalizedJson;
use Illuminate\Database\Eloquent\Model;

class Page extends Model
{
    protected $fillable = [
        'title', 'slug', 'content', 'status',
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
}
