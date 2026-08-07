"use client";

import { PUBLISH_RITUAL_STEPS } from "@/lib/publish-ritual-copy";

type PublishFlowFooterProps = {
  activeStep: number;
  onBack?: () => void;
};

/** Figma publish-flow footer rail — Back · dots · step counter (28-517). */
export function PublishFlowFooter({ activeStep, onBack }: PublishFlowFooterProps) {
  const stepTotal = PUBLISH_RITUAL_STEPS.length;
  const stepHuman = activeStep + 1;

  return (
    <div className="flex items-center justify-between">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[rgba(35,19,82,0.4)] transition hover:text-[rgba(35,19,82,0.65)]"
        >
          <span aria-hidden>←</span>
          Back
        </button>
      ) : (
        <span className="w-12" aria-hidden />
      )}

      <div className="flex items-center gap-1.5">
        {PUBLISH_RITUAL_STEPS.map((_, index) => {
          const isActive = index === activeStep;
          const isComplete = index < activeStep;
          return (
            <span
              key={index}
              aria-hidden
              className={`rounded-full ${
                isActive
                  ? "h-1.5 w-5 bg-ffie-ink"
                  : isComplete
                    ? "size-1.5 bg-[rgba(35,19,82,0.4)]"
                    : "size-1.5 bg-[rgba(35,19,82,0.12)]"
              }`}
            />
          );
        })}
      </div>

      <span className="min-w-[2.75rem] text-right text-[11px] tabular-nums text-[rgba(35,19,82,0.25)]">
        {stepHuman} / {stepTotal}
      </span>
    </div>
  );
}
