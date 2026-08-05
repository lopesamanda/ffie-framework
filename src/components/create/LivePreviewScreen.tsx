"use client";

import { FfieButton } from "@/components/create/design/FfieButton";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { TimeTravelTransition } from "@/components/create/design/TimeTravelTransition";
import { PUBLISH_RITUAL } from "@/lib/publish-ritual-copy";
import type { JourneyDraft } from "@/lib/journey/types";

type LivePreviewScreenProps = {
  draft: JourneyDraft;
  onContinue: () => void;
};

export function LivePreviewScreen({ draft, onContinue }: LivePreviewScreenProps) {
  const copy = PUBLISH_RITUAL.livePreview;

  return (
    <TimeTravelTransition
      startYear={new Date().getFullYear()}
      endYear={draft.futureYear}
    >
      <div className="mx-auto max-w-xl space-y-6">
        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-ffie-muted">
            {copy.subtitle(draft.artifactName.trim())}
          </p>
        </div>
        <FutureCardPreview
          draft={draft}
          id="future-live-preview-card"
          showCommonsNarrative
          showCardTags
          revealAnimated
        />
        <FfieButton onClick={onContinue}>{copy.continue}</FfieButton>
      </div>
    </TimeTravelTransition>
  );
}
