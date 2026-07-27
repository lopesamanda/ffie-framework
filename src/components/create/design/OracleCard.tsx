"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { NarrativeCard } from "@/data/narrative-cards";
import {
  CATEGORY_STYLES,
  ORACLE_CARD,
  ORACLE_CATEGORY_ICONS,
  ORACLE_CATEGORY_LABELS,
} from "@/lib/category-styles";
import {
  FFIE_CARD,
  FFIE_CARD_TEXT,
  ffieCardBody,
  ffieCardCategory,
  ffieCardDescription,
  ffieCardDivider,
  ffieCardSectionLabel,
  ffieCardShell,
  ffieCardTension,
  ffieCardTitle,
} from "@/lib/card-layout";

type OracleCardProps = {
  card: NarrativeCard;
  /** Face-up content (NarrativeCardFace oracle variant). */
  revealed: boolean;
  /** Show REVEALED label below the card boundary. */
  showRevealedLabel?: boolean;
  /** Face-down cover is clickable. */
  interactive?: boolean;
  onDraw?: () => void;
  className?: string;
  children?: React.ReactNode;
};

export function OracleCard({
  card,
  revealed,
  showRevealedLabel = false,
  interactive = false,
  onDraw,
  className = "",
  children,
}: OracleCardProps) {
  const style = CATEGORY_STYLES[card.category];
  const reduceMotion = useReducedMotion();
  const label = ORACLE_CATEGORY_LABELS[card.category].toUpperCase();

  if (!revealed) {
    return (
      <div className={`flex min-w-0 flex-1 flex-col ${className}`}>
        <button
          type="button"
          disabled={!interactive}
          onClick={onDraw}
          className="flex w-full flex-col items-center justify-between rounded-[12px] px-4 py-8 text-left transition enabled:hover:-translate-y-0.5 enabled:hover:shadow-[0_8px_24px_rgba(35,19,82,0.18)] disabled:cursor-default"
          style={{
            height: ORACLE_CARD.height,
            backgroundColor: style.coverFill,
          }}
        >
          <span
            className={`text-center text-[11px] font-bold uppercase leading-snug tracking-[0.15em] ${FFIE_CARD_TEXT}`}
            style={{ color: style.coverText }}
          >
            {label}
          </span>
          <span className="rounded-full border border-white/75 px-6 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
            Draw
          </span>
        </button>
        <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-[0.15em] text-[rgba(35,19,82,0.4)]">
          Tap to draw
        </p>
      </div>
    );
  }

  return (
    <div className={`flex min-w-0 flex-1 flex-col ${className}`}>
      <motion.div
        initial={reduceMotion ? false : { rotateY: -88, opacity: 0.6 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 0.42, ease: "easeOut" }}
        className={`flex w-full flex-col ${ffieCardShell}`}
        style={{ minHeight: FFIE_CARD.minHeight }}
      >
        <div
          className="shrink-0"
          style={{
            height: FFIE_CARD.accentBar,
            backgroundColor: style.text,
          }}
        />
        <div className={`flex flex-col ${ffieCardBody}`}>{children}</div>
      </motion.div>
      {showRevealedLabel && (
        <p
          className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{ color: style.text }}
        >
          Revealed
        </p>
      )}
    </div>
  );
}

export function OracleRevealedContent({ card }: { card: NarrativeCard }) {
  const style = CATEGORY_STYLES[card.category];
  const label = ORACLE_CATEGORY_LABELS[card.category].toUpperCase();
  const icon = ORACLE_CATEGORY_ICONS[card.category];

  return (
    <>
      <div className="flex items-center gap-1.5">
        <span
          className="text-[11px] leading-none"
          style={{ color: style.text }}
          aria-hidden
        >
          {icon}
        </span>
        <span className={ffieCardCategory} style={{ color: style.text }}>
          {label}
        </span>
      </div>

      <h3 className={`mt-2 ${ffieCardTitle} ${FFIE_CARD_TEXT}`}>{card.name}</h3>

      <div className={`my-3 ${ffieCardDivider}`} />

      <p className={`${ffieCardDescription} ${FFIE_CARD_TEXT}`}>
        &ldquo;{card.description}&rdquo;
      </p>

      <div className={`my-3 ${ffieCardDivider}`} />

      <p className={ffieCardSectionLabel}>Tension</p>
      <p
        className={`mt-1 ${ffieCardTension} ${FFIE_CARD_TEXT}`}
        style={{ color: style.text }}
      >
        {card.tension}
      </p>
    </>
  );
}
