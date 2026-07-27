"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FFIE_PHASES } from "@/data/about-content";

const CYCLE_MS = 3200;

/** Explanatory pacing — cycles through phases slowly, no journey progression. */
export function PhaseTimelineExplainer() {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % FFIE_PHASES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const active = FFIE_PHASES[activeIndex];

  return (
    <div className="space-y-6">
      <nav aria-label="Five-phase framework" className="flex items-center gap-0 px-1">
        {FFIE_PHASES.map((phase, index) => {
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          const isLast = index === FFIE_PHASES.length - 1;

          return (
            <div key={phase.phase} className="flex items-center">
              <button
                type="button"
                onClick={() => setActiveIndex(index)}
                className="flex flex-col items-center gap-1.5 text-left"
              >
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          scale: isActive ? 1.15 : 1,
                          boxShadow: isActive
                            ? "0 0 0 4px var(--color-ffie-accent-soft)"
                            : "0 0 0 0px transparent",
                        }
                  }
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  className={`rounded-[4.5px] border-[1.5px] ${
                    isActive
                      ? "size-3.5 border-ffie-accent bg-ffie-accent"
                      : isPast
                        ? "size-[9px] border-ffie-ink bg-ffie-ink"
                        : "size-[9px] border-ffie-ink/25 bg-transparent"
                  }`}
                />
                <span
                  className={`max-w-[4.5rem] text-center text-[8px] leading-tight tracking-[0.06em] ${
                    isActive
                      ? "font-semibold text-ffie-accent"
                      : isPast
                        ? "text-ffie-ink/55"
                        : "text-ffie-ink/25"
                  }`}
                >
                  {phase.name}
                </span>
              </button>
              {!isLast && (
                <div
                  className={`mx-1 mb-5 h-px w-5 sm:w-7 ${
                    isPast ? "bg-ffie-ink/40" : "bg-ffie-ink/12"
                  }`}
                />
              )}
            </div>
          );
        })}
      </nav>

      <motion.div
        key={active.phase}
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="rounded-xl border border-ffie-line bg-ffie-bg/60 px-5 py-4"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-accent">
          Phase {String(active.phase).padStart(2, "0")} — {active.name}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-ffie-muted">
          {active.description}
        </p>
      </motion.div>
    </div>
  );
}
