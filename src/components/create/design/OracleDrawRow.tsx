"use client";

import type { CardHand } from "@/lib/journey/types";
import type { NarrativeCard } from "@/data/narrative-cards";
import { ORACLE_CARD } from "@/lib/category-styles";
import {
  OracleCard,
  OracleRevealedContent,
} from "@/components/create/design/OracleCard";

const DRAW_ORDER = ["risk", "benefit", "trust", "barrier"] as const;

type OracleDrawRowProps = {
  hand: CardHand;
  /** Current index in ORACLE_REVEAL_SEQUENCE (0–4). */
  sequenceIndex: number;
  /** Whether the active card in the sequence has been flipped. */
  cardFlipped: boolean;
  onDraw: () => void;
};

export function OracleDrawRow({
  hand,
  sequenceIndex,
  cardFlipped,
  onDraw,
}: OracleDrawRowProps) {
  const allDrawn = sequenceIndex >= DRAW_ORDER.length;

  return (
    <div className="overflow-x-auto pb-1">
      <div
        className="grid min-w-[720px] grid-cols-4 items-start"
        style={{ gap: ORACLE_CARD.gap }}
        role="list"
        aria-label="Oracle Draw hand"
      >
      {DRAW_ORDER.map((key, stepIndex) => {
        const card = hand[key] as NarrativeCard;
        const isPast = allDrawn || sequenceIndex > stepIndex;
        const isCurrent = !allDrawn && sequenceIndex === stepIndex;
        const revealed = isPast || (isCurrent && cardFlipped);

        return (
          <OracleCard
            key={key}
            card={card}
            revealed={revealed}
            showRevealedLabel={revealed}
            interactive={isCurrent && !cardFlipped}
            onDraw={onDraw}
          >
            <OracleRevealedContent card={card} />
          </OracleCard>
        );
      })}
      </div>
    </div>
  );
}
