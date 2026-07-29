"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CREATE_FFIE_PHASES,
  getActivePhaseSubStepCount,
  getActivePhaseSubStepIndex,
  getCreateFfiePhase,
  type CreatePhaseContext,
} from "@/lib/create-journey-phases";

export function PhaseTimeline({ context }: { context: CreatePhaseContext }) {
  const reduceMotion = useReducedMotion();
  const activePhase = getCreateFfiePhase(context);
  const activeIndex = CREATE_FFIE_PHASES.indexOf(activePhase);
  const subStepCount = getActivePhaseSubStepCount(activePhase);
  const subStepIndex = getActivePhaseSubStepIndex(activePhase, context);

  return (
    <nav aria-label="Journey progress" className="space-y-2">
      <div className="flex flex-wrap items-center gap-x-1 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.14em]">
        {CREATE_FFIE_PHASES.map((phase, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          return (
            <span key={phase} className="inline-flex items-center gap-1">
              {index > 0 && (
                <span
                  className={`select-none ${
                    isComplete ? "text-ffie-ink/35" : "text-ffie-ink/15"
                  }`}
                  aria-hidden
                >
                  ·
                </span>
              )}
              <span
                className={
                  isActive
                    ? "text-ffie-accent"
                    : isComplete
                      ? "text-ffie-ink/55"
                      : "text-ffie-ink/25"
                }
              >
                {phase}
              </span>
            </span>
          );
        })}
      </div>

      <div className="flex items-center gap-1.5 px-0.5">
        {Array.from({ length: subStepCount }, (_, index) => {
          const isActive = index === subStepIndex;
          const isComplete = index < subStepIndex;
          return (
            <motion.div
              key={index}
              layout={!reduceMotion}
              className={`rounded-full transition-colors ${
                isActive
                  ? "size-2 bg-ffie-accent shadow-[0_0_0_3px_var(--color-ffie-accent-soft)]"
                  : isComplete
                    ? "size-1.5 bg-ffie-ink/50"
                    : "size-1.5 bg-ffie-ink/15"
              }`}
              transition={{ type: "spring", stiffness: 400, damping: 28 }}
            />
          );
        })}
      </div>
    </nav>
  );
}
