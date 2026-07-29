<?php

namespace App\Models;

use App\Casts\NormalizedJson;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class OpportunityType extends Model
{
    protected $fillable = ['name', 'slug', 'icon'];

    protected function casts(): array
    {
        return ['name' => NormalizedJson::class];
    }

    public function opportunities(): HasMany
    {
        return $this->hasMany(Opportunity::class);
    }
}
