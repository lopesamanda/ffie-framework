"use client";

import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import type { JourneyDraft } from "@/lib/journey/types";
import {
  OracleFanRevealedCard,
  OracleFanTransversalCard,
} from "@/components/create/design/OracleDeckFan";
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
        <OracleFanRevealedCard card={hand.risk} />
        <OracleFanRevealedCard card={hand.barrier} />
        <OracleFanTransversalCard card={hand.transversal} />
      </div>

      <div className="space-y-3">
        <p className="text-sm leading-relaxed text-ffie-ink">
          Which of these values, pushed too far, might turn into something
          else?
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
