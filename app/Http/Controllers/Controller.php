<?php

namespace App\Http\Controllers;

abstract class Controller
{
    protected function localizedText(mixed $value): string
    {
        for ($depth = 0; $depth < 5; $depth++) {
            if (is_array($value)) {
                $value = $value['ar'] ?? $value['en'] ?? reset($value) ?: '';
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

    protected function localizedPayload(?string $valueEn, ?string $valueAr = null, mixed $existing = null): ?array
    {
        if ($valueEn === null && $valueAr === null) {
            return null;
        }

        $translations = is_array($existing) ? $existing : [];

        if ($valueEn !== null) {
            $translations['en'] = $valueEn;
        }

        if ($valueAr !== null) {
            $translations['ar'] = $valueAr;
        }

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

    /**
     * Convert admin-authored plain text (which may contain lightweight Markdown
     * such as heading, bold, italic, and bullet-list syntax) into safe HTML.
     * Input is HTML-escaped first so raw text always renders as intended even
     * if it happens to contain angle brackets.
     *
     * Content already containing real HTML tags (e.g. from the WordPress
     * importer or seeded demo data) is passed through untouched rather than
     * escaped, so previously-working rich content doesn't get double-escaped.
     */
    protected function markdownToHtml(mixed $value): string
    {
        $text = $this->localizedText($value);

        if ($text === '') {
            return '';
        }

        if (preg_match('/<\/?[a-z][\s\S]*>/i', $text)) {
            return $text;
        }

        $text = htmlspecialchars($text, ENT_QUOTES, 'UTF-8');

        $lines = preg_split('/\r\n|\r|\n/', $text);
        $blocks = [];
        $listItems = [];

        $flushList = function () use (&$listItems, &$blocks) {
            if ($listItems !== []) {
                $blocks[] = '<ul>' . implode('', $listItems) . '</ul>';
                $listItems = [];
            }
        };

        foreach ($lines as $line) {
            $trimmed = trim($line);

            if ($trimmed === '') {
                $flushList();
                continue;
            }

            if (preg_match('/^(#{1,3})\s+(.*)$/', $trimmed, $m)) {
                $flushList();
                $level = strlen($m[1]);
                $blocks[] = "<h{$level}>" . $this->inlineMarkdown($m[2]) . "</h{$level}>";
                continue;
            }

            if (preg_match('/^[-*]\s+(.*)$/', $trimmed, $m)) {
                $listItems[] = '<li>' . $this->inlineMarkdown($m[1]) . '</li>';
                continue;
            }

            $flushList();
            $blocks[] = '<p>' . $this->inlineMarkdown($trimmed) . '</p>';
        }

        $flushList();

        return implode('', $blocks);
    }

    private function inlineMarkdown(string $text): string
    {
        $text = preg_replace('/\*\*(.+?)\*\*/s', '<strong>$1</strong>', $text);
        $text = preg_replace('/__(.+?)__/s', '<strong>$1</strong>', $text);
        $text = preg_replace('/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/s', '<em>$1</em>', $text);
        $text = preg_replace('/(?<!_)_(?!_)(.+?)(?<!_)_(?!_)/s', '<em>$1</em>', $text);

        return $text;
    }
}
