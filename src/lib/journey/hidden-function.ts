import type { JourneyDraft } from "@/lib/journey/types";

export function composeHiddenFunction(
  draft: Pick<
    JourneyDraft,
    "hiddenFunctionExtremeValue" | "hiddenFunctionCompletion" | "artifactName"
  >,
): string {
  const value = draft.hiddenFunctionExtremeValue.trim();
  const completion = draft.hiddenFunctionCompletion.trim();
  if (!value || !completion) return completion;

  const artifact = draft.artifactName.trim() || "this artifact";
  return `Pushed to its extreme, ${value} means ${artifact} quietly ${completion}.`;
}

export function isHiddenFunctionComplete(
  draft: Pick<
    JourneyDraft,
    "hiddenFunctionExtremeValue" | "hiddenFunctionCompletion"
  >,
): boolean {
  return (
    draft.hiddenFunctionExtremeValue.trim().length > 0 &&
    draft.hiddenFunctionCompletion.trim().length > 0
  );
}
