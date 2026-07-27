import type { AiCapabilityCard } from "@/data/ai-capability-cards";

export type AiCapabilityCluster = {
  id: string;
  label: string;
  cardIds: string[];
};

/** Thematic groupings for the full capability picker (15 cards). */
export const AI_CAPABILITY_CLUSTERS: AiCapabilityCluster[] = [
  {
    id: "understanding-people",
    label: "Understanding People",
    cardIds: [
      "personalization-recommendation",
      "biometric-body-data",
      "predictive-scoring",
      "data-classification-clustering",
      "persistent-memory-modeling",
    ],
  },
  {
    id: "communicating-creating",
    label: "Communicating & Creating",
    cardIds: [
      "language-conversation",
      "image-video-generation",
      "generative-design",
      "content-moderation-filtering",
    ],
  },
  {
    id: "acting-automating",
    label: "Acting & Automating",
    cardIds: [
      "task-automation",
      "code-generation-automation",
      "autonomous-planning-execution",
      "negotiation-transacting",
    ],
  },
  {
    id: "tracking-verifying",
    label: "Tracking & Verifying",
    cardIds: ["realtime-monitoring", "identity-data-fusion"],
  },
];

export function groupCardsByCluster(
  cards: AiCapabilityCard[],
): { label: string; cards: AiCapabilityCard[] }[] {
  const byId = new Map(cards.map((card) => [card.id, card]));
  const assigned = new Set<string>();

  const groups = AI_CAPABILITY_CLUSTERS.map((cluster) => {
    const clusterCards = cluster.cardIds
      .map((id) => byId.get(id))
      .filter((card): card is AiCapabilityCard => card != null);
    clusterCards.forEach((card) => assigned.add(card.id));
    return { label: cluster.label, cards: clusterCards };
  }).filter((group) => group.cards.length > 0);

  const unclustered = cards.filter((card) => !assigned.has(card.id));
  if (unclustered.length > 0) {
    groups.push({ label: "Other capabilities", cards: unclustered });
  }

  return groups;
}
