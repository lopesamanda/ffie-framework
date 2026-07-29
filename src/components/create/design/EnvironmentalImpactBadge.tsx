"use client";

import type { NarrativeCard } from "@/data/narrative-cards";
import { CATEGORY_STYLES, ORACLE_CATEGORY_LABELS } from "@/lib/category-styles";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardDivider,
  ffieCardSectionLabel,
  ffieCardTitle,
} from "@/lib/card-layout";

/** Environmental Impact reference — same tension treatment as other drawn cards. */
export function EnvironmentalImpactCard({
  card,
  className = "",
}: {
  card: NarrativeCard;
  className?: string;
}) {
  const style = CATEGORY_STYLES.transversal;
  const label = ORACLE_CATEGORY_LABELS.transversal.toUpperCase();

  return (
    <div
      className={`w-[180px] shrink-0 rounded-[12px] border border-[rgba(35,19,82,0.07)] border-t-4 bg-white shadow-[0_3px_5px_rgba(35,19,82,0.07)] ${className}`}
      style={{ borderTopColor: style.text }}
    >
      <div className="flex flex-col px-4 pb-3.5 pt-3.5">
        <span className={ffieCardCategory} style={{ color: style.text }}>
          {label}
        </span>
        <h4 className={`mt-2.5 ${ffieCardTitle} text-[13px] ${FFIE_CARD_TEXT}`}>
          {card.name}
        </h4>
        <div className={`my-2.5 ${ffieCardDivider}`} />
        <p
          className={`text-[11px] italic leading-[1.6] text-ffie-muted ${FFIE_CARD_TEXT}`}
        >
          &ldquo;{card.description}&rdquo;
        </p>
        <div className={`my-2.5 ${ffieCardDivider}`} />
        <p className={ffieCardSectionLabel}>Tension</p>
        <p
          className={`mt-0.5 text-[10px] font-medium leading-snug ${FFIE_CARD_TEXT}`}
          style={{ color: style.text }}
        >
          {card.tension}
        </p>
      </div>
    </div>
  );
}

/** @deprecated Use EnvironmentalImpactCard */
export const EnvironmentalImpactBadge = EnvironmentalImpactCard;
