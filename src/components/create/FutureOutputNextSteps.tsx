"use client";

import type { ReactNode } from "react";
import { FfieButton } from "@/components/create/design/FfieButton";

type FutureOutputActionFooterProps = {
  onBringToLife: () => void;
  onDownload: () => void;
  onPublish: () => void;
  bringToLifeActive?: boolean;
  downloading?: boolean;
  submitting?: boolean;
};

/** Distinct footer bar for functional actions — sits beneath the Future card only. */
export function FutureOutputActionFooter({
  onBringToLife,
  onDownload,
  onPublish,
  bringToLifeActive = false,
  downloading = false,
  submitting = false,
}: FutureOutputActionFooterProps) {
  return (
    <div className="mt-6 rounded-xl border border-ffie-line/80 bg-ffie-bg/70 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:px-5">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
        Next steps
      </p>
      <div className="mt-3 grid gap-2.5 sm:grid-cols-3">
        <FfieButton
          variant={bringToLifeActive ? "primary" : "secondary"}
          onClick={onBringToLife}
          className="w-full justify-center text-sm"
        >
          Bring it to life
        </FfieButton>
        <FfieButton
          variant="secondary"
          onClick={onDownload}
          disabled={downloading}
          className="w-full justify-center text-sm"
        >
          {downloading ? "Preparing…" : "Download this future"}
        </FfieButton>
        <FfieButton
          variant="secondary"
          onClick={onPublish}
          disabled={submitting}
          className="w-full justify-center text-sm"
        >
          Publish to Future Commons
        </FfieButton>
      </div>
      <p className="mt-2.5 text-xs text-ffie-muted">
        Pick any option — none depends on the others.
      </p>
    </div>
  );
}

type FutureOutputNextStepsProps = FutureOutputActionFooterProps & {
  materializePanel?: ReactNode;
  publishPanel?: ReactNode;
};

export function FutureOutputNextSteps({
  materializePanel,
  publishPanel,
  bringToLifeActive,
  ...footerProps
}: FutureOutputNextStepsProps) {
  return (
    <div className="space-y-6">
      <FutureOutputActionFooter
        {...footerProps}
        bringToLifeActive={bringToLifeActive}
      />
      {bringToLifeActive && materializePanel}
      {publishPanel}
    </div>
  );
}
