/**
 * Return the best available translation from API values.
 *
 * Some legacy/seeded records contain JSON encoded inside a JSON column, so the
 * browser receives `{"en":"Text"}` as a string instead of an object. Unwrap a
 * few layers to support those records as well as correctly stored translations.
 */
export function getLocalized(value: unknown): string {
  let current = value

  for (let depth = 0; depth < 3; depth += 1) {
    if (typeof current === 'object' && current !== null) {
      const translations = current as Record<string, unknown>
      current = translations.ar ?? translations.en ?? Object.values(translations)[0] ?? ''
      continue
    }

    if (typeof current === 'string') {
      const trimmed = current.trim()

      if (
        (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('"') && trimmed.endsWith('"'))
      ) {
        try {
          current = JSON.parse(trimmed)
          continue
        } catch {
          // It is ordinary text that happens to resemble JSON.
        }
      }
    }

    break
  }

  return String(current ?? '')
}

/**
 * Extract exactly one language's value from a bilingual {en, ar} field,
 * for populating a single-language form input (e.g. an admin form's
 * separate English/Arabic fields). Unlike getLocalized(), this does not
 * fall back to the other language - an empty result means that language
 * has no value yet.
 */
export function getLocaleValue(value: unknown, locale: 'en' | 'ar'): string {
  let current = value

  for (let depth = 0; depth < 3; depth += 1) {
    if (typeof current === 'string') {
      const trimmed = current.trim()

      if (
        (trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('"') && trimmed.endsWith('"'))
      ) {
        try {
          current = JSON.parse(trimmed)
          continue
        } catch {
          // Ordinary text that happens to resemble JSON.
        }
      }
    }

    break
  }

  if (typeof current === 'object' && current !== null) {
    const translations = current as Record<string, unknown>
    return String(translations[locale] ?? '')
  }

  return ''
}
