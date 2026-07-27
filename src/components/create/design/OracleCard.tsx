"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CardCategory } from "@/data/narrative-cards";
import { CATEGORY_STYLES } from "@/lib/category-styles";

type OracleCardProps = {
  category: CardCategory;
  revealed: boolean;
  onReveal?: () => void;
  children?: React.ReactNode;
  /** Cover label (category name on face-down card). */
  coverLabel?: string;
  className?: string;
};

function CoverMark({ category }: { category: CardCategory }) {
  const style = CATEGORY_STYLES[category];
  return (
    <div
      className="flex size-12 items-center justify-center rounded-lg"
      style={{ backgroundColor: style.iconBg }}
      aria-hidden
    >
      <div
        className="size-6 rotate-45 rounded-sm border-2"
        style={{ borderColor: style.text }}
      />
    </div>
  );
}

export function OracleCard({
  category,
  revealed,
  onReveal,
  children,
  coverLabel,
  className = "",
}: OracleCardProps) {
  const style = CATEGORY_STYLES[category];
  const reduceMotion = useReducedMotion();

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={onReveal}
        className={`group relative flex aspect-[3/4] w-full max-w-[220px] flex-col items-center justify-between rounded-xl border-2 p-5 text-left shadow-[0_4px_16px_rgba(35,19,82,0.1)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(35,19,82,0.14)] ${className}`}
        style={{
          backgroundColor: style.bg,
          borderColor: style.border,
        }}
      >
        <FfieCardEyebrow style={style} />
        <CoverMark category={category} />
        <p
          className="font-display text-sm font-bold leading-snug"
          style={{ color: style.text }}
        >
          {coverLabel ?? "Draw card"}
        </p>
        <span className="text-[10px] uppercase tracking-widest text-ffie-ink/35">
          Tap to reveal
        </span>
      </button>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { rotateY: -90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`relative aspect-[3/4] w-full max-w-[220px] overflow-hidden rounded-xl border-2 shadow-[0_4px_16px_rgba(35,19,82,0.1)] ${className}`}
      style={{
        backgroundColor: style.bg,
        borderColor: style.border,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{ backgroundColor: style.text }}
      />
      <div className="relative flex h-full flex-col p-5">{children}</div>
    </motion.div>
  );
}

function FfieCardEyebrow({
  style,
}: {
  style: (typeof CATEGORY_STYLES)[CardCategory];
}) {
  return (
    <span
      className="text-[9px] font-medium uppercase tracking-[0.12em]"
      style={{ color: style.text }}
    >
      Oracle
    </span>
  );
}
