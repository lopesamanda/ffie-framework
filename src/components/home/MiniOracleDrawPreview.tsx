"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CATEGORY_STYLES, ORACLE_CATEGORY_ICONS } from "@/lib/category-styles";

const LOOP_S = 5.5;

/** Miniature looping card-flip teaser for the Home hero Create path. */
export function MiniOracleDrawPreview({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const style = CATEGORY_STYLES.risk;

  if (reduceMotion) {
    return (
      <div
        className={`relative h-[min(100%,200px)] w-[min(62%,125px)] shrink-0 rounded-[10px] shadow-[0_4px_14px_rgba(35,19,82,0.16)] ${className}`}
        style={{ backgroundColor: style.coverFill }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className={`relative mx-auto h-[min(100%,200px)] w-[min(62%,125px)] shrink-0 [perspective:640px] ${className}`}
      aria-hidden
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: [0, 0, 180, 180, 360] }}
        transition={{
          duration: LOOP_S,
          repeat: Infinity,
          ease: "easeInOut",
          times: [0, 0.38, 0.5, 0.88, 1],
        }}
      >
        <div
          className="absolute inset-0 flex flex-col items-center justify-between rounded-[10px] px-3 py-3.5 shadow-[0_4px_14px_rgba(35,19,82,0.16)] [backface-visibility:hidden]"
          style={{ backgroundColor: style.coverFill }}
        >
          <span className="text-[8px] font-medium uppercase tracking-[0.14em] text-white/45">
            Draw
          </span>
          <span className="text-3xl leading-none opacity-55 text-white/90">
            {ORACLE_CATEGORY_ICONS.risk}
          </span>
          <span className="h-2.5" />
        </div>

        <div
          className="absolute inset-0 flex flex-col rounded-[10px] border border-[rgba(35,19,82,0.08)] border-t-[3px] bg-white px-3 py-3 shadow-[0_4px_14px_rgba(35,19,82,0.14)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ borderTopColor: style.text }}
        >
          <span
            className="text-[8px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: style.text }}
          >
            Oracle
          </span>
          <span className="mt-2 text-[11px] font-semibold leading-tight text-ffie-ink">
            Your hand
          </span>
          <span className="mt-auto text-[8px] italic text-ffie-muted">
            Tension
          </span>
        </div>
      </motion.div>
    </div>
  );
}
