"use client";

import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import {
  composeHiddenFunction,
  hiddenFunctionPrompt,
} from "@/lib/journey/hidden-function";
import type { JourneyDraft } from "@/lib/journey/types";
import { CollapsibleOracleReferenceCard } from "@/components/create/design/OracleDeckFan";
import { NarrativeBlank } from "@/components/create/NarrativeBlank";

export function HiddenFunctionStep({
  draft,
  onSelectExtremeValue,
  onCompletionChange,
}: {
  draft: JourneyDraft;
  onSelectExtremeValue: (value: string) => void;
  onCompletionChange: (completion: string) => void;
}) {
  const hand = draft.cardHand!;
  const values = resolveArtifactValues(draft);
  const selectedValue = draft.hiddenFunctionExtremeValue;
  const artifactName = draft.artifactName.trim() || "this artifact";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        <CollapsibleOracleReferenceCard card={hand.risk} />
        <CollapsibleOracleReferenceCard card={hand.barrier} />
        <CollapsibleOracleReferenceCard card={hand.transversal} />
      </div>

      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-ffie-ink">
          {hiddenFunctionPrompt(draft)}
        </p>
        <div className="flex flex-wrap gap-2">
          {values.map((value) => {
            const selected = selectedValue === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => onSelectExtremeValue(value)}
                className={`rounded-full border px-3 py-1.5 text-sm transition ${
                  selected
                    ? "border-ffie-accent bg-[#f6f4ff] font-medium text-ffie-accent"
                    : "border-ffie-line bg-ffie-surface text-ffie-ink hover:border-ffie-accent/30"
                }`}
              >
                {value}
              </button>
            );
          })}
        </div>
      </div>

      {selectedValue && (
        <NarrativeBlank
          layout="stacked"
          before={`Pushed to its extreme, ${selectedValue} means ${artifactName} quietly`}
          value={draft.hiddenFunctionCompletion}
          onChange={onCompletionChange}
          placeholder="does something it never advertises"
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
