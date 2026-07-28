<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WordPressImportLog extends Model
{
    protected $fillable = [
        'entity_type', 'wordpress_id', 'local_id',
        'title', 'status', 'message', 'metadata',
    ];

    protected function casts(): array
    {
        return [
            'metadata' => 'json',
        ];
    }
}
