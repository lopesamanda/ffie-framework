import type { AiCapabilityCard } from "@/data/ai-capability-cards";
import { AI_CAPABILITY_CARDS } from "@/data/ai-capability-cards";

export type AiCapabilityPowerId =
  | "power-to-know"
  | "power-to-speak-make"
  | "power-to-act"
  | "power-to-watch";

export type AiCapabilityPower = {
  id: AiCapabilityPowerId;
  label: string;
  cardIds: string[];
};

/** Power Organization groupings for the capability picker (15 cards). */
export const AI_CAPABILITY_POWERS: AiCapabilityPower[] = [
  {
    id: "power-to-know",
    label: "Power to Know",
    cardIds: [
      "personalization-recommendation",
      "biometric-body-data",
      "predictive-scoring",
      "data-classification-clustering",
      "persistent-memory-modeling",
    ],
  },
  {
    id: "power-to-speak-make",
    label: "Power to Speak & Make",
    cardIds: [
      "language-conversation",
      "image-video-generation",
      "generative-design",
    ],
  },
  {
    id: "power-to-act",
    label: "Power to Act",
    cardIds: [
      "task-automation",
      "code-generation-automation",
      "autonomous-planning-execution",
      "negotiation-transacting",
    ],
  },
  {
    id: "power-to-watch",
    label: "Power to Watch",
    cardIds: [
      "realtime-monitoring",
      "identity-data-fusion",
      "content-moderation-filtering",
    ],
  },
];

export type AiCapabilityPowerGroup = {
  id: AiCapabilityPowerId;
  label: string;
  cards: AiCapabilityCard[];
};

export function groupCardsByPower(
  cards: AiCapabilityCard[],
): AiCapabilityPowerGroup[] {
  const byId = new Map(cards.map((card) => [card.id, card]));
  const assigned = new Set<string>();

  const groups = AI_CAPABILITY_POWERS.map((power) => {
    const powerCards = power.cardIds
      .map((id) => byId.get(id))
      .filter((card): card is AiCapabilityCard => card != null);
    powerCards.forEach((card) => assigned.add(card.id));
    return { id: power.id, label: power.label, cards: powerCards };
  }).filter((group) => group.cards.length > 0);

  const ungrouped = cards.filter((card) => !assigned.has(card.id));
  if (ungrouped.length > 0) {
    groups.push({
      id: "power-to-watch",
      label: "Other capabilities",
      cards: ungrouped,
    });
  }

  return groups;
}

export function cardsForPower(powerId: AiCapabilityPowerId): AiCapabilityCard[] {
  const power = AI_CAPABILITY_POWERS.find((entry) => entry.id === powerId);
  if (!power) return [];
  const byId = new Map(AI_CAPABILITY_CARDS.map((card) => [card.id, card]));
  return power.cardIds
    .map((id) => byId.get(id))
    .filter((card): card is AiCapabilityCard => card != null);
}

export function formatPersonaValuesList(values: string[]): string {
  const picked = values.filter(Boolean);
  if (picked.length === 0) return "the values they carry";
  if (picked.length === 1) return picked[0]!;
  if (picked.length === 2) return `${picked[0]} and ${picked[1]}`;
  return `${picked.slice(0, -1).join(", ")}, and ${picked[picked.length - 1]}`;
}

/** @deprecated Use groupCardsByPower */
export const groupCardsByCluster = groupCardsByPower;

/** Static day-to-day textarea placeholders — one per Power, not per card. */
export const DAY_TO_DAY_POWER_PLACEHOLDERS: Record<AiCapabilityPowerId, string> =
  {
    "power-to-know":
      "e.g., what does it notice, track, or predict about her each day — and how does that shape what it shows her?",
    "power-to-speak-make":
      "e.g., what does it generate or say on her behalf — and how often does she use it?",
    "power-to-act":
      "e.g., what does it do automatically, without her asking each time?",
    "power-to-watch":
      "e.g., what does it monitor, and who sees that information?",
  };

/** @deprecated Use AI_CAPABILITY_POWERS */
export const AI_CAPABILITY_CLUSTERS = AI_CAPABILITY_POWERS;
