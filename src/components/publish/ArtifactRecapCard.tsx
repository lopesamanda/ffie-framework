"use client";

import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import type { JourneyDraft } from "@/lib/journey/types";
import { PUBLISH_FLOW } from "@/lib/publish-flow-copy";

function formatValueLabel(value: string): string {
  if (value === value.toLowerCase() && value.includes(" ")) {
    return value;
  }
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/** Figma recap card — real artifact name, promise, hidden function, and value tags. */
export function ArtifactRecapCard({ draft }: { draft: JourneyDraft }) {
  const copy = PUBLISH_FLOW.matrix;
  const artifactName = draft.artifactName.trim() || "Untitled artifact";
  const promise = draft.publicPromise.trim();
  const hidden =
    composeHiddenFunction(draft) || draft.hiddenFunction.trim();
  const values = resolveArtifactValues(draft).map(formatValueLabel);

  const summaryParts = [
    artifactName,
    promise || null,
    hidden || null,
  ].filter(Boolean);

  return (
    <div className="rounded-[10px] border border-[#dcd7f7] bg-[#f6f4ff] px-5 py-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-accent">
        {copy.recapEyebrow}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-ffie-muted">
        {summaryParts.map((part, index) => (
          <span key={part}>
            {index === 0 ? (
              <span className="font-bold text-ffie-ink">{part}</span>
            ) : (
              part
            )}
            {index < summaryParts.length - 1 ? ", " : "."}
          </span>
        ))}
      </p>
      {values.length > 0 && (
        <>
          <p className="mt-4 text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
            {copy.recapValuesLabel}
          </p>
          <ul className="mt-2 flex flex-wrap gap-1.5">
            {values.map((value) => (
              <li
                key={value}
                className="rounded-full border border-[#dcd7f7] bg-[#f6f4ff] px-3 py-1 text-[11px] font-medium text-[#3a2278]"
              >
                {value}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
