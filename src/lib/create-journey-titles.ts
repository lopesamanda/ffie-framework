import { EMBODY_SCREEN_COUNT } from "@/lib/journey/embody-flow";
import { possessiveStoryHeading } from "@/lib/journey/future-card-copy";
import type { CharacterPronounId } from "@/lib/journey/embody-flow";
import { pronounsForSelection } from "@/lib/journey/character-pronouns";
import { PUBLISH_RITUAL } from "@/lib/publish-ritual-copy";
import type { JourneyDraft } from "@/lib/journey/types";

export const CREATION_STEP_LABELS = [
  "Embody the future",
  "Artifact type",
  "Name, problem & capability",
  "Embedded values",
  "Hidden function",
] as const;

/** Total progress units: embody sub-screens + materialize steps (excluding duplicate embody label). */
export const CREATION_PROGRESS_TOTAL =
  EMBODY_SCREEN_COUNT + CREATION_STEP_LABELS.length - 1;

export function creationProgressIndex(draft: JourneyDraft): number {
  if (draft.creationStep === 0) return draft.embodySubStep;
  return EMBODY_SCREEN_COUNT + draft.creationStep - 1;
}

export function creationProgressSubtitle(draft: JourneyDraft): string {
  const index = creationProgressIndex(draft);
  const label = creationStepLabel(draft);
  return `Step ${index + 1} of ${CREATION_PROGRESS_TOTAL} — ${label}`;
}

export function creationStepLabel(draft: JourneyDraft): string {
  return creationScreenTitle(draft);
}

export function creationScreenTitle(draft: JourneyDraft): string {
  if (draft.creationStep === 0) {
    if (draft.embodySubStep <= 1) return "Give them a life.";
    if (draft.embodySubStep === 2) return "Give them a life.";
    if (draft.embodySubStep === 3) {
      return possessiveStoryHeading(
        pronounsForSelection(draft.characterPronoun as CharacterPronounId),
      );
    }
    return "Name the fear.";
  }
  if (draft.creationStep === 1) return "Give it a body.";
  if (draft.creationStep === 2) return "Place it in the world.";
  if (draft.creationStep === 3) return "What it stands for.";
  if (draft.creationStep === 4) return "Its shadow side.";
  return CREATION_STEP_LABELS[draft.creationStep] ?? "";
}

export function oracleDrawTitle(): string {
  return "The Draw.";
}

export function livePreviewTitle(): string {
  return PUBLISH_RITUAL.livePreview.heading;
}

export function matrixPlacementTitle(): string {
  return PUBLISH_RITUAL.calibration.heading;
}

export function reflectTitle(): string {
  return PUBLISH_RITUAL.reflect.heading;
}

export function publishedTitle(): string {
  return PUBLISH_RITUAL.confirmation.heading;
}

/** @deprecated Use livePreviewTitle for step 0 */
export function futureRevealTitle(): string {
  return livePreviewTitle();
}

export function outputStepTitle(step: number): string {
  switch (step) {
    case 0:
      return livePreviewTitle();
    case 1:
      return matrixPlacementTitle();
    case 2:
      return reflectTitle();
    case 3:
      return publishedTitle();
    default:
      return livePreviewTitle();
  }
}

export function outputStepSubtitle(step: number): string | undefined {
  switch (step) {
    case 0:
      return undefined;
    case 1:
      return PUBLISH_RITUAL.calibration.subtitle;
    case 2:
      return PUBLISH_RITUAL.reflect.subtitle;
    case 3:
      return undefined;
    default:
      return undefined;
  }
}
