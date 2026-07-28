"use client";

import type { ReactNode } from "react";
import { FfieButton } from "@/components/create/design/FfieButton";

type FutureOutputNextStepsProps = {
  onBringToLife: () => void;
  onDownload: () => void;
  onPublish: () => void;
  bringToLifeActive?: boolean;
  materializePanel?: ReactNode;
  publishPanel?: ReactNode;
  downloading?: boolean;
  submitting?: boolean;
};

export function FutureOutputNextSteps({
  onBringToLife,
  onDownload,
  onPublish,
  bringToLifeActive = false,
  materializePanel,
  publishPanel,
  downloading = false,
  submitting = false,
}: FutureOutputNextStepsProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
          Next steps
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <FfieButton
            variant={bringToLifeActive ? "primary" : "secondary"}
            onClick={onBringToLife}
            className="w-full justify-center"
          >
            Bring it to life
          </FfieButton>
          <FfieButton
            variant="secondary"
            onClick={onDownload}
            disabled={downloading}
            className="w-full justify-center"
          >
            {downloading ? "Preparing…" : "Download this future"}
          </FfieButton>
          <FfieButton
            variant="secondary"
            onClick={onPublish}
            disabled={submitting}
            className="w-full justify-center"
          >
            Publish to Future Commons
          </FfieButton>
        </div>
        <p className="mt-2 text-xs text-ffie-muted">
          Pick any option — none depends on the others.
        </p>
      </div>

      {bringToLifeActive && materializePanel}
      {publishPanel}
    </div>
  );
}
