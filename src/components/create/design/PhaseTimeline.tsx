"use client";

import { motion, useReducedMotion } from "framer-motion";
import { getPhaseIndex } from "@/lib/create-stage-meta";
import type { JourneyStage } from "@/lib/journey/types";

const PHASES = [1, 2, 3, 4, 5] as const;

export function PhaseTimeline({ current }: { current: JourneyStage }) {
  const active = getPhaseIndex(current);
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Journey progress"
      className="flex items-center gap-0 px-1"
    >
      {PHASES.map((phase, index) => {
        const isActive = phase === active;
        const isComplete = phase < active;
        const isLast = index === PHASES.length - 1;

        return (
          <div key={phase} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <motion.div
                layout={!reduceMotion}
                className={`rounded-[4.5px] border-[1.5px] ${
                  isActive
                    ? "size-3 border-ffie-accent bg-ffie-accent shadow-[0_0_0_3px_var(--color-ffie-accent-soft)]"
                    : isComplete
                      ? "size-[9px] border-ffie-ink bg-ffie-ink"
                      : "size-[9px] border-ffie-ink/25 bg-transparent"
                }`}
                transition={{ type: "spring", stiffness: 400, damping: 28 }}
              />
              <span
                className={`text-[8px] tracking-[0.08em] ${
                  isActive
                    ? "font-semibold text-ffie-accent"
                    : isComplete
                      ? "text-ffie-ink/55"
                      : "text-ffie-ink/25"
                }`}
              >
                {String(phase).padStart(2, "0")}
              </span>
            </div>
            {!isLast && (
              <div
                className={`mx-1 mb-3.5 h-px w-6 sm:w-8 ${
                  isComplete ? "bg-ffie-ink/40" : "bg-ffie-ink/12"
                }`}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
