import type { ArtifactTypeId } from "@/lib/journey/character-options";
import {
  AI_CAPABILITY_CARDS,
  type AiCapabilityCard,
} from "@/data/ai-capability-cards";

/** Capability cards surfaced first for each artifact type (Create day-to-day step). */
export const ARTIFACT_CAPABILITY_PRIORITY: Record<
  ArtifactTypeId,
  string[]
> = {
  object: ["biometric-body-data", "realtime-monitoring", "task-automation"],
  app: [
    "personalization-recommendation",
    "language-conversation",
    "image-video-generation",
    "identity-data-fusion",
  ],
  service: [
    "language-conversation",
    "predictive-scoring",
    "task-automation",
  ],
  policy: [
    "predictive-scoring",
    "identity-data-fusion",
    "realtime-monitoring",
  ],
  narrative: [
    "image-video-generation",
    "language-conversation",
    "personalization-recommendation",
  ],
  agent: [
    "task-automation",
    "language-conversation",
    "predictive-scoring",
    "identity-data-fusion",
  ],
};

export function orderCapabilityCardsForArtifact(
  artifactType: ArtifactTypeId | "",
): { prioritized: AiCapabilityCard[]; other: AiCapabilityCard[] } {
  if (!artifactType) {
    return { prioritized: [], other: [...AI_CAPABILITY_CARDS] };
  }

  const priorityIds = ARTIFACT_CAPABILITY_PRIORITY[artifactType] ?? [];
  const byId = new Map(AI_CAPABILITY_CARDS.map((card) => [card.id, card]));

  const prioritized = priorityIds
    .map((id) => byId.get(id))
    .filter((card): card is AiCapabilityCard => card != null);

  const prioritizedSet = new Set(prioritized.map((card) => card.id));
  const other = AI_CAPABILITY_CARDS.filter((card) => !prioritizedSet.has(card.id));

  return { prioritized, other };
}
