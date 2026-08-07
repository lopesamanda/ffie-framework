import { resolveArtifactValues } from "@/lib/journey/artifact-options";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";
import { resolvedPersonaSector } from "@/lib/journey/resolved-sector";
import {
  buildNarrative,
  buildReflectionQuestion,
  buildTitle,
  genderLabelForDraft,
  quadrantFromPosition,
  raceEthnicityForDraft,
  type JourneyDraft,
} from "@/lib/journey/types";

export async function submitJourneyDraft(draft: JourneyDraft): Promise<{
  id?: string;
  title: string;
  narrative: string;
}> {
  const title = buildTitle(draft.artifactName, draft.characterName);
  const narrative = buildNarrative({ ...draft, title });
  const reflectionQuestion = buildReflectionQuestion(draft);
  const quadrant = quadrantFromPosition(draft.position.x, draft.position.y);

  if (!draft.submitToCommons) {
    return { title, narrative };
  }

  const response = await fetch("/api/submissions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      sessionId: draft.sessionId,
      title,
      narrative,
      reflectionQuestion,
      location: draft.location,
      characterName: draft.characterName,
      characterAge: Number.parseInt(draft.characterAge, 10) || null,
      characterGender: genderLabelForDraft(draft),
      characterRaceEthnicity: raceEthnicityForDraft(draft),
      role: resolvedCharacterRole(draft.role, draft.roleCustom),
      personaSector:
        resolvedPersonaSector(
          draft.personaSector,
          draft.personaSectorCustom,
        ) || undefined,
      year: draft.futureYear,
      aiFunction: draft.aiFunction,
      desire: draft.desire,
      fear: draft.fear,
      values: draft.values,
      artifactName: draft.artifactName,
      publicPromise: draft.publicPromise,
      hiddenFunction: composeHiddenFunction(draft) || draft.hiddenFunction,
      artifactValues: resolveArtifactValues(draft),
      tension: draft.combinedTension,
      quadrant,
      powerPosition: draft.powerPosition,
      position: draft.position,
      placementJustification: draft.placementJustification,
      cardProvenance: draft.cardHand
        ? [
            draft.cardHand.risk.id,
            draft.cardHand.benefit.id,
            draft.cardHand.trust.id,
            draft.cardHand.barrier.id,
            draft.cardHand.transversal.id,
          ]
        : [],
      drawSynthesis: draft.drawSynthesis,
      drawSynthesisTensions: draft.drawSynthesisTensions,
      reflectionText: [
        draft.reflectionText.trim(),
        draft.closingReflection.trim(),
      ]
        .filter(Boolean)
        .join("\n\n"),
      imageDataUrl: draft.imageDataUrl,
      submitToCommons: true,
    }),
  });

  const result = (await response.json()) as { id?: string; error?: string };
  if (!response.ok) {
    throw new Error(result.error ?? "Submission failed");
  }

  return { id: result.id, title, narrative };
}
