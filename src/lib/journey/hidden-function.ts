import type { JourneyDraft } from "@/lib/journey/types";

/** Strip trailing sentence punctuation from free-text clauses. */
export function cleanClause(text: string): string {
  return text.trim().replace(/[.!?…]+$/, "");
}

export function hiddenFunctionPrompt(
  draft: Pick<JourneyDraft, "artifactName" | "artifactGoalPitch">,
): string {
  const name = draft.artifactName.trim() || "this artifact";
  const pitch = cleanClause(draft.artifactGoalPitch);

  if (!pitch) {
    return `Which of these values, pushed too far, reveals what ${name} actually does instead, quietly, that it doesn't advertise?`;
  }

  return `You said ${name} claims to ${pitch}. Which of these values, pushed too far, reveals what it actually does instead, quietly, that it doesn't advertise?`;
}

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
