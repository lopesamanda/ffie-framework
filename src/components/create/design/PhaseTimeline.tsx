"use client";

import {
  CREATE_STAGES,
  getCreateFfiePhase,
  getCreateStageIndex,
  type CreatePhaseContext,
} from "@/lib/create-journey-phases";

/** Editorial six-stage indicator: 01 Choose → 02 Draw → … → 06 Question. */
export function PhaseTimeline({ context }: { context: CreatePhaseContext }) {
  const activePhase = getCreateFfiePhase(context);
  const activeIndex = getCreateStageIndex(activePhase);

  return (
    <nav aria-label="Create stages">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[9px] font-semibold uppercase tracking-[0.14em]">
        {CREATE_STAGES.map((entry, index) => {
          const isActive = index === activeIndex;
          const isComplete = index < activeIndex;
          return (
            <li
              key={entry.id}
              className="inline-flex items-center gap-1.5"
              aria-current={isActive ? "step" : undefined}
            >
              {index > 0 && (
                <span
                  className={`select-none ${
                    isComplete || isActive ? "text-ffie-ink/30" : "text-ffie-ink/15"
                  }`}
                  aria-hidden
                >
                  →
                </span>
              )}
              <span
                className={`inline-flex items-baseline gap-1 ${
                  isActive
                    ? "text-ffie-accent"
                    : isComplete
                      ? "text-ffie-ink/55"
                      : "text-ffie-ink/25"
                }`}
              >
                <span className="tabular-nums opacity-70">{entry.number}</span>
                <span>{entry.label}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
