<?php

namespace App\Models;

use App\Casts\NormalizedJson;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Tag extends Model
{
    protected $fillable = ['name', 'slug'];

    protected function casts(): array
    {
        return ['name' => NormalizedJson::class];
    }

    public function opportunities(): BelongsToMany
    {
        return $this->belongsToMany(Opportunity::class);
    }
}
