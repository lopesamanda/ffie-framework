"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HighlightedWeaknessText } from "@/components/create/HighlightedWeaknessText";
import { ffieCardSectionLabel } from "@/lib/card-layout";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import type { JourneyDraft } from "@/lib/journey/types";

/** Published-screen interaction — collapsed teaser, reveal trigger, expanded weakness. */
export function HiddenFunctionReveal({ draft }: { draft: JourneyDraft }) {
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const hiddenFunctionDisplay =
    composeHiddenFunction(draft) || draft.hiddenFunction || "—";
  const artifactName = draft.artifactName.trim() || "this artifact";

  return (
    <div className="rounded-2xl border border-[#f0d4cc] bg-[#fdf1ee]/90 px-5 py-4">
      <div className="flex items-start justify-between gap-3">
        <p className={`${ffieCardSectionLabel} text-[#c8472a]`}>
          Hidden function
        </p>
        {!revealed && (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="shrink-0 text-xs font-semibold text-ffie-accent underline-offset-2 hover:underline"
          >
            Reveal →
          </button>
        )}
      </div>

      {!revealed ? (
        <div className="mt-3 space-y-2">
          <p className="text-sm leading-relaxed text-ffie-muted">
            Something about {artifactName} stays in the shadows — the trade-off
            its public promise depends on.
          </p>
          <div
            aria-hidden
            className="h-10 rounded-lg bg-gradient-to-r from-[#fdf1ee] via-[#f5ddd6] to-[#fdf1ee] blur-[0.3px]"
          />
        </div>
      ) : (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="mt-3 overflow-hidden"
        >
          <p className="text-sm leading-relaxed text-ffie-ink">
            <HighlightedWeaknessText
              text={hiddenFunctionDisplay}
              extremeValue={draft.hiddenFunctionExtremeValue}
              highlightedValue={draft.hiddenFunctionExtremeValue || null}
            />
          </p>
        </motion.div>
      )}
    </div>
  );
}
