import type { JourneyDraft } from "@/lib/journey/types";

export function composeHiddenFunction(
  draft: Pick<
    JourneyDraft,
    "hiddenFunctionExtremeValue" | "hiddenFunctionCompletion" | "artifactName"
  >,
): string {
  const value = draft.hiddenFunctionExtremeValue.trim();
  const completion = draft.hiddenFunctionCompletion.trim().replace(/[.!?…]+$/, "");
  if (!value || !completion) return completion;

  const artifact = draft.artifactName.trim() || "this artifact";
  return `Every value has a shadow side. If ${value} in ${artifact} went too far, it would ${completion}.`;
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
