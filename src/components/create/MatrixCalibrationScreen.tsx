"use client";

import { useEffect } from "react";
import { FfieButton } from "@/components/create/design/FfieButton";
import { LivePositionMiniMatrix } from "@/components/create/LivePositionMiniMatrix";
import {
  MatrixScaleSlider,
  percentTowardHigh,
} from "@/components/create/MatrixScaleSlider";
import { PublishRitualFooter } from "@/components/create/design/PublishRitualFooter";
import { PublishRitualStepper } from "@/components/create/design/PublishRitualStepper";
import { PUBLISH_RITUAL } from "@/lib/publish-ritual-copy";
import {
  computePlacementPreview,
  formatQuadrantLabel,
  type JourneyDraft,
} from "@/lib/journey/types";

type MatrixCalibrationScreenProps = {
  draft: JourneyDraft;
  onSystemLogicChange: (score: number) => void;
  onPowerOrgChange: (score: number) => void;
  onContinue: () => void;
  onBack?: () => void;
};

export function MatrixCalibrationScreen({
  draft,
  onSystemLogicChange,
  onPowerOrgChange,
  onContinue,
  onBack,
}: MatrixCalibrationScreenProps) {
  const copy = PUBLISH_RITUAL.calibration;
  const canContinue =
    draft.systemLogicScore != null && draft.powerOrgScore != null;

  const preview =
    canContinue &&
    draft.systemLogicScore != null &&
    draft.powerOrgScore != null
      ? computePlacementPreview(draft.systemLogicScore, draft.powerOrgScore)
      : null;

  const systemPct =
    draft.systemLogicScore != null
      ? percentTowardHigh(draft.systemLogicScore)
      : null;
  const powerPct =
    draft.powerOrgScore != null ? percentTowardHigh(draft.powerOrgScore) : null;

  useEffect(() => {
    if (draft.systemLogicScore == null) onSystemLogicChange(50);
    if (draft.powerOrgScore == null) onPowerOrgChange(50);
  }, [draft.systemLogicScore, draft.powerOrgScore, onSystemLogicChange, onPowerOrgChange]);

  return (
    <div className="w-full min-w-0 space-y-8">
      <PublishRitualStepper activeStep={1} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(200px,240px)] lg:items-start">
        <div className="space-y-5">
          <MatrixScaleSlider
            question="In the world you imagined, does this technology mostly extract something from the people who use it — time, data, autonomy — or give something back?"
            lowLabel="Extracts"
            highLabel="Gives back"
            value={draft.systemLogicScore}
            onChange={onSystemLogicChange}
          />
          <MatrixScaleSlider
            question="Who decides how this technology is used in that future — a person or company at the top, or the community that lives with it, together?"
            lowLabel="Centralized decision"
            highLabel="Collective decision"
            value={draft.powerOrgScore}
            onChange={onPowerOrgChange}
          />
        </div>

        <LivePositionMiniMatrix
          systemLogicScore={draft.systemLogicScore}
          powerOrgScore={draft.powerOrgScore}
          sticky
        />
      </div>

      {preview && systemPct != null && powerPct != null && (
        <div className="rounded-xl border border-ffie-line bg-ffie-bg/60 px-4 py-4 text-sm">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            {copy.summaryLabel}
          </p>
          <dl className="mt-3 grid gap-2 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-ffie-muted">{copy.systemLogicLabel}</dt>
              <dd className="font-medium text-ffie-ink">{systemPct}% emancipatory</dd>
            </div>
            <div>
              <dt className="text-xs text-ffie-muted">{copy.powerOrgLabel}</dt>
              <dd className="font-medium text-ffie-ink">{powerPct}% collective</dd>
            </div>
            <div>
              <dt className="text-xs text-ffie-muted">{copy.quadrantLabel}</dt>
              <dd className="font-medium text-ffie-ink">
                {formatQuadrantLabel(preview.quadrant)}
              </dd>
            </div>
          </dl>
        </div>
      )}

      <PublishRitualFooter activeStep={1} onBack={onBack}>
        <FfieButton disabled={!canContinue} onClick={onContinue} iconPosition="trailing" className="w-full sm:w-auto">
          {copy.continue}
        </FfieButton>
      </PublishRitualFooter>
    </div>
  );
}
