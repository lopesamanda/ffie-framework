"use client";

import { useState } from "react";
import { FfieButton } from "@/components/create/design/FfieButton";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { buildAiImagePrompt, type JourneyDraft } from "@/lib/journey/types";

export function ArtifactMaterializePanel({ draft }: { draft: JourneyDraft }) {
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
      className="mt-8 w-full space-y-5 rounded-xl border border-ffie-line bg-ffie-surface/60 p-5 sm:p-6"
    >
      <div className="space-y-2">
        <p className="text-sm font-medium text-ffie-ink">
          Bring it to life (optional)
        </p>
        <p className="text-sm leading-relaxed text-ffie-muted">
          Copy a ready-made image prompt into your external AI tool — nothing
          gets uploaded back into FFIE.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <FfieButton variant="secondary" onClick={handleCopyPrompt}>
          {copied ? "Prompt copied" : "Copy prompt"}
        </FfieButton>
        {copyError && <p className="text-xs text-red-700">{copyError}</p>}
      </div>

      <pre className="max-h-64 overflow-auto rounded-lg border border-ffie-line bg-ffie-bg p-4 text-[11px] leading-relaxed whitespace-pre-wrap text-ffie-muted">
        {prompt}
      </pre>

      <p className="text-xs leading-relaxed text-ffie-muted">
        Paste this into any AI image tool you like, and feel free to adjust it
        to fit what you&apos;re going for.
      </p>
    </div>
  );
}
