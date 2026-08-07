"use client";

import { FfieButton } from "@/components/create/design/FfieButton";
import { PublishPreviewCard } from "@/components/create/PublishPreviewCard";
import { PublishRitualFooter } from "@/components/create/design/PublishRitualFooter";
import { PublishRitualStepper } from "@/components/create/design/PublishRitualStepper";
import { PUBLISH_RITUAL } from "@/lib/publish-ritual-copy";
import type { JourneyDraft } from "@/lib/journey/types";

type LivePreviewScreenProps = {
  draft: JourneyDraft;
  onContinue: () => void;
};

export function LivePreviewScreen({ draft, onContinue }: LivePreviewScreenProps) {
  const copy = PUBLISH_RITUAL.livePreview;

  return (
    <div className="w-full space-y-8">
      <PublishRitualStepper activeStep={0} />

      <PublishPreviewCard draft={draft} id="future-live-preview-card" />

      <PublishRitualFooter activeStep={0}>
        <FfieButton onClick={onContinue} iconPosition="trailing" className="w-full sm:w-auto">
          {copy.continue}
        </FfieButton>
      </PublishRitualFooter>
    </div>
  );
}
