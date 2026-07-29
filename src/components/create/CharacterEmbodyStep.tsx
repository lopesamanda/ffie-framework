"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CardHand } from "@/lib/journey/types";
import {
  CHARACTER_VALUES,
  GENDER_OPTIONS,
  RACE_ETHNICITY_OPTIONS,
  RACE_SELF_DESCRIBE,
  ROLE_OPTIONS,
  type CharacterGenderId,
} from "@/lib/journey/character-options";
import {
  PERSONA_SECTOR_OPTIONS,
  type PersonaSector,
} from "@/lib/journey/persona-sectors";
import type { CharacterPronounId } from "@/lib/journey/embody-flow";
import {
  EMBODY_SCREEN_COUNT,
  PRONOUN_OPTIONS,
} from "@/lib/journey/embody-flow";
import {
  pronounsForSelection,
  verbFor,
} from "@/lib/journey/character-pronouns";
import { EmbodyBuildStoryScreen } from "@/components/create/EmbodyBuildStoryScreen";
import { EmbodyFearScreen } from "@/components/create/EmbodyTensionScreen";
import { FfieButton } from "@/components/create/design/FfieButton";
import { ChipField, ChipSelect } from "@/components/create/ChipSelect";
import { NarrativeBlank, NarrativeBlock } from "@/components/create/NarrativeBlank";
import { FUTURE_HORIZON_LABEL } from "@/lib/journey/future-horizon";
import { resolvedPersonaSector } from "@/lib/journey/resolved-sector";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";

export type CharacterEmbodyDraft = {
  characterName: string;
  characterAge: string;
  characterGender: CharacterGenderId | "";
  characterPronoun: CharacterPronounId | "";
  characterRaceEthnicity: string;
  raceSelfDescribe: string;
  role: string;
  roleCustom: string;
  personaSector: PersonaSector | "";
  personaSectorCustom: string;
  location: string;
  aiFunction: string;
  tradeoffLoss: string;
  desire: string;
  fear: string;
  values: string[];
};

type CharacterEmbodyStepProps = {
  draft: CharacterEmbodyDraft;
  cardHand: CardHand | null;
  embodySubStep: number;
  onChange: (patch: Partial<CharacterEmbodyDraft>) => void;
  onSubStepChange: (step: number) => void;
  onComplete: () => void;
};

function EmbodyDots({ current }: { current: number }) {
  return (
    <div
      className="flex justify-center gap-1.5"
      aria-label={`Embody step ${current + 1} of ${EMBODY_SCREEN_COUNT}`}
    >
      {Array.from({ length: EMBODY_SCREEN_COUNT }, (_, index) => (
        <span
          key={index}
          className={`size-1.5 rounded-full transition ${
            index === current
              ? "bg-ffie-accent scale-125"
              : index < current
                ? "bg-ffie-ink/40"
                : "bg-ffie-ink/15"
          }`}
        />
      ))}
    </div>
  );
}

export function isEmbodyScreenComplete(
  draft: CharacterEmbodyDraft,
  screen: number,
): boolean {
  const age = Number.parseInt(draft.characterAge, 10);
  const raceResolved =
    draft.characterRaceEthnicity === RACE_SELF_DESCRIBE
      ? draft.raceSelfDescribe.trim().length > 0
      : draft.characterRaceEthnicity.trim().length > 0;

  switch (screen) {
    case 0:
      return (
        draft.characterPronoun !== "" &&
        draft.characterName.trim().length > 0 &&
        Number.isFinite(age) &&
        age > 0 &&
        draft.characterGender !== "" &&
        raceResolved
      );
    case 1:
      return (
        draft.role.trim().length > 0 &&
        draft.personaSector !== "" &&
        (draft.personaSector !== "Other" ||
          draft.personaSectorCustom.trim().length > 0) &&
        draft.location.trim().length > 0
      );
    case 2:
      return draft.values.length === 3;
    case 3:
      return (
        draft.aiFunction.trim().length > 0 &&
        draft.tradeoffLoss.trim().length > 0 &&
        draft.desire.trim().length > 0
      );
    case 4:
      return draft.fear.trim().length > 0;
    default:
      return false;
  }
}

export function isCharacterEmbodyComplete(draft: CharacterEmbodyDraft): boolean {
  return Array.from({ length: EMBODY_SCREEN_COUNT }, (_, index) =>
    isEmbodyScreenComplete(draft, index),
  ).every(Boolean);
}

export function resolvedRaceEthnicity(draft: CharacterEmbodyDraft): string {
  if (draft.characterRaceEthnicity === RACE_SELF_DESCRIBE) {
    return draft.raceSelfDescribe.trim();
  }
  return draft.characterRaceEthnicity.trim();
}

export function resolvedGenderLabel(draft: CharacterEmbodyDraft): string {
  const match = GENDER_OPTIONS.find(
    (option) => option.id === draft.characterGender,
  );
  return match?.label ?? "";
}

export function resolvedPronounLabel(draft: CharacterEmbodyDraft): string {
  const match = PRONOUN_OPTIONS.find(
    (option) => option.id === draft.characterPronoun,
  );
  return match?.label ?? "";
}

export function CharacterEmbodyStep({
  draft,
  cardHand,
  embodySubStep,
  onChange,
  onSubStepChange,
  onComplete,
}: CharacterEmbodyStepProps) {
  const reduceMotion = useReducedMotion();
  const p = pronounsForSelection(draft.characterPronoun);
  const showRaceSelfDescribe =
    draft.characterRaceEthnicity === RACE_SELF_DESCRIBE;
  const canContinue = isEmbodyScreenComplete(draft, embodySubStep);

  const screenContent = () => {
    switch (embodySubStep) {
      case 0:
        return (
          <div className="space-y-6">
            <ChipField label="Which pronouns should we use for your character?">
              <ChipSelect
                label=""
                options={PRONOUN_OPTIONS.map((option) => ({
                  id: option.id,
                  label: option.label,
                }))}
                value={draft.characterPronoun || null}
                onChange={(characterPronoun) =>
                  onChange({
                    characterPronoun: characterPronoun as CharacterPronounId,
                  })
                }
              />
            </ChipField>

            {draft.characterPronoun && (
              <>
                <NarrativeBlock>
                  <NarrativeBlank
                    before={`${p.possessiveCap} name is `}
                    after={` and, ${FUTURE_HORIZON_LABEL}, ${p.subject} ${verbFor(p, "is", "are")} `}
                    value={draft.characterName}
                    onChange={(characterName) => onChange({ characterName })}
                    placeholder="name"
                  />
                  <NarrativeBlank
                    before=""
                    after=" years old."
                    value={draft.characterAge}
                    onChange={(characterAge) => onChange({ characterAge })}
                    inputMode="numeric"
                    placeholder="age"
                  />
                </NarrativeBlock>

                <ChipField label="Identifies as…">
                  <ChipSelect
                    label=""
                    options={GENDER_OPTIONS.map((option) => ({
                      id: option.id,
                      label: option.label,
                    }))}
                    value={draft.characterGender || null}
                    onChange={(characterGender) =>
                      onChange({
                        characterGender: characterGender as CharacterGenderId,
                      })
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
                      className="mt-3 w-full rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none focus:border-ffie-accent/40"
                    />
                  )}
                </ChipField>
              </>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <ChipField label={`In the innovation ecosystem, ${p.subject} ${verbFor(p, "is", "are")} a…`}>
              <ChipSelect
                label=""
                options={[...ROLE_OPTIONS]}
                value={
                  draft.role &&
                  ROLE_OPTIONS.includes(
                    draft.role as (typeof ROLE_OPTIONS)[number],
                  )
                    ? draft.role
                    : null
                }
                onChange={(role) => onChange({ role, roleCustom: "" })}
              />
              <input
                type="text"
                value={draft.roleCustom || draft.role}
                onChange={(event) =>
                  onChange({
                    roleCustom: event.target.value,
                    role: event.target.value,
                  })
                }
                placeholder="type your own"
                className="mt-3 w-full rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none placeholder:text-[13px] placeholder:text-ffie-muted/65 focus:border-ffie-accent/40"
              />
            </ChipField>

            <ChipField label={`${p.possessiveCap} sector in this ecosystem is…`}>
              <ChipSelect
                label=""
                options={[...PERSONA_SECTOR_OPTIONS]}
                value={
                  draft.personaSector &&
                  PERSONA_SECTOR_OPTIONS.includes(
                    draft.personaSector as PersonaSector,
                  )
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
                  placeholder="type your own"
                  className="mt-3 w-full rounded-lg border border-ffie-line bg-ffie-surface px-3 py-2 text-sm outline-none placeholder:text-[13px] placeholder:text-ffie-muted/65 focus:border-ffie-accent/40"
                />
              )}
            </ChipField>

            <NarrativeBlock>
              <NarrativeBlank
                before={`${p.subjectCap} speaks from `}
                after=""
                value={draft.location}
                onChange={(location) => onChange({ location })}
                placeholder="city, country, or context"
              />
            </NarrativeBlock>
          </div>
        );

      case 2:
        return (
          <ChipField
            label={`The values ${p.subject} ${verbFor(p, "carries", "carry")} into this future:`}
          >
            <ChipSelect
              label=""
              options={CHARACTER_VALUES}
              value={draft.values}
              onChange={(values) => onChange({ values })}
              multi
              max={3}
            />
            <p className="text-xs text-ffie-muted">
              {draft.values.length}/3 selected
            </p>
          </ChipField>
        );

      case 3:
        return (
          <EmbodyBuildStoryScreen
            draft={draft}
            role={resolvedCharacterRole(draft.role, draft.roleCustom)}
            sector={
              resolvedPersonaSector(
                draft.personaSector,
                draft.personaSectorCustom,
              ) || "…"
            }
            p={p}
            onChange={onChange}
          />
        );

      case 4:
        return (
          <EmbodyFearScreen
            draft={draft}
            role={resolvedCharacterRole(draft.role, draft.roleCustom)}
            cardHand={cardHand}
            p={p}
            onChange={onChange}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <p className="text-sm leading-relaxed text-ffie-muted">
        Picture someone living {FUTURE_HORIZON_LABEL}. Who are you building this
        future for?
      </p>

      <EmbodyDots current={embodySubStep} />

      <AnimatePresence mode="wait">
        <motion.div
          key={embodySubStep}
          initial={reduceMotion ? false : { opacity: 0, x: 12 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, x: -12 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
        >
          {screenContent()}
        </motion.div>
      </AnimatePresence>

      <div className="flex gap-3">
        {embodySubStep > 0 && (
          <FfieButton
            variant="secondary"
            onClick={() => onSubStepChange(embodySubStep - 1)}
          >
            Back
          </FfieButton>
        )}
        <FfieButton
          disabled={!canContinue}
          onClick={() => {
            if (embodySubStep < EMBODY_SCREEN_COUNT - 1) {
              onSubStepChange(embodySubStep + 1);
            } else {
              onComplete();
            }
          }}
        >
          {embodySubStep < EMBODY_SCREEN_COUNT - 1 ? "Continue" : "Next"}
        </FfieButton>
      </div>
    </div>
  );
}
