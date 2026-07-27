"use client";

import {
  AI_CAPABILITY_CARDS,
  type AiCapabilityCard,
} from "@/data/ai-capability-cards";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardShell,
  ffieCardTitle,
} from "@/lib/card-layout";

export function AiCapabilityCardPicker({
  value,
  onSelect,
}: {
  value: string;
  onSelect: (text: string) => void;
}) {
  return (
    <div className="space-y-3">
      <p className="text-xs text-ffie-muted">
        Need inspiration? Pick an AI capability — an example fills the field
        above as an editable starting point.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        {AI_CAPABILITY_CARDS.map((card) => (
          <CapabilityCard
            key={card.id}
            card={card}
            onSelect={() => onSelect(card.examples[0])}
          />
        ))}
      </div>
    </div>
  );
}

function CapabilityCard({
  card,
  onSelect,
}: {
  card: AiCapabilityCard;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`px-[18px] py-4 text-left transition hover:border-ffie-accent/40 hover:bg-ffie-surface ${ffieCardShell} border-t-[3px] bg-ffie-bg/40`}
      style={{ borderTopColor: card.color }}
    >
      <p className={`${ffieCardCategory} text-ffie-muted`}>AI capability</p>
      <h4 className={`mt-2 ${ffieCardTitle} ${FFIE_CARD_TEXT}`}>{card.name}</h4>
      <p className={`mt-2 ${ffieCardDescription} not-italic ${FFIE_CARD_TEXT}`}>
        {card.description}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-ffie-bg px-2 py-0.5 text-[10px] text-ffie-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
