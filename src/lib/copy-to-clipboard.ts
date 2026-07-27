/** Copy text synchronously — required for clipboard access inside click handlers. */
export function copyToClipboard(
  text: string,
  sourceElement?: HTMLTextAreaElement | HTMLInputElement | null,
): void {
  const value = text.trim();
  if (!value) {
    throw new Error("Nothing to copy");
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard unavailable");
  }

  if (sourceElement) {
    sourceElement.focus();
    sourceElement.select();
    sourceElement.setSelectionRange(0, value.length);
    try {
      if (document.execCommand("copy")) {
        return;
      }
    } catch {
      /* fall through */
    }
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  textarea.style.top = "0";
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, value.length);
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch {
    ok = false;
  }
  document.body.removeChild(textarea);

  if (!ok) {
    throw new Error("Copy command failed");
  }
}
