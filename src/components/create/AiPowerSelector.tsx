"use client";

import { useMemo, useState } from "react";
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
  const [showInspiration, setShowInspiration] = useState(false);
  const valuesPhrase = formatPersonaValuesList(values);

  const inspirationCards = useMemo(() => {
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
              onClick={() => {
                onSelectPower(power.id);
                setShowInspiration(false);
              }}
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

      {selectedPower && (
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => setShowInspiration((open) => !open)}
            className="text-xs font-medium text-ffie-accent transition hover:underline"
          >
            {showInspiration
              ? "Hide capability examples ↑"
              : "Need inspiration? See underlying capabilities ↓"}
          </button>

          {showInspiration && (
            <div className="grid gap-3 sm:grid-cols-2">
              {inspirationCards.map((card) => (
                <InspirationCapabilityCard key={card.id} card={card} />
              ))}
            </div>
          )}
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
      <div className={ffieCardDivider + " my-2"} />
      <p className={`${ffieCardDescription} text-xs not-italic ${FFIE_CARD_TEXT}`}>
        {card.examples[0]}
      </p>
      <ul className="mt-2 space-y-1">
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
  );
}
