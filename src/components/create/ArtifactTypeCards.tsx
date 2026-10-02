"use client";

import Image from "next/image";
import { SettleButton } from "@/components/motion/SettleButton";
import { ARTIFACT_TYPE_OPTIONS } from "@/lib/journey/character-options";
import { defaultVisualDirectionForType } from "@/lib/journey/visual-directions";
import type { JourneyDraft } from "@/lib/journey/types";

/** Artifact type picker shared by Choose and the Make type step. */
export function ArtifactTypeCards({
  draft,
  onChange,
}: {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="grid gap-2 sm:grid-cols-3">
        {ARTIFACT_TYPE_OPTIONS.map((option) => {
          const selected = draft.artifactType === option.id;
          return (
            <SettleButton
              key={option.id}
              aria-pressed={selected}
              onClick={() => {
                if (selected) return;
                onChange({
                  artifactType: option.id,
                  artifactTypeOther:
                    option.id === "other" ? draft.artifactTypeOther : "",
                  artifactSubformat: "",
                  artifactSubformatOther: "",
                  visualDirection: defaultVisualDirectionForType(option.id),
                  selectedAiPower: "",
                  selectedAiCapability: "",
                  publicPromise: "",
                  artifactGoalPitch: "",
                });
              }}
              className={`overflow-hidden rounded-lg border text-left transition ${
                selected
                  ? "border-ffie-accent ring-2 ring-ffie-accent/25"
                  : "border-ffie-line bg-ffie-surface hover:border-ffie-accent/40"
              }`}
            >
              <div className="relative aspect-[16/9] w-full bg-ffie-bg">
                <Image
                  src={defaultVisualDirectionForType(option.id)}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, 200px"
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

      {draft.artifactType === "other" && (
        <input
          type="text"
          value={draft.artifactTypeOther}
          onChange={(event) =>
            onChange({ artifactTypeOther: event.target.value })
          }
          placeholder="what kind of thing is it?"
          aria-label="Name the kind of thing"
          className="w-full rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none placeholder:text-[13px] placeholder:text-ffie-muted/65 focus:border-ffie-accent/40"
        />
      )}
    </div>
  );
}

export function isArtifactTypeComplete(
  draft: Pick<JourneyDraft, "artifactType" | "artifactTypeOther">,
): boolean {
  if (!draft.artifactType) return false;
  if (draft.artifactType === "other") {
    return draft.artifactTypeOther.trim().length > 0;
  }
  return true;
}
