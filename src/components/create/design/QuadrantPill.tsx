"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { FutureQuadrant } from "@/types/future";
import {
  QUADRANT_COLORS,
  QUADRANT_MATRIX_LABELS,
  QUADRANT_TEXT_COLORS,
} from "@/types/future";

export function QuadrantPill({
  quadrant,
  seal = false,
  sealDelay = 0,
}: {
  quadrant: FutureQuadrant;
  /** Brief stamp/settle at end of Future card reveal sequence. */
  seal?: boolean;
  sealDelay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide"
      style={{
        backgroundColor: QUADRANT_COLORS[quadrant],
        color: QUADRANT_TEXT_COLORS[quadrant],
      }}
      initial={false}
      animate={
        seal && !reduceMotion
          ? {
              scale: [1, 1, 1.12, 0.96, 1],
              boxShadow: [
                "0 0 0 rgba(110, 82, 196, 0)",
                "0 0 0 rgba(110, 82, 196, 0)",
                "0 0 0 4px rgba(110, 82, 196, 0.14)",
                "0 0 0 0 rgba(110, 82, 196, 0)",
                "0 0 0 rgba(110, 82, 196, 0)",
              ],
            }
          : { scale: 1 }
      }
      transition={
        seal && !reduceMotion
          ? {
              duration: 0.45,
              delay: sealDelay,
              ease: [0.16, 1, 0.3, 1],
              times: [0, 0.35, 0.55, 0.78, 1],
            }
          : undefined
      }
    >
      {QUADRANT_MATRIX_LABELS[quadrant]}
    </motion.span>
  );
}
