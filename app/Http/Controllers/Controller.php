<?php

namespace App\Http\Controllers;

abstract class Controller
{
    protected function localizedText(mixed $value): string
    {
        for ($depth = 0; $depth < 5; $depth++) {
            if (is_array($value)) {
                $value = $value['en'] ?? $value['ar'] ?? reset($value) ?: '';
                continue;
            }

            if (is_string($value)) {
                $decoded = json_decode($value, true);

                if (json_last_error() === JSON_ERROR_NONE && (is_array($decoded) || is_string($decoded))) {
                    $value = $decoded;
                    continue;
                }
            }

            break;
        }

        return is_scalar($value) ? (string) $value : '';
    }

    protected function localizedPayload(?string $value, mixed $existing = null): ?array
    {
        if ($value === null) {
            return null;
        }

        $translations = is_array($existing) ? $existing : [];
        $translations['en'] = $value;

        return $translations;
    }
}
