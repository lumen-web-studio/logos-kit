/**
 * Serializes structured data for use in JSON-LD script tags.
 * Replaces `<` with its unicode equivalent to prevent XSS injection via
 * premature `</script>` tag closing (per Next.js security guidance).
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
