"use client";

import { useState } from "react";
import { OracleFanRevealedCard } from "@/components/create/design/OracleDeckFan";
import type { CardHand } from "@/lib/journey/types";

export function DrawnCardsCompactReference({
  cardHand,
}: {
  cardHand: CardHand;
}) {
  const [expanded, setExpanded] = useState(false);
  const benefitName = cardHand.benefit.name;
  const trustName = cardHand.trust.name;

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        className="inline-flex items-center gap-2 rounded-full border border-ffie-line bg-ffie-surface px-3 py-1.5 text-left text-xs text-ffie-muted transition hover:border-ffie-accent/30 hover:text-ffie-ink"
      >
        <span>
          You drew{" "}
          <strong className="font-semibold text-ffie-ink">{benefitName}</strong>{" "}
          and{" "}
          <strong className="font-semibold text-ffie-ink">{trustName}</strong>
        </span>
        <span className="shrink-0 text-[10px] font-medium uppercase tracking-wide text-ffie-accent">
          {expanded ? "Hide" : "Show cards"}
        </span>
      </button>

      {expanded && (
        <div className="flex flex-wrap gap-3">
          <OracleFanRevealedCard card={cardHand.benefit} />
          <OracleFanRevealedCard card={cardHand.trust} />
        </div>
      )}
    </div>
  );
}
