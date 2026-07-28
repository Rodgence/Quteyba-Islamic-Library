<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    protected $fillable = [
        'name',
        'file_name',
        'mime_type',
        'size',
        'disk',
        'path',
        'alt_text',
        'wordpress_id',
        'old_wordpress_url',
    ];

    public function getUrlAttribute(): string
    {
        return asset('storage/' . $this->path);
    }
}
