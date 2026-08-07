"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HighlightedWeaknessText } from "@/components/create/HighlightedWeaknessText";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import { PUBLISH_FLOW } from "@/lib/publish-flow-copy";
import type { JourneyDraft } from "@/lib/journey/types";

/** Tap-to-reveal hidden function — Figma nodes 61-2670 / 61-2284. */
export function HiddenFunctionReveal({ draft }: { draft: JourneyDraft }) {
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const copy = PUBLISH_FLOW.published;
  const hiddenFunctionDisplay =
    composeHiddenFunction(draft) || draft.hiddenFunction || "—";

  const handleReveal = () => {
    if (revealed) return;
    setRevealed(true);
  };

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={handleReveal}
        className="w-full border-t border-ffie-line/70 bg-[#f7f5f2] px-7 py-5 text-left transition hover:bg-[#f0ede8]"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
          {copy.hiddenFunctionTap}
        </p>
      </button>
    );
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="border-t border-ffie-line/70 bg-[#fdf1ee] px-7 py-5"
    >
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-[#c8472a]">
          {copy.hiddenFunctionLabel}
        </p>
        <p className="text-[9px] uppercase tracking-[0.08em] text-[#c8472a]">
          {copy.hiddenFunctionRevealed}
        </p>
      </div>
      <p className="mt-2 text-[13px] leading-relaxed text-[#8a2e16]">
        <HighlightedWeaknessText
          text={hiddenFunctionDisplay}
          extremeValue={draft.hiddenFunctionExtremeValue}
          highlightedValue={draft.hiddenFunctionExtremeValue || null}
        />
      </p>
    </motion.div>
  );
}
