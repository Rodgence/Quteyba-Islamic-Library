function stripDiacritics(text: string): string {
  return Array.from(text.normalize('NFKD'))
    .filter((char) => {
      const code = char.codePointAt(0) ?? 0
      return code < 0x0300 || code > 0x036f
    })
    .join('')
}

export function slugify(text: string): string {
  return stripDiacritics(text)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}
