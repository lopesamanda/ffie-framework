"use client";

import { useState } from "react";
import { FfieButton } from "@/components/create/design/FfieButton";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { buildAiImagePrompt, type JourneyDraft } from "@/lib/journey/types";

export function ArtifactMaterializePanel({
  draft,
  embedded = false,
  highlighted = false,
}: {
  draft: JourneyDraft;
  embedded?: boolean;
  highlighted?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState<string | null>(null);
  const prompt = buildAiImagePrompt(draft);

  const handleCopyPrompt = () => {
    setCopyError(null);
    try {
      copyToClipboard(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopyError("Could not copy — select the prompt below and copy manually.");
    }
  };

  return (
    <div
      id="bring-it-to-life"
      className={`space-y-4 ${embedded ? "" : "mt-8 rounded-xl border border-ffie-line bg-ffie-surface/60 p-5"}`}
    >
      {!embedded && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-ffie-ink">
            Bring it to life (optional)
          </p>
          <p className="text-sm leading-relaxed text-ffie-muted">
            Copy a ready-made image prompt into your external AI tool — nothing
            gets uploaded back into FFIE.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <FfieButton variant="secondary" onClick={handleCopyPrompt}>
          {copied ? "Prompt copied" : "Copy prompt"}
        </FfieButton>
        {copyError && <p className="text-xs text-red-700">{copyError}</p>}
      </div>

      <pre
        className={`max-h-56 overflow-auto rounded-lg border bg-ffie-bg p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap text-ffie-muted transition ${
          highlighted
            ? "border-ffie-accent ring-2 ring-ffie-accent/20"
            : "border-ffie-line"
        }`}
      >
        {prompt}
      </pre>

      <p className="text-xs leading-relaxed text-ffie-muted">
        Paste this into any AI image tool you like, and feel free to adjust it
        to fit what you&apos;re going for.
      </p>
    </div>
  );
}
