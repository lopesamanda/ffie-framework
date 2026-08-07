"use client";

import { PublishRitualStepper } from "@/components/create/design/PublishRitualStepper";
import { PUBLISH_FLOW } from "@/lib/publish-flow-copy";

type PublishFlowChromeProps = {
  activeStep: number;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

/** Figma publish-flow shell — stepper header, matte card, optional footer rail. */
export function PublishFlowChrome({
  activeStep,
  children,
  footer,
}: PublishFlowChromeProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
      <div className="overflow-hidden rounded-2xl border border-ffie-line bg-ffie-bg shadow-[0_8px_32px_rgba(35,19,82,0.08)]">
        <div className="border-b border-ffie-line/70 bg-white px-6 py-3 sm:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <PublishRitualStepper activeStep={activeStep} />
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted/80">
              {PUBLISH_FLOW.phaseLabel}
            </p>
          </div>
        </div>

        <div className="bg-ffie-bg px-6 py-8 sm:px-10 sm:py-10">{children}</div>

        {footer && (
          <div className="border-t border-ffie-line/70 bg-white px-6 py-4 sm:px-10">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
