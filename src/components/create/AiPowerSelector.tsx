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

type AiPowerSelectorProps = {
  values: string[];
  artifactType: ArtifactTypeId | "";
  selectedPower: AiCapabilityPowerId | "";
  onSelectPower: (powerId: AiCapabilityPowerId) => void;
};

export function AiPowerSelector({
  values,
  artifactType,
  selectedPower,
  onSelectPower,
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
            <InspirationCapabilityCard key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}

function InspirationCapabilityCard({ card }: { card: AiCapabilityCard }) {
  return (
    <div
      className="rounded-xl border border-ffie-line/80 bg-ffie-bg/40 px-4 py-3"
      style={{ borderTopWidth: 3, borderTopColor: card.color }}
    >
      <p className={`${ffieCardCategory} text-ffie-muted`}>Capability</p>
      <h4 className={`mt-1 ${ffieCardTitle} text-sm ${FFIE_CARD_TEXT}`}>
        {card.name}
      </h4>

      <p className={`mt-2 ${ffieCardDescription} not-italic ${FFIE_CARD_TEXT}`}>
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
        <p className={`${ffieCardCategory} text-ffie-muted`}>Guiding questions</p>
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
    </div>
  );
}
