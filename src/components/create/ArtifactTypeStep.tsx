"use client";

import { ArtifactTypeCards } from "@/components/create/ArtifactTypeCards";
import { ChipSelect } from "@/components/create/ChipSelect";
import {
  ARTIFACT_SUBFORMAT_OTHER,
  ARTIFACT_SUBFORMATS,
  type ArtifactTypeId,
} from "@/lib/journey/character-options";
import type { JourneyDraft } from "@/lib/journey/types";

export function ArtifactTypeStep({
  draft,
  onChange,
}: {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
}) {
  const typeSubformats = draft.artifactType
    ? ARTIFACT_SUBFORMATS[draft.artifactType as ArtifactTypeId]
    : [];
  const subformats =
    typeSubformats.length > 0
      ? [...typeSubformats, ARTIFACT_SUBFORMAT_OTHER]
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

      <div className="max-w-xl">
        <ArtifactTypeCards draft={draft} onChange={onChange} />
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
