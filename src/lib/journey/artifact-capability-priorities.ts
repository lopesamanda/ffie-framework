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
  object: [
    "biometric-body-data",
    "realtime-monitoring",
    "task-automation",
    "generative-design",
  ],
  app: [
    "personalization-recommendation",
    "language-conversation",
    "image-video-generation",
    "identity-data-fusion",
    "code-generation-automation",
    "data-classification-clustering",
    "content-moderation-filtering",
  ],
  service: [
    "language-conversation",
    "predictive-scoring",
    "task-automation",
    "code-generation-automation",
    "realtime-monitoring",
  ],
  policy: [
    "predictive-scoring",
    "identity-data-fusion",
    "realtime-monitoring",
    "data-classification-clustering",
    "content-moderation-filtering",
  ],
  narrative: [
    "image-video-generation",
    "language-conversation",
    "personalization-recommendation",
    "content-moderation-filtering",
    "data-classification-clustering",
  ],
  agent: [
    "task-automation",
    "language-conversation",
    "predictive-scoring",
    "identity-data-fusion",
    "code-generation-automation",
    "autonomous-planning-execution",
    "negotiation-transacting",
    "persistent-memory-modeling",
    "realtime-monitoring",
    "algorithmic-management-oversight",
  ],
};

export const AGENT_EXCLUSIVE_CAPABILITY_IDS = new Set(
  AI_CAPABILITY_CARDS.filter((card) => card.agentOnly).map((card) => card.id),
);

function cardsVisibleForArtifactType(
  artifactType: ArtifactTypeId | "",
): AiCapabilityCard[] {
  if (artifactType === "agent") {
    return [...AI_CAPABILITY_CARDS];
  }
  return AI_CAPABILITY_CARDS.filter((card) => !card.agentOnly);
}

export function orderCapabilityCardsForArtifact(
  artifactType: ArtifactTypeId | "",
): { prioritized: AiCapabilityCard[]; other: AiCapabilityCard[] } {
  const visible = cardsVisibleForArtifactType(artifactType);

  if (!artifactType) {
    return { prioritized: [], other: visible };
  }

  const priorityIds = ARTIFACT_CAPABILITY_PRIORITY[artifactType] ?? [];
  const byId = new Map(visible.map((card) => [card.id, card]));

  const prioritized = priorityIds
    .map((id) => byId.get(id))
    .filter((card): card is AiCapabilityCard => card != null);

  const prioritizedSet = new Set(prioritized.map((card) => card.id));
  const other = visible.filter((card) => !prioritizedSet.has(card.id));

  return { prioritized, other };
}

export function getVisibleCardsForArtifact(
  artifactType: ArtifactTypeId | "",
): AiCapabilityCard[] {
  return cardsVisibleForArtifactType(artifactType);
}
