"use client";

import {
  AI_CAPABILITY_CARDS,
  type AiCapabilityCard,
} from "@/data/ai-capability-cards";

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
      className="rounded-xl border border-ffie-line bg-ffie-bg/40 p-4 text-left transition hover:border-slate-400/50 hover:bg-ffie-surface"
      style={{ borderTopWidth: 3, borderTopColor: card.color }}
    >
      <p className="text-[10px] font-medium uppercase tracking-wide text-slate-500">
        Capacidade de IA
      </p>
      <h4 className="mt-1 text-sm font-semibold text-ffie-ink">{card.name}</h4>
      <p className="mt-1.5 text-xs leading-relaxed text-ffie-muted">
        {card.description}
      </p>
      <div className="mt-2 flex flex-wrap gap-1">
        {card.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </button>
  );
}
