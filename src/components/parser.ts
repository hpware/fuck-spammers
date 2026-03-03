export function htmlToPlainText(html: string): string {
  if (!html) return "";

  // Browser: DOMParser (works in modern browsers & many JS runtimes that implement DOMParser)
  if (typeof DOMParser !== "undefined") {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body?.textContent?.trim() ?? "";
  }

  // Fallback if `document` exists (e.g., some embedding environments)
  if (typeof document !== "undefined") {
    const el = document.createElement("div");
    el.innerHTML = html;
    return el.textContent?.trim() ?? "";
  }

  // Node / other fallback: strip tags and decode a few common entities.
  // This is a best-effort fallback; consider using a library for production.
  const stripped = html.replace(/<\/?[^>]+(>|$)/g, " ");
  return stripped
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}
