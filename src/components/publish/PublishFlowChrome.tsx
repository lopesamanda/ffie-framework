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
    <div className="mx-auto w-full max-w-[960px] px-6 py-7 md:py-[28px]">
      <div className="overflow-hidden rounded-[16px] border border-[rgba(35,19,82,0.12)] bg-[#f7f5f2] shadow-[0_8px_32px_rgba(35,19,82,0.08)]">
        <div className="border-b border-[rgba(35,19,82,0.07)] bg-white px-10 pb-[15px] pt-3">
          <div className="flex flex-wrap items-center gap-6">
            <PublishRitualStepper activeStep={activeStep} />
            <p className="ml-auto text-[10px] font-medium uppercase tracking-[0.15em] text-[rgba(35,19,82,0.25)]">
              {PUBLISH_FLOW.phaseLabel}
            </p>
          </div>
        </div>

        <div className="bg-[#f7f5f2] px-10 pb-8 pt-10">{children}</div>

        {footer && (
          <div className="border-t border-[rgba(35,19,82,0.07)] bg-white px-10 pb-[14px] pt-[15px]">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
