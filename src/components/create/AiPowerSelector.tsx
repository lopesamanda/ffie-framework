"use client";

import { useMemo } from "react";
import type { AiCapabilityCard } from "@/data/ai-capability-cards";
import type { ArtifactTypeId } from "@/lib/journey/character-options";
import {
  AI_CAPABILITY_POWERS,
  cardsForPower,
  formatPersonaValuesList,
  type AiCapabilityPowerId,
} from "@/lib/journey/ai-capability-clusters";
import { PowerGlyph } from "@/components/create/design/PowerGlyph";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardDivider,
  ffieCardSectionLabel,
  ffieCardTitle,
} from "@/lib/card-layout";

const DAY_TO_DAY_FIELD =
  "mt-3 w-full resize-y rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm outline-none focus:border-ffie-accent/40";

type AiPowerSelectorProps = {
  values: string[];
  artifactType: ArtifactTypeId | "";
  selectedPower: AiCapabilityPowerId | "";
  selectedCapabilityId: string;
  dayToDayDescription: string;
  onSelectPower: (powerId: AiCapabilityPowerId) => void;
  onSelectCapability: (capabilityId: string) => void;
  onDayToDayChange: (value: string) => void;
};

export function AiPowerSelector({
  values,
  artifactType,
  selectedPower,
  selectedCapabilityId,
  dayToDayDescription,
  onSelectPower,
  onSelectCapability,
  onDayToDayChange,
}: AiPowerSelectorProps) {
  const valuesPhrase = formatPersonaValuesList(values);

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
        does the AI bring to this artifact?
      </p>

      <div className="flex flex-wrap gap-2">
        {AI_CAPABILITY_POWERS.map((power) => {
          const selected = selectedPower === power.id;
          return (
            <button
              key={power.id}
              type="button"
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
            </button>
          );
        })}
      </div>

      {selectedPower && powerCards.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {powerCards.map((card) => (
            <SelectableCapabilityCard
              key={card.id}
              card={card}
              selected={selectedCapabilityId === card.id}
              dayToDayDescription={
                selectedCapabilityId === card.id ? dayToDayDescription : ""
              }
              onSelect={() => onSelectCapability(card.id)}
              onDayToDayChange={onDayToDayChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function SelectableCapabilityCard({
  card,
  selected,
  dayToDayDescription,
  onSelect,
  onDayToDayChange,
}: {
  card: AiCapabilityCard;
  selected: boolean;
  dayToDayDescription: string;
  onSelect: () => void;
  onDayToDayChange: (value: string) => void;
}) {
  return (
    <div
      className={`rounded-xl border bg-ffie-bg/40 transition ${
        selected
          ? "border-ffie-ink bg-ffie-surface shadow-[0_0_0_1px_rgba(35,19,82,0.08)]"
          : "border-ffie-line/80 hover:border-ffie-accent/40"
      }`}
      style={{ borderTopWidth: 3, borderTopColor: card.color }}
    >
      <button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        className="w-full px-4 py-3 text-left"
      >
        <p className={`${ffieCardCategory} text-ffie-muted`}>Capability</p>
        <h4 className={`mt-1 ${ffieCardTitle} text-sm ${FFIE_CARD_TEXT}`}>
          {card.name}
        </h4>

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

        <div className={`my-3 ${ffieCardDivider}`} />

        <p className={ffieCardSectionLabel}>Example</p>
        <p
          className={`mt-2 text-sm italic leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}
        >
          {card.examples[0]}
        </p>

        <div className="mt-3">
          <p className={`${ffieCardCategory} text-ffie-muted`}>
            Guiding questions
          </p>
          <ul className="mt-2 space-y-1.5">
            {card.artifactGuidingQuestions.map((question) => (
              <li
                key={question}
                className={`text-xs leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}
              >
                · {question}
              </li>
            ))}
          </ul>
        </div>
      </button>

      {selected && (
        <div className="border-t border-ffie-line/60 px-4 pb-4 pt-3">
          <label className="block space-y-2">
            <span className="text-sm leading-relaxed text-ffie-ink">
              Describe what it does, day to day, now that you&apos;ve chosen its
              power.
            </span>
            <textarea
              value={dayToDayDescription}
              onChange={(event) => onDayToDayChange(event.target.value)}
              rows={4}
              className={DAY_TO_DAY_FIELD}
            />
          </label>
        </div>
      )}
    </div>
  );
}
