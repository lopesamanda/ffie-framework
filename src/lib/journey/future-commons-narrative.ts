import { AI_CAPABILITY_CARDS } from "@/data/ai-capability-cards";
import { composeLocation } from "@/lib/journey/character-options";
import { pronounsForSelection, verbFor } from "@/lib/journey/character-pronouns";
import type { JourneyDraft } from "@/lib/journey/types";
import { resolvedCharacterRole } from "@/lib/journey/resolved-role";

/** Display name for the selected capability card. */
export function resolveCapabilityName(capabilityId: string): string {
  if (!capabilityId.trim()) return "";
  return (
    AI_CAPABILITY_CARDS.find((card) => card.id === capabilityId)?.name ?? ""
  );
}

/** Description copy for the selected capability card (final Future card AI function box). */
export function resolveCapabilityDescription(capabilityId: string): string {
  if (!capabilityId.trim()) return "";
  return (
    AI_CAPABILITY_CARDS.find((card) => card.id === capabilityId)?.description ??
    ""
  );
}

/**
 * Future Commons–style narrative paragraph for the final Future card.
 * Persona embedded in a day-to-day story beat — not tension/synthesis copy.
 */
export function buildFutureCommonsNarrative(draft: JourneyDraft): string {
  const location =
    draft.location.trim() ||
    composeLocation(draft.characterCity, draft.characterCountry) ||
    "this place";
  const year = draft.futureYear;
  const name = draft.characterName.trim() || "Someone";
  const role = resolvedCharacterRole(draft.role, draft.roleCustom);
  const artifactName = draft.artifactName.trim() || "an unnamed artifact";
  const dayToDayText = (
    draft.publicPromise.trim() ||
    "reaching for it before the day has fully begun"
  ).replace(/[.!?…]+$/, "");
  const p = pronounsForSelection(draft.characterPronoun);

  return `In ${location}, ${year}, ${name} is ${role}, living inside a future shaped by ${artifactName}. Every day, ${p.subject} ${verbFor(p, "turns", "turn")} to it — ${dayToDayText}.`;
}
