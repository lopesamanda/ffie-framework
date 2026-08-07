import type { JourneyDraft } from "@/lib/journey/types";

export function hasPublishableDraft(draft: JourneyDraft | null): draft is JourneyDraft {
  if (!draft) return false;
  return Boolean(draft.artifactName.trim() || draft.title.trim());
}

export function hasMatrixPlacement(draft: JourneyDraft): boolean {
  return draft.systemLogicScore != null && draft.powerOrgScore != null;
}
