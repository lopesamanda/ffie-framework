"use client";

import { BrowseInspirationLink } from "@/components/create/BrowseInspirationLink";
import { ChipSelect } from "@/components/create/ChipSelect";
import { FfieButton } from "@/components/create/design/FfieButton";
import {
  PERSONA_SECTOR_OPTIONS,
  type PersonaSector,
} from "@/lib/journey/persona-sectors";
import type { JourneyDraft } from "@/lib/journey/types";

export function isChooseTerritoryComplete(
  draft: Pick<JourneyDraft, "personaSector" | "personaSectorCustom">,
): boolean {
  if (!draft.personaSector) return false;
  if (draft.personaSector === "Other") {
    return draft.personaSectorCustom.trim().length > 0;
  }
  return true;
}

type ChooseTerritoryScreenProps = {
  draft: JourneyDraft;
  onChange: (patch: Partial<JourneyDraft>) => void;
  onContinue: () => void;
  onBack?: () => void;
};

/** Choose — no Figma frame. Existing chips and tokens; sector only. */
export function ChooseTerritoryScreen({
  draft,
  onChange,
  onContinue,
  onBack,
}: ChooseTerritoryScreenProps) {
  return (
    <div className="space-y-8">
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
