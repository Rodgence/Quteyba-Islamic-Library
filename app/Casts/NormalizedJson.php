<?php

namespace App\Casts;

use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;

/**
 * Handles legacy JSON columns that were accidentally JSON-encoded more than
 * once. New writes are normalized so the bad representation is not repeated.
 */
class NormalizedJson implements CastsAttributes
{
    public function get(Model $model, string $key, mixed $value, array $attributes): mixed
    {
        return $this->decode($value);
    }

    public function set(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if ($value === null) {
            return null;
        }

        return json_encode(
            $this->decode($value),
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_THROW_ON_ERROR
        );
    }

    private function decode(mixed $value): mixed
    {
        for ($depth = 0; $depth < 5 && is_string($value); $depth++) {
            try {
                $decoded = json_decode($value, true, 512, JSON_THROW_ON_ERROR);
            } catch (\JsonException) {
                break;
            }

            if (! is_array($decoded) && ! is_string($decoded)) {
                break;
            }

            $value = $decoded;
        }

        return $value;
    }
}
