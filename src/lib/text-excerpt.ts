/** Truncate at a word boundary with an ellipsis — never mid-word. */
export function excerptAtWordBoundary(text: string, maxLength = 160): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;

  const slice = trimmed.slice(0, maxLength);
  const lastSpace = slice.lastIndexOf(" ");
  const cut =
    lastSpace > maxLength * 0.55 ? slice.slice(0, lastSpace) : slice.trimEnd();

  return `${cut.trimEnd()}…`;
}

export function narrativeNeedsExcerpt(text: string, maxLength = 160): boolean {
  return text.trim().length > maxLength;
}
