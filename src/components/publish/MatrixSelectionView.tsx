"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FfieButton } from "@/components/create/design/FfieButton";
import { PublishRitualFooter } from "@/components/create/design/PublishRitualFooter";
import { PublishRitualStepper } from "@/components/create/design/PublishRitualStepper";
import { ArtifactSummaryPanel } from "@/components/publish/ArtifactSummaryPanel";
import { NamedQuadrantMatrix } from "@/components/publish/NamedQuadrantMatrix";
import { PublishFlowShell } from "@/components/publish/PublishFlowShell";
import { usePublishDraft } from "@/hooks/usePublishDraft";
import { hasMatrixPlacement, hasPublishableDraft } from "@/lib/publish-flow/guards";
import {
  activeQuadrantFromDraft,
  placementPatchFromUnit,
  unitFromDraft,
} from "@/lib/publish-flow/placement";
import { PUBLISH_FLOW } from "@/lib/publish-flow-copy";
import { quadrantFromPosition } from "@/lib/journey/types";
import type { FutureQuadrant } from "@/types/future";

export function MatrixSelectionView() {
  const router = useRouter();
  const { draft, ready, update } = usePublishDraft();
  const copy = PUBLISH_FLOW.matrix;
  const [hoveredQuadrant, setHoveredQuadrant] = useState<FutureQuadrant | null>(
    null,
  );

  useEffect(() => {
    if (!ready) return;
    if (!hasPublishableDraft(draft)) {
      router.replace("/create");
      return;
    }
    if (draft && !hasMatrixPlacement(draft)) {
      update({
        ...placementPatchFromUnit(0.5, 0.5),
        outputStep: 1,
        stage: "output",
      });
    }
  }, [draft, ready, router, update]);

  const unit = useMemo(
    () => (draft ? unitFromDraft(draft) : { x: 0.5, y: 0.5 }),
    [draft],
  );

  const activeQuadrant = draft
    ? quadrantFromPosition(draft.position.x, draft.position.y)
    : "feminist_preferred";

  const handleSelectUnit = useCallback(
    (unitX: number, unitY: number) => {
      update({
        ...placementPatchFromUnit(unitX, unitY),
        outputStep: 1,
        stage: "output",
      });
    },
    [update],
  );

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

  return (
    <PublishFlowShell
        flowKey="matrix"
        eyebrow={copy.eyebrow}
        title={copy.heading}
        subtitle={copy.subtitle}
      >
        <PublishRitualStepper activeStep={1} />

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,320px)] lg:items-start">
          <NamedQuadrantMatrix
            unitX={unit.x}
            unitY={unit.y}
            activeQuadrant={activeQuadrantFromDraft(draft)}
            hoveredQuadrant={hoveredQuadrant}
            onHoverQuadrant={setHoveredQuadrant}
            onSelectUnit={handleSelectUnit}
          />
          <ArtifactSummaryPanel
            draft={draft}
            activeQuadrant={activeQuadrant}
            highlightedQuadrant={hoveredQuadrant}
          />
        </div>

        <PublishRitualFooter
          activeStep={1}
          onBack={() => router.push("/create")}
        >
          <FfieButton
            disabled={!hasMatrixPlacement(draft)}
            onClick={handleContinue}
            iconPosition="trailing"
            className="w-full sm:w-auto"
          >
            {copy.continue}
          </FfieButton>
        </PublishRitualFooter>
      </PublishFlowShell>
  );
}
