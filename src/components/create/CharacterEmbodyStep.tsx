"use client";

import type { CardHand } from "@/lib/journey/types";
import type { FutureCountry } from "@/types/future";
import {
  CHARACTER_VALUES,
  COUNTRY_OPTIONS,
  GENDER_OPTIONS,
  RACE_ETHNICITY_OPTIONS,
  RACE_SELF_DESCRIBE,
  ROLE_OPTIONS,
  type CharacterGenderId,
} from "@/lib/journey/character-options";
import { pronounsForGender } from "@/lib/journey/character-pronouns";
import { NarrativeCardFace } from "@/components/create/NarrativeCardFace";
import { ChipField, ChipSelect } from "@/components/create/ChipSelect";
import { NarrativeBlank, NarrativeBlock } from "@/components/create/NarrativeBlank";

export type CharacterEmbodyDraft = {
  characterName: string;
  characterAge: string;
  characterGender: CharacterGenderId | "";
  characterRaceEthnicity: string;
  raceSelfDescribe: string;
  role: string;
  roleCustom: string;
  characterCity: string;
  characterCountry: FutureCountry | "";
  aiFunction: string;
  desire: string;
  fear: string;
  values: string[];
};

type CharacterEmbodyStepProps = {
  draft: CharacterEmbodyDraft;
  cardHand: CardHand | null;
  onChange: (patch: Partial<CharacterEmbodyDraft>) => void;
};

export function CharacterEmbodyStep({
  draft,
  cardHand,
  onChange,
}: CharacterEmbodyStepProps) {
  const p = pronounsForGender(draft.characterGender);
  const showRaceSelfDescribe =
    draft.characterRaceEthnicity === RACE_SELF_DESCRIBE;

  return (
    <div className="space-y-8">
      <p className="text-sm leading-relaxed text-ffie-muted">
        Picture someone living in 2036. Who are you building this future for?
      </p>

      <NarrativeBlock>
        <NarrativeBlank
          before={`${p.possessiveCap} name is `}
          after={` and in 2036 ${p.subject} is `}
          value={draft.characterName}
          onChange={(characterName) => onChange({ characterName })}
          placeholder="name"
        />
        <NarrativeBlank
          before=""
          after=" years old."
          value={draft.characterAge}
          onChange={(characterAge) => onChange({ characterAge })}
          placeholder="age"
          inputMode="numeric"
        />
      </NarrativeBlock>

      <ChipField label={`${p.subjectCap} is…`}>
        <ChipSelect
          label=""
          options={GENDER_OPTIONS.map((option) => ({
            id: option.id,
            label: option.label,
          }))}
          value={draft.characterGender || null}
          onChange={(characterGender) =>
            onChange({ characterGender: characterGender as CharacterGenderId })
          }
        />
      </ChipField>

      <ChipField label={`${p.possessiveCap} background is…`}>
        <ChipSelect
          label=""
          options={[...RACE_ETHNICITY_OPTIONS, RACE_SELF_DESCRIBE]}
          value={draft.characterRaceEthnicity || null}
          onChange={(characterRaceEthnicity) =>
            onChange({
              characterRaceEthnicity,
              raceSelfDescribe:
                characterRaceEthnicity === RACE_SELF_DESCRIBE
                  ? draft.raceSelfDescribe
                  : "",
            })
          }
        />
        {showRaceSelfDescribe && (
          <input
            type="text"
            value={draft.raceSelfDescribe}
            onChange={(event) =>
              onChange({ raceSelfDescribe: event.target.value })
            }
            placeholder="Describe in your own words"
            className="mt-3 w-full rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none focus:border-ffie-accent/40"
          />
        )}
      </ChipField>

      <ChipField label={`In the innovation ecosystem, ${p.subject} is a…`}>
        <ChipSelect
          label=""
          options={[...ROLE_OPTIONS]}
          value={
            draft.role && ROLE_OPTIONS.includes(draft.role as (typeof ROLE_OPTIONS)[number])
              ? draft.role
              : null
          }
          onChange={(role) => onChange({ role, roleCustom: "" })}
        />
        <input
          type="text"
          value={draft.roleCustom || draft.role}
          onChange={(event) =>
            onChange({ roleCustom: event.target.value, role: event.target.value })
          }
          placeholder="Or describe in your own words"
          className="mt-3 w-full rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none focus:border-ffie-accent/40"
        />
      </ChipField>

      <ChipField label={`${p.subjectCap} speaks from…`}>
        <input
          type="text"
          value={draft.characterCity}
          onChange={(event) => onChange({ characterCity: event.target.value })}
          placeholder="City"
          className="w-full rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none focus:border-ffie-accent/40"
        />
        <div className="mt-3">
          <ChipSelect
            label="Country"
            options={COUNTRY_OPTIONS}
            value={draft.characterCountry || null}
            onChange={(characterCountry) =>
              onChange({ characterCountry: characterCountry as FutureCountry })
            }
          />
        </div>
      </ChipField>

      <NarrativeBlock>
        {cardHand && (
          <div className="mb-4 max-w-xs">
            <NarrativeCardFace card={cardHand.benefit} />
          </div>
        )}
        <NarrativeBlank
          before={`Thanks to AI, ${p.subject} is able to `}
          after="."
          value={draft.aiFunction}
          onChange={(aiFunction) => onChange({ aiFunction })}
          placeholder="complete the sentence"
        />
      </NarrativeBlock>

      <NarrativeBlock>
        <NarrativeBlank
          before={`${p.subjectCap} still holds on to the hope that `}
          after="."
          value={draft.desire}
          onChange={(desire) => onChange({ desire })}
          placeholder="complete the sentence"
        />
      </NarrativeBlock>

      <NarrativeBlock>
        {cardHand && (
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <NarrativeCardFace card={cardHand.risk} />
            <NarrativeCardFace card={cardHand.barrier} />
          </div>
        )}
        <NarrativeBlank
          before={`What ${p.subject} fears most is that AI will `}
          after="."
          value={draft.fear}
          onChange={(fear) => onChange({ fear })}
          placeholder="complete the sentence"
        />
      </NarrativeBlock>

      <ChipField
        label={`The three things ${p.possessiveCap} refuses to compromise on:`}
      >
        <ChipSelect
          label=""
          options={CHARACTER_VALUES}
          value={draft.values}
          onChange={(values) => onChange({ values })}
          multi
          max={3}
        />
        <p className="text-xs text-ffie-muted">{draft.values.length}/3 selected</p>
      </ChipField>
    </div>
  );
}

export function isCharacterEmbodyComplete(draft: CharacterEmbodyDraft): boolean {
  const age = Number.parseInt(draft.characterAge, 10);
  const raceResolved =
    draft.characterRaceEthnicity === RACE_SELF_DESCRIBE
      ? draft.raceSelfDescribe.trim().length > 0
      : draft.characterRaceEthnicity.trim().length > 0;

  return (
    draft.characterName.trim().length > 0 &&
    Number.isFinite(age) &&
    age > 0 &&
    draft.characterGender !== "" &&
    raceResolved &&
    draft.role.trim().length > 0 &&
    draft.characterCity.trim().length > 0 &&
    draft.characterCountry !== "" &&
    draft.aiFunction.trim().length > 0 &&
    draft.desire.trim().length > 0 &&
    draft.fear.trim().length > 0 &&
    draft.values.length === 3
  );
}

export function resolvedRaceEthnicity(draft: CharacterEmbodyDraft): string {
  if (draft.characterRaceEthnicity === RACE_SELF_DESCRIBE) {
    return draft.raceSelfDescribe.trim();
  }
  return draft.characterRaceEthnicity.trim();
}

export function resolvedGenderLabel(draft: CharacterEmbodyDraft): string {
  const match = GENDER_OPTIONS.find((option) => option.id === draft.characterGender);
  return match?.label ?? "";
}
