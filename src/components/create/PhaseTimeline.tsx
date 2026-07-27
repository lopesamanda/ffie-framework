"use client";

import { JOURNEY_STAGES, type JourneyStage } from "@/lib/journey/types";

export function PhaseTimeline({ current }: { current: JourneyStage }) {
  const currentIndex = JOURNEY_STAGES.findIndex((s) => s.id === current);

  return (
    <nav
      aria-label="Journey progress"
      className="flex flex-wrap gap-1 border-b border-ffie-line pb-4"
    >
      {JOURNEY_STAGES.map((stage, index) => {
        const isActive = stage.id === current;
        const isComplete = index < currentIndex;

        return (
          <div
            key={stage.id}
            className={`rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide ${
              isActive
                ? "bg-ffie-accent text-white"
                : isComplete
                  ? "bg-ffie-accent-soft text-ffie-accent"
                  : "text-ffie-muted"
            }`}
          >
            {stage.label}
          </div>
        );
      })}
    </nav>
  );
}
