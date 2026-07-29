"use client";

import { useMemo } from "react";
import type { AiCapabilityCard } from "@/data/ai-capability-cards";
import type { ArtifactTypeId } from "@/lib/journey/character-options";
import {
  AI_CAPABILITY_POWERS,
  cardsForPower,
  DAY_TO_DAY_POWER_PLACEHOLDERS,
  formatPersonaValuesList,
  type AiCapabilityPowerId,
} from "@/lib/journey/ai-capability-clusters";
import { PowerGlyph } from "@/components/create/design/PowerGlyph";
import { SettleButton } from "@/components/motion/SettleButton";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardSectionLabel,
  ffieCardTitle,
} from "@/lib/card-layout";

const FIELD =
  "w-full resize-y rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

type AiPowerSelectorProps = {
  values: string[];
  artifactType: ArtifactTypeId | "";
  artifactName: string;
  selectedPower: AiCapabilityPowerId | "";
  selectedCapabilityId: string;
  dayToDayDescription: string;
  artifactGoalPitch: string;
  onSelectPower: (powerId: AiCapabilityPowerId) => void;
  onSelectCapability: (capabilityId: string) => void;
  onDayToDayChange: (value: string) => void;
  onGoalPitchChange: (value: string) => void;
};

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function AiPowerSelector({
  values,
  artifactType,
  artifactName,
  selectedPower,
  selectedCapabilityId,
  dayToDayDescription,
  artifactGoalPitch,
  onSelectPower,
  onSelectCapability,
  onDayToDayChange,
  onGoalPitchChange,
}: AiPowerSelectorProps) {
  const valuesPhrase = formatPersonaValuesList(values);
  const displayName = artifactName.trim() || "this artifact";

  const powerCards = useMemo(() => {
    if (!selectedPower) return [] as AiCapabilityCard[];
    let cards = cardsForPower(selectedPower);
    if (artifactType) {
      cards = cards.filter((card) => !card.agentOnly || artifactType === "agent");
    }
    return cards;
  }, [selectedPower, artifactType]);

  return (
    <div className="space-y-4">
      <p className="text-sm leading-relaxed text-ffie-ink">
        Given <span className="font-medium">{valuesPhrase}</span>, which power
        does Artificial Intelligence bring to this artifact?
      </p>

      <div className="flex flex-wrap gap-2">
        {AI_CAPABILITY_POWERS.map((power) => {
          const selected = selectedPower === power.id;
          return (
            <SettleButton
              key={power.id}
              onClick={() => onSelectPower(power.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                selected
                  ? "border-ffie-accent bg-ffie-accent-soft text-ffie-accent"
                  : "border-ffie-line bg-ffie-surface text-ffie-ink hover:border-ffie-accent/40"
              }`}
              aria-pressed={selected}
            >
              <span className="text-ffie-accent">
                <PowerGlyph powerId={power.id} size={14} />
              </span>
              {power.label}
            </SettleButton>
          );
        })}
      </div>

      {selectedPower && powerCards.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm font-medium text-ffie-ink">
            Choose one capability below to continue:
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {powerCards.map((card) => (
              <SelectableCapabilityCard
                key={card.id}
                card={card}
                selected={selectedCapabilityId === card.id}
                selectedPower={selectedPower}
                dayToDayDescription={
                  selectedCapabilityId === card.id ? dayToDayDescription : ""
                }
                artifactGoalPitch={
                  selectedCapabilityId === card.id ? artifactGoalPitch : ""
                }
                artifactName={displayName}
                onSelect={() => onSelectCapability(card.id)}
                onDayToDayChange={onDayToDayChange}
                onGoalPitchChange={onGoalPitchChange}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function SelectableCapabilityCard({
  card,
  selected,
  selectedPower,
  dayToDayDescription,
  artifactGoalPitch,
  artifactName,
  onSelect,
  onDayToDayChange,
  onGoalPitchChange,
}: {
  card: AiCapabilityCard;
  selected: boolean;
  selectedPower: AiCapabilityPowerId;
  dayToDayDescription: string;
  artifactGoalPitch: string;
  artifactName: string;
  onSelect: () => void;
  onDayToDayChange: (value: string) => void;
  onGoalPitchChange: (value: string) => void;
}) {
  const dayToDayPlaceholder = DAY_TO_DAY_POWER_PLACEHOLDERS[selectedPower];

  return (
    <div
      className={`rounded-xl border-2 bg-ffie-bg/40 transition ${
        selected
          ? "border-ffie-accent bg-[#f6f4ff] shadow-[0_0_0_3px_rgba(110,82,196,0.18)]"
          : "border-ffie-line/80 hover:border-ffie-accent/35"
      }`}
      style={{ borderTopWidth: 3, borderTopColor: card.color }}
    >
      <SettleButton
        onClick={onSelect}
        aria-pressed={selected}
        className="w-full px-4 py-3 text-left"
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <p className={`${ffieCardCategory} text-ffie-muted`}>Capability</p>
            <h4 className={`mt-1 ${ffieCardTitle} text-sm ${FFIE_CARD_TEXT}`}>
              {card.name}
            </h4>
          </div>
          {selected && (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-ffie-accent text-white">
              <CheckIcon />
            </span>
          )}
        </div>

        <p
          className={`mt-2 ${ffieCardDescription} not-italic ${FFIE_CARD_TEXT}`}
        >
          {card.description}
        </p>

        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-ffie-line bg-ffie-accent-soft/60 px-2.5 py-0.5 text-[10px] font-semibold text-ffie-ink"
            >
              {tag}
            </span>
          ))}
        </div>
      </SettleButton>

      {selected && (
        <div className="border-t border-ffie-accent/25 px-4 pb-4 pt-3">
          <div className="rounded-lg border border-ffie-line/70 bg-white/70 px-3 py-3">
            <p className={ffieCardSectionLabel}>Example</p>
            <p
              className={`mt-1.5 text-sm italic leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}
            >
              {card.examples[0]}
            </p>
          </div>

          <div className="mt-4 space-y-2">
            <p className={`${ffieCardCategory} text-ffie-muted`}>
              Use these to shape your answer
            </p>
            <ul className="space-y-1.5">
              {card.artifactGuidingQuestions.map((question) => (
                <li
                  key={question}
                  className={`text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}
                >
                  · {question}
                </li>
              ))}
            </ul>
          </div>

          <label className="mt-4 block space-y-2">
            <span className="text-sm leading-relaxed text-ffie-ink">
              Describe what it does, day to day, now that you&apos;ve chosen its
              power.
            </span>
            <textarea
              value={dayToDayDescription}
              onChange={(event) => onDayToDayChange(event.target.value)}
              rows={4}
              className={FIELD}
              placeholder={dayToDayPlaceholder}
            />
          </label>

          <label className="mt-4 block space-y-2">
            <span className="text-sm leading-relaxed text-ffie-muted">
              Optional: if {artifactName} had a pitch line — the one impact it
              claims to deliver — what would it be?
            </span>
            <textarea
              value={artifactGoalPitch}
              onChange={(event) => onGoalPitchChange(event.target.value)}
              rows={2}
              className={FIELD}
              placeholder="One line — skippable."
            />
          </label>
        </div>
      )}
    </div>
  );
}
