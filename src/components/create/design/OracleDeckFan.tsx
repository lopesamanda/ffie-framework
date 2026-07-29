"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EnvironmentalImpactCard } from "@/components/create/design/EnvironmentalImpactBadge";
import { TransversalBadge } from "@/components/create/design/TransversalBadge";
import type { CardHand } from "@/lib/journey/types";
import type { CardCategory, NarrativeCard } from "@/data/narrative-cards";
import {
  CATEGORY_STYLES,
  ORACLE_CATEGORY_ICONS,
  ORACLE_CATEGORY_LABELS,
} from "@/lib/category-styles";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardDivider,
  ffieCardSectionLabel,
  ffieCardTitle,
} from "@/lib/card-layout";

const DRAW_ORDER = ["risk", "benefit", "trust", "barrier"] as const;
type DrawKey = (typeof DRAW_ORDER)[number];

const FAN_ROTATIONS = [0, 5, 10, 15] as const;

function SyncIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M21 16v5h-5" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DrawnChip({ card }: { card: NarrativeCard }) {
  const style = CATEGORY_STYLES[card.category];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-[0.03em]"
      style={{
        backgroundColor: style.bg,
        borderColor: `${style.text}29`,
        color: style.text,
      }}
    >
      <span aria-hidden>{ORACLE_CATEGORY_ICONS[card.category]}</span>
      {card.name}
      <span className="opacity-60" aria-hidden>
        ✓
      </span>
    </span>
  );
}

function CoverCardFace({
  category,
  rotation,
  zIndex,
  interactive,
  onDraw,
}: {
  category: CardCategory;
  rotation: number;
  zIndex: number;
  interactive?: boolean;
  onDraw?: () => void;
}) {
  const style = CATEGORY_STYLES[category];
  const label = ORACLE_CATEGORY_LABELS[category].toUpperCase();

  return (
    <div
      className="absolute left-0 top-0 origin-bottom-left"
      style={{
        transform: `rotate(${rotation}deg)`,
        zIndex,
      }}
    >
      <button
        type="button"
        disabled={!interactive}
        onClick={onDraw}
        className="flex h-[264px] w-[180px] flex-col items-center justify-between rounded-[12px] px-5 py-6 shadow-[0_3px_5px_rgba(35,19,82,0.12)] transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_8px_16px_rgba(35,19,82,0.16)] disabled:cursor-default"
        style={{ backgroundColor: style.coverFill }}
      >
        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/45">
          {label}
        </span>
        <span
          className="text-[56px] leading-none opacity-55"
          style={{ color: style.coverText }}
          aria-hidden
        >
          {ORACLE_CATEGORY_ICONS[category]}
        </span>
        <span className="h-6" />
      </button>
    </div>
  );
}

export function OracleFanRevealedCard({
  card,
  includeReflection = false,
}: {
  card: NarrativeCard;
  /** Show reflection prompt on the card face (Oracle Draw uses a side panel instead). */
  includeReflection?: boolean;
}) {
  const style = CATEGORY_STYLES[card.category];
  const label = ORACLE_CATEGORY_LABELS[card.category].toUpperCase();

  return (
    <div
      className="w-[180px] shrink-0 rounded-[12px] border border-[rgba(35,19,82,0.07)] border-t-4 bg-white shadow-[0_3px_5px_rgba(35,19,82,0.12)]"
      style={{ borderTopColor: style.text }}
    >
      <div className="flex flex-col px-4 pb-3.5 pt-3.5">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px]" style={{ color: style.text }} aria-hidden>
            {ORACLE_CATEGORY_ICONS[card.category]}
          </span>
          <span className={ffieCardCategory} style={{ color: style.text }}>
            {label}
          </span>
        </div>
        <h4 className={`mt-2.5 ${ffieCardTitle} text-[13px] ${FFIE_CARD_TEXT}`}>
          {card.name}
        </h4>
        <div className={`my-2.5 ${ffieCardDivider}`} />
        <p className={`text-[11px] italic leading-[1.6] text-ffie-muted ${FFIE_CARD_TEXT}`}>
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
        {includeReflection && card.reflectionQuestion && (
          <>
            <div className={`my-2.5 ${ffieCardDivider}`} />
            <p className={ffieCardSectionLabel}>Reflection</p>
            <p
              className={`mt-1 text-[10px] italic leading-[1.55] text-ffie-ink/70 ${FFIE_CARD_TEXT}`}
            >
              {card.reflectionQuestion}
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/** Environmental Impact reference card — description + transversal badge, no tension. */
export function OracleFanTransversalCard({ card }: { card: NarrativeCard }) {
  return <EnvironmentalImpactCard card={card} />;
}

/** Collapsed-by-default reference card for Hidden Function and similar recap rows. */
export function CollapsibleOracleReferenceCard({
  card,
}: {
  card: NarrativeCard;
}) {
  const [expanded, setExpanded] = useState(false);
  const style = CATEGORY_STYLES[card.category];
  const label = ORACLE_CATEGORY_LABELS[card.category].toUpperCase();
  const isTransversal = card.category === "transversal";

  return (
    <div
      className="w-[180px] shrink-0 rounded-[12px] border border-[rgba(35,19,82,0.07)] border-t-4 bg-white shadow-[0_3px_5px_rgba(35,19,82,0.12)]"
      style={{ borderTopColor: style.text }}
    >
      <button
        type="button"
        onClick={() => setExpanded((open) => !open)}
        aria-expanded={expanded}
        className="flex w-full items-start justify-between gap-2 px-4 py-3 text-left"
      >
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
            <span className={ffieCardCategory} style={{ color: style.text }}>
              {label}
            </span>
            {isTransversal && <TransversalBadge />}
          </div>
          <h4 className={`mt-2 ${ffieCardTitle} text-[13px] ${FFIE_CARD_TEXT}`}>
            {card.name}
          </h4>
        </div>
        <span className="shrink-0 text-xs text-ffie-accent">
          {expanded ? "Hide" : "Show"}
        </span>
      </button>

      {expanded && (
        <div className="border-t border-ffie-line/60 px-4 pb-3.5 pt-3">
          {isTransversal ? (
            <p
              className={`text-[11px] italic leading-[1.6] text-ffie-muted ${FFIE_CARD_TEXT}`}
            >
              &ldquo;{card.description}&rdquo;
            </p>
          ) : (
            <>
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ReflectionPanel({
  card,
  isLast,
  onAdvance,
}: {
  card: NarrativeCard;
  isLast: boolean;
  onAdvance: () => void;
}) {
  const style = CATEGORY_STYLES[card.category];
  const label = ORACLE_CATEGORY_LABELS[card.category].toUpperCase();

  return (
    <div className="w-full max-w-[300px] rounded-[14px] border border-[rgba(35,19,82,0.07)] bg-white p-6 shadow-[0_8px_14px_rgba(35,19,82,0.1)]">
      <div className="flex items-center gap-2">
        <span
          className="flex size-7 items-center justify-center rounded-md text-[13px]"
          style={{ backgroundColor: style.bg, color: style.text }}
          aria-hidden
        >
          {ORACLE_CATEGORY_ICONS[card.category]}
        </span>
        <span className={ffieCardCategory} style={{ color: style.text }}>
          {label}
        </span>
      </div>
      <h3 className={`mt-3 font-display text-sm font-bold text-ffie-ink ${FFIE_CARD_TEXT}`}>
        {card.name}
      </h3>
      <p
        className={`mt-1 text-[11px] italic ${FFIE_CARD_TEXT}`}
        style={{ color: style.text }}
      >
        {card.tension}
      </p>
      <div className={`my-4 ${ffieCardDivider}`} />
      <p className={`${ffieCardCategory} text-ffie-muted`}>Reflection</p>
      <p className={`mt-2 text-[13px] italic leading-relaxed text-ffie-ink/70 ${FFIE_CARD_TEXT}`}>
        {card.reflectionQuestion}
      </p>
      <button
        type="button"
        onClick={onAdvance}
        className="mt-6 inline-flex items-center gap-2 rounded-full px-[18px] py-2.5 text-xs font-semibold tracking-[0.04em] text-white transition hover:opacity-90"
        style={{ backgroundColor: style.text }}
      >
        {isLast ? "Complete draw" : "Next card"}
        <ArrowIcon />
      </button>
    </div>
  );
}

export type OracleDeckFanProps = {
  hand: CardHand;
  drawIndex: number;
  phase: "fan" | "reflection";
  shuffling?: boolean;
  onDraw: () => void;
  onAdvance: () => void;
  onShuffle: () => void;
};

export function OracleDeckFan({
  hand,
  drawIndex,
  phase,
  shuffling = false,
  onDraw,
  onAdvance,
  onShuffle,
}: OracleDeckFanProps) {
  const reduceMotion = useReducedMotion();
  const remaining = DRAW_ORDER.slice(drawIndex);
  const drawn = DRAW_ORDER.slice(0, drawIndex);
  const currentKey = remaining[0] as DrawKey | undefined;
  const currentCard = currentKey ? hand[currentKey] : null;
  const allComplete = drawIndex >= DRAW_ORDER.length;

  return (
    <div className="space-y-6">
      <p className="max-w-xl text-[13px] leading-relaxed text-ffie-muted">
        Tap the front card to draw it. Your reflection question appears once the
        card is revealed. After reading, advance to the next card in the stack.
      </p>

      <button
        type="button"
        disabled={shuffling || allComplete}
        onClick={onShuffle}
        className="inline-flex items-center gap-1.5 rounded-lg border border-ffie-line px-4 py-2 text-xs font-medium text-ffie-muted transition hover:border-ffie-ink/20 disabled:opacity-50"
      >
        <SyncIcon />
        {shuffling ? "Shuffling…" : "Shuffle & reset"}
      </button>

      {drawn.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-ink/25">
            Drawn
          </span>
          {drawn.map((key) => (
            <DrawnChip key={key} card={hand[key]} />
          ))}
        </div>
      )}

      {!allComplete && (
        <div className="flex flex-col gap-8 pt-2 lg:flex-row lg:items-start lg:gap-9">
          <div className="relative min-h-[290px] w-full max-w-[260px] shrink-0 self-start">
            {remaining.map((key, index) => {
              const rotation = FAN_ROTATIONS[index] ?? 0;
              const isFront = index === 0;
              const zIndex = remaining.length - index;

              if (isFront && phase === "reflection" && currentCard) {
                return (
                  <motion.div
                    key={key}
                    className="absolute left-0 top-0"
                    initial={reduceMotion ? false : { opacity: 0.8, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    style={{ zIndex }}
                  >
                    <OracleFanRevealedCard card={currentCard} />
                  </motion.div>
                );
              }

              return (
                <CoverCardFace
                  key={key}
                  category={hand[key].category}
                  rotation={rotation}
                  zIndex={zIndex}
                  interactive={isFront && phase === "fan"}
                  onDraw={isFront ? onDraw : undefined}
                />
              );
            })}
          </div>

          {phase === "reflection" && currentCard && (
            <motion.div
              key={currentKey}
              initial={reduceMotion ? false : { opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="min-w-0 flex-1"
            >
              <ReflectionPanel
                card={currentCard}
                isLast={drawIndex === DRAW_ORDER.length - 1}
                onAdvance={onAdvance}
              />
            </motion.div>
          )}
        </div>
      )}

      <EnvironmentalImpactCard card={hand.transversal} />
    </div>
  );
}

export { DRAW_ORDER as ORACLE_DRAW_ORDER };
