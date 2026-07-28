"use client";

import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import type { JourneyDraft } from "@/lib/journey/types";
import { NarrativeBlank } from "@/components/create/NarrativeBlank";
import { SettleButton } from "@/components/motion/SettleButton";

export function HiddenFunctionStep({
  draft,
  onSelectExtremeValue,
  onCompletionChange,
}: {
  draft: JourneyDraft;
  onSelectExtremeValue: (value: string) => void;
  onCompletionChange: (completion: string) => void;
}) {
  const values = resolveArtifactValues(draft);
  const selectedValue = draft.hiddenFunctionExtremeValue;
  const artifactName = draft.artifactName.trim() || "this artifact";

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-ffie-ink">
          Which of these values, if it went too far, would reveal this
          artifact&apos;s shadow side?
        </p>
        <div className="flex flex-wrap gap-2">
          {values.map((value) => {
            const selected = selectedValue === value;
            return (
              <SettleButton
                key={value}
                onClick={() => onSelectExtremeValue(value)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  selected
                    ? "border-ffie-accent bg-[#f6f4ff] font-medium text-ffie-accent"
                    : "border-ffie-line bg-ffie-surface text-ffie-ink hover:border-ffie-accent/30"
                }`}
              >
                {value}
              </SettleButton>
            );
          })}
        </div>
      </div>

      {selectedValue && (
        <NarrativeBlank
          before={`Every value has a shadow side. If ${selectedValue} in ${artifactName} went too far, it would `}
          after="."
          value={draft.hiddenFunctionCompletion}
          onChange={onCompletionChange}
          placeholder="what's the risk for the persona or market?"
        />
      )}

      {selectedValue && draft.hiddenFunctionCompletion.trim() && (
        <p className="text-xs italic text-ffie-muted">
          {composeHiddenFunction(draft)}
        </p>
      )}
    </div>
  );
}
