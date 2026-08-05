"use client";

import { FfieButton } from "@/components/create/design/FfieButton";
import { HoldToAnchorButton } from "@/components/create/HoldToAnchorButton";
import { LivePositionMiniMatrix } from "@/components/create/LivePositionMiniMatrix";
import { PUBLISH_RITUAL } from "@/lib/publish-ritual-copy";
import type { JourneyDraft } from "@/lib/journey/types";

type AnchorScreenProps = {
  draft: JourneyDraft;
  submitting: boolean;
  submitError: string | null;
  onAnchor: () => void;
  onLookAgain: () => void;
};

export function AnchorScreen({
  draft,
  submitting,
  submitError,
  onAnchor,
  onLookAgain,
}: AnchorScreenProps) {
  const copy = PUBLISH_RITUAL.anchor;

  return (
    <div className="mx-auto w-full max-w-lg space-y-8 text-center">
      <p className="text-sm leading-relaxed text-ffie-muted">
        {copy.subtitle(draft.artifactName.trim())}
      </p>

      <LivePositionMiniMatrix
        systemLogicScore={draft.systemLogicScore}
        powerOrgScore={draft.powerOrgScore}
        settling
        className="mx-auto"
      />

      {submitError && (
        <p className="text-sm text-red-700" role="alert">
          {submitError}
        </p>
      )}

      <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <HoldToAnchorButton
          onComplete={onAnchor}
          disabled={submitting}
          holdingLabel={copy.holding}
        >
          {copy.primary}
        </HoldToAnchorButton>
        <FfieButton variant="secondary" onClick={onLookAgain} disabled={submitting}>
          {copy.secondary}
        </FfieButton>
      </div>
    </div>
  );
}
