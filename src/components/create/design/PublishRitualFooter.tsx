"use client";

import type { ReactNode } from "react";
import { FfieButton } from "@/components/create/design/FfieButton";
import { PublishRitualStepper } from "@/components/create/design/PublishRitualStepper";
import { PUBLISH_RITUAL_STEPS } from "@/lib/publish-ritual-copy";

type PublishRitualFooterProps = {
  activeStep: number;
  onBack?: () => void;
  backLabel?: string;
  children: ReactNode;
  className?: string;
};

/** Shared publish-ritual footer — Back, progress dots, step counter, primary action. */
export function PublishRitualFooter({
  activeStep,
  onBack,
  backLabel = "Back",
  children,
  className = "",
}: PublishRitualFooterProps) {
  const stepTotal = PUBLISH_RITUAL_STEPS.length;
  const stepHuman = activeStep + 1;

  return (
    <div
      className={`space-y-4 border-t border-ffie-line/60 pt-6 ${className}`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {onBack ? (
          <FfieButton variant="ghost" onClick={onBack} className="!px-4 !py-2 text-sm">
            ← {backLabel}
          </FfieButton>
        ) : (
          <span className="w-16 shrink-0" aria-hidden />
        )}
        <div className="flex flex-1 justify-center">
          <PublishRitualStepper activeStep={activeStep} variant="dots" />
        </div>
        <span className="min-w-[3rem] shrink-0 text-right text-xs font-medium tabular-nums text-ffie-muted">
          {stepHuman} / {stepTotal}
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}
