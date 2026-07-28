"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { CardHand } from "@/lib/journey/types";
import {
  buildOracleSynthesis,
  buildOracleSynthesisTensions,
} from "@/lib/journey/oracle-synthesis";
import { FFIE_CARD_TEXT } from "@/lib/card-layout";

export function OracleSynthesisCallout({ hand }: { hand: CardHand }) {
  const main = buildOracleSynthesis(hand);
  const tensions = buildOracleSynthesisTensions(hand);
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-xl border border-ffie-accent/30 bg-[#f6f4ff] px-5 py-4 shadow-[0_4px_24px_rgba(110,82,196,0.18)]"
      role="note"
      aria-label="Oracle Draw synthesis"
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(110, 82, 196, 0.22) 0%, transparent 70%)",
          }}
        />
      )}
      <p className="relative text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-accent">
        Your draw, in one sentence
      </p>
      <p
        className={`relative mt-2 text-base font-medium italic leading-relaxed text-ffie-accent ${FFIE_CARD_TEXT}`}
      >
        {main}
      </p>
      <p className={`relative mt-2 text-sm leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
        {tensions}
      </p>
    </motion.div>
  );
}
