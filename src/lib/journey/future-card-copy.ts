import type { JourneyDraft } from "@/lib/journey/types";

function stripTrailingPunctuation(text: string): string {
  return text.trim().replace(/[.!?…]+$/, "");
}

/**
 * "Why it exists" line on the final Future card — fear + problem/tension only.
 * Distinct from Artifact Goal (publicPromise) and Artifact Weakness (hidden function).
 */
export function buildWhyItExistsParagraph(
  draft: Pick<
    JourneyDraft,
    "characterName" | "fear" | "artifactName" | "artifactProblemTension"
  >,
): string {
  const name = draft.characterName.trim() || "Someone";
  const fearAnswer = stripTrailingPunctuation(draft.fear);
  const problemAnswer = stripTrailingPunctuation(draft.artifactProblemTension);
  const artifactName = draft.artifactName.trim() || "This artifact";

  if (!fearAnswer && !problemAnswer) return "";

  if (!fearAnswer) {
    return `${artifactName} exists to ${problemAnswer}.`;
  }

  if (!problemAnswer) {
    return `${name} feared AI would ${fearAnswer}.`;
  }

  return `${name} feared AI would ${fearAnswer}. ${artifactName} exists to ${problemAnswer}.`;
}
