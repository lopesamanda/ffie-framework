"use client";

import type { NarrativeCard } from "@/data/narrative-cards";
import { TransversalBadge } from "@/components/create/design/TransversalBadge";
import { CATEGORY_STYLES, ORACLE_CATEGORY_LABELS } from "@/lib/category-styles";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardDivider,
  ffieCardSectionLabel,
  ffieCardTitle,
} from "@/lib/card-layout";

/** Compact Environmental Impact reference — title, description, transversal badge only. */
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
      className={`w-[180px] shrink-0 rounded-[12px] border border-[rgba(35,19,82,0.07)] border-t-4 bg-white shadow-[0_3px_5px_rgba(35,19,82,0.12)] ${className}`}
      style={{ borderTopColor: style.text }}
    >
      <div className="flex flex-col px-4 pb-3.5 pt-3.5">
        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
          <span className={ffieCardCategory} style={{ color: style.text }}>
            {label}
          </span>
          <TransversalBadge />
        </div>
        <h4 className={`mt-2.5 ${ffieCardTitle} text-[13px] ${FFIE_CARD_TEXT}`}>
          {card.name}
        </h4>
        <div className={`my-2.5 ${ffieCardDivider}`} />
        <p
          className={`text-[11px] italic leading-[1.6] text-ffie-muted ${FFIE_CARD_TEXT}`}
        >
          &ldquo;{card.description}&rdquo;
        </p>
      </div>
    </div>
  );
}

/** @deprecated Use EnvironmentalImpactCard */
export const EnvironmentalImpactBadge = EnvironmentalImpactCard;
