"use client";

import { NarrativeCardFace } from "@/components/create/NarrativeCardFace";
import type { NarrativeCard } from "@/data/narrative-cards";

/** Full Environmental Impact narrative card — same layout as other tension cards, green transversal styling. */
export function EnvironmentalImpactCard({
  card,
  className = "",
}: {
  card: NarrativeCard;
  className?: string;
}) {
  return (
    <div className={className}>
      <NarrativeCardFace card={card} />
    </div>
  );
}

/** @deprecated Use EnvironmentalImpactCard */
export const EnvironmentalImpactBadge = EnvironmentalImpactCard;
