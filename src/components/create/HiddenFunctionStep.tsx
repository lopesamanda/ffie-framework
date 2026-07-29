"use client";

import { useEffect, useState } from "react";
import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import {
  ARTIFACT_WEAKNESS_OTHER_LABEL,
  isPresetWeaknessOutcome,
  weaknessOptionsForValue,
} from "@/lib/journey/artifact-weakness-options";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import type { JourneyDraft } from "@/lib/journey/types";
import { NarrativeBlank } from "@/components/create/NarrativeBlank";
import { SettleButton } from "@/components/motion/SettleButton";
import { ffieCardShell } from "@/lib/card-layout";

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
  const presetOptions = selectedValue
    ? weaknessOptionsForValue(selectedValue)
    : [];
  const completion = draft.hiddenFunctionCompletion.trim();

  const [otherActive, setOtherActive] = useState(false);

  useEffect(() => {
    if (!selectedValue) {
      setOtherActive(false);
      return;
    }
    if (!completion) {
      setOtherActive(false);
      return;
    }
    setOtherActive(!isPresetWeaknessOutcome(selectedValue, completion));
  }, [selectedValue, completion]);

  const showOtherInput =
    otherActive ||
    (presetOptions.length === 0 && Boolean(selectedValue));

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
        <div className="space-y-3">
          <p className="text-sm leading-relaxed text-ffie-ink">
            If {selectedValue} went too far in {artifactName}, it would…
          </p>

          {presetOptions.length > 0 && (
            <div className="space-y-2">
              {presetOptions.map((option) => {
                const selected = completion === option;
                return (
                  <SettleButton
                    key={option}
                    onClick={() => {
                      setOtherActive(false);
                      onCompletionChange(option);
                    }}
                    className={`block w-full rounded-xl border px-4 py-3 text-left text-sm leading-relaxed transition ${
                      selected
                        ? "border-ffie-accent bg-[#f6f4ff] font-medium text-ffie-ink shadow-[0_0_0_1px_rgba(110,82,196,0.2)]"
                        : `${ffieCardShell} bg-ffie-bg/50 text-ffie-ink hover:border-ffie-accent/35`
                    }`}
                  >
                    {option}
                  </SettleButton>
                );
              })}
              <SettleButton
                onClick={() => {
                  setOtherActive(true);
                  onCompletionChange("");
                }}
                className={`block w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                  otherActive
                    ? "border-ffie-accent bg-[#f6f4ff] font-medium text-ffie-accent"
                    : `${ffieCardShell} bg-ffie-bg/50 text-ffie-muted hover:border-ffie-accent/35 hover:text-ffie-ink`
                }`}
              >
                {ARTIFACT_WEAKNESS_OTHER_LABEL}
              </SettleButton>
            </div>
          )}

          {showOtherInput && (
            <NarrativeBlank
              before={`Every value has a shadow side. If ${selectedValue} in ${artifactName} went too far, it would `}
              after="."
              value={draft.hiddenFunctionCompletion}
              onChange={onCompletionChange}
              placeholder="shadow side"
            />
          )}
        </div>
      )}

      {selectedValue && completion && (
        <p className="text-xs italic text-ffie-muted">
          {composeHiddenFunction(draft)}
        </p>
      )}
    </div>
  );
}
