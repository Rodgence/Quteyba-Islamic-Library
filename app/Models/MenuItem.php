<?php

namespace App\Models;

use App\Casts\NormalizedJson;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    protected $fillable = [
        'menu_id', 'parent_id', 'title', 'url', 'type',
        'target_id', 'target_type', 'target', 'icon_class',
        'sort_order', 'is_active', '_lft', '_rgt',
    ];

    protected function casts(): array
    {
        return [
            'title' => NormalizedJson::class,
            'is_active' => 'boolean',
        ];
    }
}
