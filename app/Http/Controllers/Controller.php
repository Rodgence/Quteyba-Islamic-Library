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

    protected function plainText(mixed $value): string
    {
        $text = $this->localizedText($value);

        if ($text === '') {
            return '';
        }

        $text = preg_replace('/<\s*br\s*\/?\s*>/i', "\n", $text);
        $text = preg_replace('/<\s*li\b[^>]*>/i', '- ', $text);
        $text = preg_replace('/<\s*\/\s*(p|div|h[1-6]|li|ul|ol)\s*>/i', "\n", $text);
        $text = strip_tags($text);
        $text = html_entity_decode($text, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $text = preg_replace("/[ \t]+\n/", "\n", $text);
        $text = preg_replace("/\n{3,}/", "\n\n", $text);

        return trim($text);
    }
}
