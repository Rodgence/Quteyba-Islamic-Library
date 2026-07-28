<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeoMetadata extends Model
{
    protected $fillable = [
        'entity_type', 'entity_id',
        'meta_title', 'meta_description',
        'og_title', 'og_description', 'og_image_id',
        'canonical_url', 'no_index', 'no_follow',
        'structured_data',
    ];

    protected function casts(): array
    {
        return [
            'no_index' => 'boolean',
            'no_follow' => 'boolean',
            'structured_data' => 'json',
        ];
    }
}
