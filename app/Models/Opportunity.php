<?php

namespace App\Models;

use App\Casts\NormalizedJson;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Builder;

class Opportunity extends Model
{
    protected $fillable = [
        'wordpress_id',
        'title', 'slug', 'excerpt', 'content', 'original_content',
        'opportunity_type_id', 'category_id', 'country_id',
        'organization', 'featured_image_id',
        'funding_type', 'education_level', 'employment_type',
        'salary_amount', 'salary_currency', 'salary_period',
        'application_deadline', 'application_url', 'official_source_url',
        'benefits', 'eligibility', 'required_documents', 'application_process', 'important_notes',
        'status', 'is_featured', 'published_at', 'expires_at',
        'old_wordpress_url', 'seo_title', 'seo_description',
    ];

    protected function casts(): array
    {
        return [
            'title' => NormalizedJson::class,
            'excerpt' => NormalizedJson::class,
            'content' => NormalizedJson::class,
            'original_content' => NormalizedJson::class,
            'benefits' => NormalizedJson::class,
            'eligibility' => NormalizedJson::class,
            'required_documents' => NormalizedJson::class,
            'application_process' => NormalizedJson::class,
            'important_notes' => NormalizedJson::class,
            'seo_description' => NormalizedJson::class,
            'is_featured' => 'boolean',
            'application_deadline' => 'date',
            'published_at' => 'datetime',
            'expires_at' => 'datetime',
            'salary_amount' => 'decimal:2',
        ];
    }

    public function opportunityType(): BelongsTo
    {
        return $this->belongsTo(OpportunityType::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class);
    }

    public function featuredImage(): BelongsTo
    {
        return $this->belongsTo(Media::class, 'featured_image_id');
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeOpen($query)
    {
        return $query->where('status', 'published')
            ->where(function ($q) {
                $q->whereNull('application_deadline')
                    ->orWhere('application_deadline', '>=', now()->toDateString());
            });
    }

    public function scopeFilterByType($query, ?string $type)
    {
        if ($type) {
            return $query->whereHas('opportunityType', fn ($q) => $q->where('slug', $type));
        }

        return $query;
    }

    public function scopeFilterByCountry($query, ?string $country)
    {
        if ($country) {
            return $query->whereHas('country', fn ($q) => $q->where('slug', $country));
        }

        return $query;
    }

    public function scopeFilterByCategory($query, ?string $category)
    {
        if ($category) {
            return $query->whereHas('category', fn ($q) => $q->where('slug', $category));
        }

        return $query;
    }
}
