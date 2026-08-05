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

/** Distinct footer bar for functional actions — sits below the work-with suggestions panel. */
export function FutureOutputActionFooter({
  onBringToLife,
  onDownload,
  onPublish,
  bringToLifeActive = false,
  downloading = false,
  submitting = false,
  layout = "default",
}: FutureOutputActionFooterProps & {
  layout?: "default" | "sidebar" | "inline" | "full";
}) {
  const buttonGrid =
    layout === "sidebar"
      ? "grid-cols-1 sm:grid-cols-3 lg:grid-cols-1"
      : "grid-cols-1 sm:grid-cols-3";

  const widthClass =
    layout === "full" || layout === "inline"
      ? "w-full"
      : layout === "sidebar"
        ? "mt-6 w-full lg:max-w-sm"
        : "mt-6 lg:max-w-sm";

  return (
    <div
      className={`rounded-xl border border-ffie-line/80 bg-ffie-bg/70 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:px-5 ${widthClass}`}
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
        Next steps
      </p>
      <div className={`mt-3 grid gap-2.5 ${buttonGrid}`}>
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
