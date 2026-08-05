"use client";

import { FfieButton } from "@/components/create/design/FfieButton";
import { LivePositionMiniMatrix } from "@/components/create/LivePositionMiniMatrix";
import {
  MatrixScaleSlider,
  percentTowardHigh,
} from "@/components/create/MatrixScaleSlider";
import {
  computePlacementPreview,
  formatQuadrantLabel,
  type JourneyDraft,
  type MatrixScaleScore,
} from "@/lib/journey/types";

type MatrixCalibrationScreenProps = {
  draft: JourneyDraft;
  onSystemLogicChange: (score: MatrixScaleScore) => void;
  onPowerOrgChange: (score: MatrixScaleScore) => void;
  onContinue: () => void;
};

export function MatrixCalibrationScreen({
  draft,
  onSystemLogicChange,
  onPowerOrgChange,
  onContinue,
}: MatrixCalibrationScreenProps) {
  const canContinue =
    draft.systemLogicScore != null && draft.powerOrgScore != null;

  const preview =
    canContinue && draft.systemLogicScore && draft.powerOrgScore
      ? computePlacementPreview(draft.systemLogicScore, draft.powerOrgScore)
      : null;

  const systemPct = draft.systemLogicScore
    ? percentTowardHigh(draft.systemLogicScore)
    : null;
  const powerPct = draft.powerOrgScore
    ? percentTowardHigh(draft.powerOrgScore)
    : null;

  return (
    <div className="w-full min-w-0 space-y-6">
      <p className="text-sm text-ffie-muted">
        Two questions place this future on the Critical Feminist Matrix.
      </p>

      <div className="grid gap-6 lg:grid-cols-[1fr_minmax(200px,240px)] lg:items-start">
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
          className="lg:pt-2"
        />
      </div>

      {preview && systemPct != null && powerPct != null && (
        <div className="rounded-xl border border-ffie-line bg-ffie-bg/60 px-4 py-4 text-sm">
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            Placement summary
          </p>
          <dl className="mt-3 grid gap-2 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-ffie-muted">System Logic</dt>
              <dd className="font-medium text-ffie-ink">{systemPct}% emancipatory</dd>
            </div>
            <div>
              <dt className="text-xs text-ffie-muted">Power Organization</dt>
              <dd className="font-medium text-ffie-ink">{powerPct}% collective</dd>
            </div>
            <div>
              <dt className="text-xs text-ffie-muted">Current quadrant</dt>
              <dd className="font-medium text-ffie-ink">
                {formatQuadrantLabel(preview.quadrant)}
              </dd>
            </div>
          </dl>
        </div>
      )}

      <FfieButton disabled={!canContinue} onClick={onContinue}>
        See your future
      </FfieButton>
    </div>
  );
}
