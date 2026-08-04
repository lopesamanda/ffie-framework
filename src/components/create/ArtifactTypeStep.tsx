"use client";

import Image from "next/image";
import { SettleButton } from "@/components/motion/SettleButton";
import { ChipSelect } from "@/components/create/ChipSelect";
import {
  ARTIFACT_SUBFORMAT_OTHER,
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
    ? [
        ...ARTIFACT_SUBFORMATS[draft.artifactType as ArtifactTypeId],
        ARTIFACT_SUBFORMAT_OTHER,
      ]
    : [];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="text-sm font-medium text-ffie-ink">
          What kind of artifact is it?
        </p>
        <p className="text-sm leading-relaxed text-ffie-muted">
          Choose the type that best fits — subformat only shapes how you describe
          it.
        </p>
      </div>

      <div className="grid max-w-xl gap-2 sm:grid-cols-2">
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
                  artifactSubformatOther: "",
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
              <div className="relative aspect-[16/9] w-full bg-ffie-bg">
                <Image
                  src={imagePath}
                  alt={option.label}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 42vw, 180px"
                />
              </div>
              <div
                className={`px-2.5 py-2 ${
                  selected ? "bg-ffie-accent text-ffie-bg" : "text-ffie-ink"
                }`}
              >
                <span className="block text-xs font-semibold">{option.label}</span>
                <span
                  className={`mt-0.5 block text-[10px] leading-snug ${
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
            Which subformat fits best?
          </p>
          <p className="text-sm leading-relaxed text-ffie-muted">
            This shapes how the artifact is described later — not a hard rule.
          </p>
          <ChipSelect
            label=""
            options={subformats}
            value={draft.artifactSubformat || null}
            onChange={(artifactSubformat) =>
              onChange({
                artifactSubformat,
                artifactSubformatOther:
                  artifactSubformat === ARTIFACT_SUBFORMAT_OTHER
                    ? draft.artifactSubformatOther
                    : "",
              })
            }
          />
          {draft.artifactSubformat === ARTIFACT_SUBFORMAT_OTHER && (
            <input
              type="text"
              value={draft.artifactSubformatOther}
              onChange={(event) =>
                onChange({ artifactSubformatOther: event.target.value })
              }
              placeholder="type your own"
              className="mt-3 w-full rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none placeholder:text-[13px] placeholder:text-ffie-muted/65 focus:border-ffie-accent/40"
            />
          )}
        </div>
      )}
    </div>
  );
}
