"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { NarrativeCard } from "@/data/narrative-cards";
import {
  CATEGORY_STYLES,
  ORACLE_CARD,
  ORACLE_CATEGORY_ICONS,
  ORACLE_CATEGORY_LABELS,
} from "@/lib/category-styles";

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
  /** Allow card to grow beyond the fixed Oracle row height (e.g. Environmental Impact). */
  autoHeight?: boolean;
};

export function OracleCard({
  card,
  revealed,
  showRevealedLabel = false,
  interactive = false,
  onDraw,
  className = "",
  children,
  autoHeight = false,
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
            className="text-center text-[11px] font-bold uppercase leading-snug tracking-[0.15em]"
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
        className="flex w-full flex-col overflow-hidden rounded-[12px] border-2 border-[rgba(35,19,82,0.07)] bg-white shadow-[0_2px_8px_rgba(35,19,82,0.06)]"
        style={
          autoHeight
            ? { minHeight: ORACLE_CARD.height }
            : { height: ORACLE_CARD.height }
        }
      >
        <div
          className="shrink-0"
          style={{
            height: ORACLE_CARD.accentBar,
            backgroundColor: style.text,
          }}
        />
        <div className="flex min-h-0 flex-1 flex-col px-[18px] pb-[16px] pt-[12px]">
          {children}
        </div>
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
        <span
          className="text-[10px] font-medium uppercase tracking-[0.15em]"
          style={{ color: style.text }}
        >
          {label}
        </span>
      </div>

      <h3 className="mt-2 font-display text-[15px] font-bold leading-[1.25] text-[#231352]">
        {card.name}
      </h3>

      <div className="my-3 h-px w-full bg-[rgba(35,19,82,0.08)]" />

      <p className="text-[12px] italic leading-[19.2px] text-[rgba(35,19,82,0.55)]">
        &ldquo;{card.description}&rdquo;
      </p>

      <div className="min-h-[24px] flex-1" aria-hidden />

      <div className="h-px w-full bg-[rgba(35,19,82,0.08)]" />

      <p className="mt-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[#231352]">
        Tension
      </p>
      <p
        className="mt-1 text-[11px] font-bold leading-snug"
        style={{ color: style.text }}
      >
        {card.tension}
      </p>
    </>
  );
}
