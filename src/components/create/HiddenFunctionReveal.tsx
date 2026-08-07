"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { HighlightedWeaknessText } from "@/components/create/HighlightedWeaknessText";
import { ffieCardSectionLabel } from "@/lib/card-layout";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import type { JourneyDraft } from "@/lib/journey/types";

/** Glitch/holographic reveal for the artifact hidden function on the Published screen. */
export function HiddenFunctionReveal({ draft }: { draft: JourneyDraft }) {
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const hiddenFunctionDisplay =
    composeHiddenFunction(draft) || draft.hiddenFunction || "—";
  const artifactName = draft.artifactName.trim() || "this artifact";

  const handleReveal = () => {
    if (revealed || glitching) return;
    if (reduceMotion) {
      setRevealed(true);
      return;
    }
    setGlitching(true);
    window.setTimeout(() => {
      setGlitching(false);
      setRevealed(true);
    }, 720);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-[#f0d4cc]/90 bg-[#fdf1ee]/80 px-5 py-4 backdrop-blur-[2px]">
      {!revealed && !reduceMotion && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl"
          animate={{
            boxShadow: [
              "0 0 0 0 rgba(200, 71, 42, 0)",
              "0 0 0 4px rgba(200, 71, 42, 0.12)",
              "0 0 0 0 rgba(200, 71, 42, 0)",
            ],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <div className="relative flex items-start justify-between gap-3">
        <p className={`${ffieCardSectionLabel} text-[#c8472a]`}>
          Hidden function
        </p>
        {!revealed && (
          <button
            type="button"
            onClick={handleReveal}
            className="shrink-0 rounded-full border border-[#c8472a]/25 bg-white/70 px-3 py-1 text-xs font-semibold text-[#c8472a] transition hover:border-[#c8472a]/45 hover:bg-white"
          >
            Reveal weakness →
          </button>
        )}
      </div>

      {!revealed ? (
        <button
          type="button"
          onClick={handleReveal}
          className="relative mt-3 w-full text-left"
        >
          <p className="text-sm leading-relaxed text-ffie-muted">
            Something about {artifactName} stays in the shadows — the friction
            its public promise depends on.
          </p>
          <div
            aria-hidden
            className={`mt-3 h-12 overflow-hidden rounded-lg border border-[#f0d4cc] bg-gradient-to-r from-[#fdf1ee] via-[#f8e8e3] to-[#fdf1ee] ${
              glitching ? "published-glitch-mask" : ""
            }`}
          >
            <span className="block px-3 py-3 font-mono text-[11px] tracking-widest text-[#c8472a]/35 blur-[2px] select-none">
              ░▒▓█ weakness signal █▓▒░
            </span>
          </div>
        </button>
      ) : (
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 8, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`mt-3 ${glitching ? "published-glitch-text" : ""}`}
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
