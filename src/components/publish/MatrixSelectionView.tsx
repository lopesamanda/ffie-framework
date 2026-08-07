"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FfieButton } from "@/components/create/design/FfieButton";
import { PublishRitualFooter } from "@/components/create/design/PublishRitualFooter";
import { ArtifactRecapCard } from "@/components/publish/ArtifactRecapCard";
import { PublishAxisSlider } from "@/components/publish/PublishAxisSlider";
import { PublishFlowChrome } from "@/components/publish/PublishFlowChrome";
import { PublishLiveMatrix } from "@/components/publish/PublishLiveMatrix";
import { usePublishDraft } from "@/hooks/usePublishDraft";
import { computePlacementFromMatrixScales } from "@/lib/journey/types";
import { hasMatrixPlacement, hasPublishableDraft } from "@/lib/publish-flow/guards";
import { PUBLISH_FLOW } from "@/lib/publish-flow-copy";

export function MatrixSelectionView() {
  const router = useRouter();
  const { draft, ready, update } = usePublishDraft();
  const copy = PUBLISH_FLOW.matrix;

  useEffect(() => {
    if (!ready) return;
    if (!hasPublishableDraft(draft)) {
      router.replace("/create");
      return;
    }
    if (draft && !hasMatrixPlacement(draft)) {
      const placement = computePlacementFromMatrixScales(50, 50);
      update({
        systemLogicScore: 50,
        powerOrgScore: 50,
        position: placement.position,
        powerPosition: placement.powerPosition,
        placementJustification: placement.placementJustification,
        outputStep: 1,
        stage: "output",
      });
    }
  }, [draft, ready, router, update]);

  const applyScores = (systemLogicScore: number, powerOrgScore: number) => {
    const placement = computePlacementFromMatrixScales(
      systemLogicScore,
      powerOrgScore,
    );
    update({
      systemLogicScore,
      powerOrgScore,
      position: placement.position,
      powerPosition: placement.powerPosition,
      placementJustification: placement.placementJustification,
      outputStep: 1,
      stage: "output",
    });
  };

  const handleContinue = () => {
    if (!draft || !hasMatrixPlacement(draft)) return;
    update({ outputStep: 2 });
    router.push("/publish/review");
  };

  if (!ready || !draft) {
    return (
      <div className="py-20 text-center text-sm text-ffie-muted">Loading…</div>
    );
  }

  const footer = (
    <PublishRitualFooter activeStep={1} onBack={() => router.push("/create")}>
      <span aria-hidden />
    </PublishRitualFooter>
  );

  return (
    <PublishFlowChrome activeStep={1} footer={footer}>
      <h1 className="font-display text-[26px] font-bold leading-tight tracking-tight text-ffie-ink">
        {copy.heading}
      </h1>

      <div className="mt-3">
        <ArtifactRecapCard draft={draft} />
      </div>

      <div className="mt-9 grid gap-10 lg:grid-cols-[minmax(0,1fr)_290px] lg:items-start">
        <div className="space-y-9">
          <PublishAxisSlider
            axis="X"
            eyebrow={copy.systemLogicEyebrow}
            question={copy.systemLogicQuestion}
            lowLabel={copy.extractsLabel}
            highLabel={copy.givesBackLabel}
            feedbackHigh={copy.givesBackLabel.toLowerCase()}
            value={draft.systemLogicScore}
            onChange={(score) =>
              applyScores(score, draft.powerOrgScore ?? 50)
            }
          />
          <PublishAxisSlider
            axis="Y"
            eyebrow={copy.powerOrgEyebrow}
            question={copy.powerOrgQuestion}
            lowLabel={copy.centralizedLabel}
            highLabel={copy.collectiveLabel}
            feedbackHigh={copy.collectiveLabel.toLowerCase()}
            value={draft.powerOrgScore}
            onChange={(score) =>
              applyScores(draft.systemLogicScore ?? 50, score)
            }
          />
          <div className="flex justify-end pt-2">
            <FfieButton
              disabled={!hasMatrixPlacement(draft)}
              onClick={handleContinue}
              iconPosition="trailing"
            >
              {copy.continue}
            </FfieButton>
          </div>
        </div>

        <PublishLiveMatrix
          systemLogicScore={draft.systemLogicScore}
          powerOrgScore={draft.powerOrgScore}
          sticky
        />
      </div>
    </PublishFlowChrome>
  );
}
