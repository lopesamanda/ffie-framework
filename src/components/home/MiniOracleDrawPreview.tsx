"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CATEGORY_STYLES, ORACLE_CATEGORY_ICONS } from "@/lib/category-styles";

const LOOP_S = 5.5;

/** Miniature looping card-flip teaser for the Home hero Create path. */
export function MiniOracleDrawPreview() {
  const reduceMotion = useReducedMotion();
  const style = CATEGORY_STYLES.risk;

  if (reduceMotion) {
    return (
      <div
        className="relative h-[88px] w-[56px] shrink-0 rounded-[8px] shadow-[0_2px_6px_rgba(35,19,82,0.14)]"
        style={{ backgroundColor: style.coverFill }}
        aria-hidden
      />
    );
  }

  return (
    <div
      className="relative h-[88px] w-[56px] shrink-0 [perspective:420px]"
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
          className="absolute inset-0 flex flex-col items-center justify-between rounded-[8px] px-2 py-2.5 shadow-[0_2px_6px_rgba(35,19,82,0.14)] [backface-visibility:hidden]"
          style={{ backgroundColor: style.coverFill }}
        >
          <span className="text-[6px] font-medium uppercase tracking-[0.14em] text-white/45">
            Draw
          </span>
          <span className="text-xl leading-none opacity-55 text-white/90">
            {ORACLE_CATEGORY_ICONS.risk}
          </span>
          <span className="h-2" />
        </div>

        <div
          className="absolute inset-0 flex flex-col rounded-[8px] border border-[rgba(35,19,82,0.08)] border-t-[3px] bg-white px-2 py-2 shadow-[0_2px_6px_rgba(35,19,82,0.12)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ borderTopColor: style.text }}
        >
          <span
            className="text-[6px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: style.text }}
          >
            Oracle
          </span>
          <span className="mt-1.5 text-[8px] font-semibold leading-tight text-ffie-ink">
            Your hand
          </span>
          <span className="mt-auto text-[6px] italic text-ffie-muted">
            Tension
          </span>
        </div>
      </motion.div>
    </div>
  );
}
