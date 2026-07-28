<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    protected $fillable = [
        'title', 'slug', 'icon', 'whatsapp_url',
        'short_description', 'content',
        'deliverables', 'required_documents', 'process_steps',
        'price', 'price_currency', 'faq',
        'featured_image_id', 'status', 'is_active', 'display_order',
        'seo_title', 'seo_description',
        'source_wordpress_id', 'source_wordpress_url', 'original_excerpt',
    ];

    protected function casts(): array
    {
        return [
            'title' => 'json',
            'short_description' => 'json',
            'content' => 'json',
            'deliverables' => 'json',
            'required_documents' => 'json',
            'process_steps' => 'json',
            'faq' => 'json',
            'seo_description' => 'json',
            'price' => 'decimal:2',
            'is_active' => 'boolean',
        ];
    }

    public function featuredImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'featured_image_id');
    }

    public function serviceRequests()
    {
        return $this->hasMany(ServiceRequest::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published')->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('display_order')->orderBy('id');
    }
}
