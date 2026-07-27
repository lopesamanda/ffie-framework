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
  /** Show all four category cards face-up (open hand layout). */
  allRevealed?: boolean;
  /** Current index in ORACLE_REVEAL_SEQUENCE (0–4). Used when allRevealed is false. */
  sequenceIndex?: number;
  /** Whether the active card in the sequence has been flipped. */
  cardFlipped?: boolean;
  onDraw?: () => void;
};

export function OracleDrawRow({
  hand,
  allRevealed = false,
  sequenceIndex = 0,
  cardFlipped = false,
  onDraw = () => undefined,
}: OracleDrawRowProps) {
  const allDrawn = allRevealed || sequenceIndex >= DRAW_ORDER.length;

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
          const revealed = allRevealed || isPast || (isCurrent && cardFlipped);

          return (
            <OracleCard
              key={key}
              card={card}
              revealed={revealed}
              showRevealedLabel={revealed}
              interactive={!allRevealed && isCurrent && !cardFlipped}
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
