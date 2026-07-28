"use client";

import { ARTIFACT_TYPE_OPTIONS } from "@/lib/journey/character-options";
import { SettleButton } from "@/components/motion/SettleButton";
import type { JourneyDraft } from "@/lib/journey/types";

const FIELD =
  "w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none placeholder:text-[13px] placeholder:text-ffie-muted/65 focus:border-ffie-accent/40";

export function ArtifactIdentityStep({
  draft,
  onChange,
}: {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
}) {
  return (
    <div className="space-y-8">
      <label className="block space-y-2">
        <span className="text-sm font-medium leading-relaxed text-ffie-ink">
          This object or system has a provisional name. What is it?
        </span>
        <input
          value={draft.artifactName}
          onChange={(event) => onChange({ artifactName: event.target.value })}
          placeholder="artifact name"
          className={FIELD}
        />
      </label>

      <div className="space-y-3 rounded-xl border border-dashed border-ffie-accent/25 bg-ffie-accent-soft/20 px-4 py-4">
        <p className="text-sm font-medium text-ffie-ink">
          What kind of artifact is it?
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {ARTIFACT_TYPE_OPTIONS.map((option) => {
            const selected = draft.artifactType === option.id;
            return (
              <SettleButton
                key={option.id}
                onClick={() => onChange({ artifactType: option.id })}
                className={`rounded-xl border px-4 py-3 text-left transition ${
                  selected
                    ? "border-ffie-ink bg-ffie-ink text-ffie-bg"
                    : "border-ffie-line bg-ffie-surface text-ffie-ink hover:border-ffie-accent/40"
                }`}
              >
                <span className="block text-sm font-semibold">{option.label}</span>
                <span
                  className={`mt-1 block text-xs ${
                    selected ? "text-ffie-bg/80" : "text-ffie-muted"
                  }`}
                >
                  {option.description}
                </span>
              </SettleButton>
            );
          })}
        </div>
      </div>
    </div>
  );
}
