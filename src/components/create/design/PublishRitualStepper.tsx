"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PUBLISH_RITUAL_STEPS } from "@/lib/publish-ritual-copy";

type PublishRitualStepperProps = {
  activeStep: number;
  /** Dots only — labels hidden when used as footer progress. */
  variant?: "full" | "dots";
  className?: string;
};

export function PublishRitualStepper({
  activeStep,
  variant = "full",
  className = "",
}: PublishRitualStepperProps) {
  const reduceMotion = useReducedMotion();

  return (
    <nav
      aria-label="Publish ritual progress"
      className={`space-y-2 ${className}`}
    >
      {variant === "full" && (
        <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
          {PUBLISH_RITUAL_STEPS.map((label, index) => {
            const isActive = index === activeStep;
            const isComplete = index < activeStep;
            return (
              <li key={label} className="inline-flex items-center gap-1">
                {index > 0 && (
                  <span
                    className={`select-none text-[9px] ${
                      isComplete ? "text-ffie-ink/35" : "text-ffie-ink/15"
                    }`}
                    aria-hidden
                  >
                    ·
                  </span>
                )}
                <span
                  className={`text-[9px] font-semibold uppercase tracking-[0.14em] ${
                    isActive
                      ? "text-ffie-accent"
                      : isComplete
                        ? "text-ffie-ink/55"
                        : "text-ffie-ink/25"
                  }`}
                >
                  {label}
                </span>
              </li>
            );
          })}
        </ol>
      )}

      <div className="flex items-center gap-1.5 px-0.5">
        {PUBLISH_RITUAL_STEPS.map((label, index) => {
          const isActive = index === activeStep;
          const isComplete = index < activeStep;
          return (
            <motion.div
              key={label}
              layout={!reduceMotion}
              aria-hidden={variant === "dots"}
              aria-label={variant === "dots" ? `${label}${isActive ? ", current" : isComplete ? ", complete" : ""}` : undefined}
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
