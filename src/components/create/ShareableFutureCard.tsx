import {
  QUADRANT_COLORS,
  QUADRANT_LABELS,
  QUADRANT_TEXT_COLORS,
  type FutureQuadrant,
} from "@/types/future";
import type { CardHand } from "@/lib/journey/types";
import { quadrantFromPosition } from "@/lib/journey/types";

type ShareableFutureCardProps = {
  title: string;
  characterName: string;
  artifactName: string;
  position: { x: number; y: number };
  cardHand: CardHand | null;
  id?: string;
};

const CARD_W = 1080;
const CARD_H = 1080;

export function ShareableFutureCard({
  title,
  characterName,
  artifactName,
  position,
  cardHand,
  id = "shareable-future-card",
}: ShareableFutureCardProps) {
  const quadrant: FutureQuadrant = quadrantFromPosition(
    position.x,
    position.y,
  );
  const quadrantBg = QUADRANT_COLORS[quadrant];
  const quadrantText = QUADRANT_TEXT_COLORS[quadrant];

  const drawnCards = cardHand
    ? [
        cardHand.risk,
        cardHand.benefit,
        cardHand.trust,
        cardHand.barrier,
        cardHand.transversal,
      ]
    : [];

  return (
    <div
      id={id}
      className="relative overflow-hidden bg-ffie-bg"
      style={{ width: CARD_W, height: CARD_H }}
    >
      <div className="flex h-full flex-col p-16">
        <div className="flex items-start justify-between gap-8">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-ffie-accent">
              FFIE · Future Commons
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-tight tracking-tight text-ffie-ink">
              {title}
            </h1>
          </div>
          <span
            className="shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold uppercase tracking-wide"
            style={{ backgroundColor: quadrantBg, color: quadrantText }}
          >
            {QUADRANT_LABELS[quadrant]}
          </span>
        </div>

        <div className="mt-12 grid flex-1 grid-cols-2 gap-10">
          <div className="rounded-2xl border border-ffie-line bg-ffie-surface p-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-ffie-muted">
              Character
            </p>
            <p className="mt-3 text-3xl font-semibold text-ffie-ink">
              {characterName || "—"}
            </p>
          </div>
          <div className="rounded-2xl border border-ffie-line bg-ffie-surface p-8">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-ffie-muted">
              Artifact
            </p>
            <p className="mt-3 text-3xl font-semibold text-ffie-ink">
              {artifactName || "—"}
            </p>
          </div>
        </div>

        {drawnCards.length > 0 && (
          <div className="mt-10">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-ffie-muted">
              Oracle Draw cards
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {drawnCards.map((card) => (
                <span
                  key={card.id}
                  className="rounded-full px-4 py-2 text-sm font-medium text-white"
                  style={{ backgroundColor: card.color }}
                >
                  {card.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <p className="mt-auto pt-10 text-right text-sm text-ffie-muted">
          Feminist Foresight in Innovation Ecosystems · ffie
        </p>
      </div>
    </div>
  );
}

export const SHAREABLE_CARD_WIDTH = CARD_W;
export const SHAREABLE_CARD_HEIGHT = CARD_H;
