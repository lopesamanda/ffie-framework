"use client";

import { FfieButton } from "@/components/create/design/FfieButton";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { TimeTravelTransition } from "@/components/create/design/TimeTravelTransition";
import type { JourneyDraft } from "@/lib/journey/types";

type LivePreviewScreenProps = {
  draft: JourneyDraft;
  onContinue: () => void;
};

export function LivePreviewScreen({ draft, onContinue }: LivePreviewScreenProps) {
  return (
    <TimeTravelTransition
      startYear={new Date().getFullYear()}
      endYear={draft.futureYear}
    >
      <div className="mx-auto max-w-xl space-y-6">
        <p className="text-sm leading-relaxed text-ffie-muted">
          This is the future you imagined — the diegetic artifact, the tensions
          it carries, and the life it belongs to. Next, place it on the Critical
          Feminist Matrix.
        </p>
        <FutureCardPreview
          draft={draft}
          id="future-live-preview-card"
          showCommonsNarrative
          showCardTags
          revealAnimated
        />
        <FfieButton onClick={onContinue}>Continue to matrix calibration</FfieButton>
      </div>
    </TimeTravelTransition>
  );
}
