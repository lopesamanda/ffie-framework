"use client";

import { FfieButton } from "@/components/create/design/FfieButton";
import { PublishPreviewCard } from "@/components/create/PublishPreviewCard";
import { PublishRitualStepper } from "@/components/create/design/PublishRitualStepper";
import { PUBLISH_RITUAL } from "@/lib/publish-ritual-copy";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";
import type { JourneyDraft } from "@/lib/journey/types";

type LivePreviewScreenProps = {
  draft: JourneyDraft;
  onContinue: () => void;
};

export function LivePreviewScreen({ draft, onContinue }: LivePreviewScreenProps) {
  const copy = PUBLISH_RITUAL.livePreview;
  const personaName = draft.characterName.trim() || "Someone";
  const personaRole = resolvedCharacterRole(draft.role, draft.roleCustom);

  return (
    <div className="mx-auto w-full max-w-xl space-y-8">
      <PublishRitualStepper activeStep={0} />

      <PublishPreviewCard
        draft={draft}
        id="future-live-preview-card"
        personaLine={copy.personaLine(personaName, personaRole)}
      />

      <div className="space-y-4 border-t border-ffie-line/60 pt-6">
        <PublishRitualStepper activeStep={0} variant="dots" />
        <FfieButton onClick={onContinue} iconPosition="trailing">
          {copy.continue}
        </FfieButton>
      </div>
    </div>
  );
}
