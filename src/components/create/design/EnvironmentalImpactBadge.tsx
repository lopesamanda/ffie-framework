"use client";

import type { NarrativeCard } from "@/data/narrative-cards";
import { CATEGORY_STYLES, ORACLE_CATEGORY_ICONS } from "@/lib/category-styles";
import { FFIE_CARD_TEXT } from "@/lib/card-layout";

/** Compact transversal badge — always applied, not drawn from the deck. */
export function EnvironmentalImpactBadge({
  card,
  className = "",
}: {
  card: NarrativeCard;
  className?: string;
}) {
  const style = CATEGORY_STYLES.transversal;

  return (
    <div className={`inline-flex max-w-full flex-col gap-2 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        <span
          className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-[0.03em]"
          style={{
            backgroundColor: style.bg,
            borderColor: `${style.text}40`,
            color: style.text,
          }}
        >
          <span aria-hidden>{ORACLE_CATEGORY_ICONS.transversal}</span>
          Environmental Impact
        </span>
        <span
          className="rounded-[3px] border px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em]"
          style={{ borderColor: style.text, color: style.text }}
        >
          Always applied
        </span>
      </div>
      <p
        className={`max-w-prose text-[11px] leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}
      >
        {card.tension}
      </p>
    </div>
  );
}
