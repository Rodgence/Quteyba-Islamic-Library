<?php

namespace App\Models;

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
            'title' => 'json',
            'content' => 'json',
            'seo_description' => 'json',
        ];
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }
}
