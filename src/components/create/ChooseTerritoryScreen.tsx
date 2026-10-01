"use client";

import {
  ArtifactTypeCards,
  isArtifactTypeComplete,
} from "@/components/create/ArtifactTypeCards";
import { BrowseInspirationLink } from "@/components/create/BrowseInspirationLink";
import { ChipSelect } from "@/components/create/ChipSelect";
import { FfieButton } from "@/components/create/design/FfieButton";
import {
  PERSONA_SECTOR_OPTIONS,
  type PersonaSector,
} from "@/lib/journey/persona-sectors";
import type { JourneyDraft } from "@/lib/journey/types";

export function isChooseTerritoryComplete(
  draft: Pick<
    JourneyDraft,
    | "personaSector"
    | "personaSectorCustom"
    | "artifactType"
    | "artifactTypeOther"
  >,
): boolean {
  const sectorChosen = Boolean(draft.personaSector);
  const sectorNamed =
    draft.personaSector !== "Other" ||
    draft.personaSectorCustom.trim().length > 0;
  return sectorChosen && sectorNamed && isArtifactTypeComplete(draft);
}

type ChooseTerritoryScreenProps = {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
  onContinue: () => void;
  onBack?: () => void;
};

/** Choose — no Figma frame yet. Built from existing chips, type cards, and tokens. */
export function ChooseTerritoryScreen({
  draft,
  onChange,
  onContinue,
  onBack,
}: ChooseTerritoryScreenProps) {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
          Sector
        </p>
        <ChipSelect
          label=""
          options={[...PERSONA_SECTOR_OPTIONS]}
          value={
            draft.personaSector &&
            PERSONA_SECTOR_OPTIONS.includes(draft.personaSector as PersonaSector)
              ? draft.personaSector
              : null
          }
          onChange={(personaSector) =>
            onChange({
              personaSector: personaSector as PersonaSector,
              personaSectorCustom:
                personaSector === "Other" ? draft.personaSectorCustom : "",
            })
          }
        />
        {draft.personaSector === "Other" && (
          <input
            type="text"
            value={draft.personaSectorCustom}
            onChange={(event) =>
              onChange({ personaSectorCustom: event.target.value })
            }
            placeholder="name the sector"
            aria-label="Name the sector"
            className="w-full max-w-md rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none placeholder:text-[13px] placeholder:text-ffie-muted/65 focus:border-ffie-accent/40"
          />
        )}
      </section>

      <section className="space-y-4">
        <div className="space-y-1">
          <p className="text-sm font-medium text-ffie-ink">
            What kind of thing might exist in this future?
          </p>
          <p className="text-sm leading-relaxed text-ffie-muted">
            You are not specifying a product yet — only the kind of presence it
            might have.
          </p>
        </div>
        <ArtifactTypeCards draft={draft} onChange={onChange} />
      </section>

      <div className="flex flex-col items-start gap-4">
        <div className="flex flex-wrap gap-3">
          {onBack && (
            <FfieButton variant="secondary" onClick={onBack}>
              Back
            </FfieButton>
          )}
          <FfieButton
            disabled={!isChooseTerritoryComplete(draft)}
            onClick={onContinue}
            iconPosition="trailing"
          >
            Continue
          </FfieButton>
        </div>
        <BrowseInspirationLink />
      </div>
    </div>
  );
}
