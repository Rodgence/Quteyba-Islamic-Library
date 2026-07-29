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
      current = translations.en ?? translations.ar ?? Object.values(translations)[0] ?? ''
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
