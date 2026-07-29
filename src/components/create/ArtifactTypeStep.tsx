"use client";

import Image from "next/image";
import { SettleButton } from "@/components/motion/SettleButton";
import { ChipSelect } from "@/components/create/ChipSelect";
import {
  ARTIFACT_SUBFORMATS,
  ARTIFACT_TYPE_OPTIONS,
  type ArtifactTypeId,
} from "@/lib/journey/character-options";
import { defaultVisualDirectionForType } from "@/lib/journey/visual-directions";
import type { JourneyDraft } from "@/lib/journey/types";

export function ArtifactTypeStep({
  draft,
  onChange,
}: {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
}) {
  const subformats = draft.artifactType
    ? ARTIFACT_SUBFORMATS[draft.artifactType as ArtifactTypeId]
    : [];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-ffie-ink">
          What kind of artifact is it?
        </p>
        <p className="text-sm leading-relaxed text-ffie-muted">
          Choose the type that best fits — subformat is optional and only shapes
          how you describe it.
        </p>
      </div>

      <div className="grid max-w-2xl gap-2.5 sm:grid-cols-2">
        {ARTIFACT_TYPE_OPTIONS.map((option) => {
          const selected = draft.artifactType === option.id;
          const imagePath = defaultVisualDirectionForType(option.id);
          return (
            <SettleButton
              key={option.id}
              onClick={() =>
                onChange({
                  artifactType: option.id,
                  artifactSubformat: "",
                  visualDirection: defaultVisualDirectionForType(option.id),
                  selectedAiPower: "",
                  selectedAiCapability: "",
                  publicPromise: "",
                  artifactGoalPitch: "",
                })
              }
              className={`overflow-hidden rounded-lg border text-left transition ${
                selected
                  ? "border-ffie-accent ring-2 ring-ffie-accent/25"
                  : "border-ffie-line bg-ffie-surface hover:border-ffie-accent/40"
              }`}
            >
              <div className="relative aspect-[5/3] w-full bg-ffie-bg">
                <Image
                  src={imagePath}
                  alt={option.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 45vw, 220px"
                />
              </div>
              <div
                className={`px-3 py-2.5 ${
                  selected ? "bg-ffie-accent text-ffie-bg" : "text-ffie-ink"
                }`}
              >
                <span className="block text-sm font-semibold">{option.label}</span>
                <span
                  className={`mt-0.5 block text-[11px] leading-relaxed ${
                    selected ? "text-ffie-bg/80" : "text-ffie-muted"
                  }`}
                >
                  {option.description}
                </span>
              </div>
            </SettleButton>
          );
        })}
      </div>

      {draft.artifactType && subformats.length > 0 && (
        <div className="space-y-3 rounded-xl border border-dashed border-ffie-accent/25 bg-ffie-accent-soft/20 px-4 py-4">
          <p className="text-sm font-medium text-ffie-ink">
            Which subformat fits best? (optional)
          </p>
          <ChipSelect
            label=""
            options={subformats}
            value={draft.artifactSubformat || null}
            onChange={(artifactSubformat) => onChange({ artifactSubformat })}
          />
        </div>
      )}
    </div>
  );
}
