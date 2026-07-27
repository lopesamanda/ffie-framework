import type { FutureQuadrant } from "@/types/future";
import { QUADRANT_LABELS } from "@/types/future";
import type { NarrativeCard } from "@/data/narrative-cards";

export type JourneyStage =
  | "entry"
  | "orientation"
  | "exploration"
  | "reflection"
  | "creation"
  | "output"
  | "discovery";

export const JOURNEY_STAGES: { id: JourneyStage; label: string }[] = [
  { id: "entry", label: "Entry" },
  { id: "orientation", label: "Orientation" },
  { id: "exploration", label: "Exploration" },
  { id: "reflection", label: "Reflection" },
  { id: "creation", label: "Creation" },
  { id: "output", label: "Future Output" },
  { id: "discovery", label: "Discovery" },
];

export type CardHand = {
  risk: NarrativeCard;
  benefit: NarrativeCard;
  trust: NarrativeCard;
  barrier: NarrativeCard;
  transversal: NarrativeCard;
};

export type JourneyDraft = {
  sessionId: string;
  stage: JourneyStage;
  orientationStep: number;
  creationStep: number;
  cardHand: CardHand | null;
  combinedTension: string;
  reflectionText: string;
  characterName: string;
  location: string;
  role: string;
  aiFunction: string;
  desire: string;
  fear: string;
  values: string[];
  artifactName: string;
  publicPromise: string;
  hiddenFunction: string;
  imageDataUrl: string | null;
  position: { x: number; y: number };
  placementJustification: string;
  submitToCommons: boolean;
  submittedId: string | null;
  title: string;
  narrative: string;
};

export const WORKSHOP_VALUES = [
  "diversity",
  "intersectionality",
  "socio-environmental justice",
  "cooperation",
  "horizontality",
  "autonomy",
  "consent",
  "empathy",
  "interoperability",
  "open source",
  "resilience",
] as const;

export const ROLE_SUGGESTIONS = [
  "Software engineer in a startup",
  "Freelance designer",
  "Public sector manager",
  "ESG & sustainability lead",
  "Researcher in ethical AI",
  "Community organizer",
  "Healthcare administrator",
];

export function quadrantFromPosition(x: number, y: number): FutureQuadrant {
  if (x < 0.5 && y >= 0.5) return "techno_optimist";
  if (x >= 0.5 && y >= 0.5) return "feminist_preferred";
  if (x < 0.5 && y < 0.5) return "dominant_dystopian";
  return "fragmented";
}

export function buildTitle(artifactName: string, characterName: string): string {
  if (artifactName.trim()) return artifactName.trim();
  if (characterName.trim()) return `A future for ${characterName.trim()}`;
  return "An unnamed future";
}

export function buildNarrative(draft: JourneyDraft): string {
  const who = draft.characterName || "Someone";
  const where = draft.location || "somewhere in the world";
  const role = draft.role || "a participant in an innovation ecosystem";
  const artifact = draft.artifactName || "an unnamed artifact";

  return `${who} is ${role} in ${where}, 2036. ${artifact} promises ${draft.publicPromise || "something better"}, but ${draft.hiddenFunction || "carries a tension the surface never names"}. The cards drawn — ${draft.combinedTension || "multiple tensions"} — still echo in how this future holds together.`;
}

export function buildReflectionQuestion(draft: JourneyDraft): string {
  return `Where do you feel "${draft.combinedTension.split(" · ")[0] || "this tension"}" in your own work, community, or use of AI?`;
}

export function buildAiImagePrompt(draft: JourneyDraft): string {
  return `Create a diegetic prototype image for a critical design futures workshop.

Persona (2036): ${draft.characterName || "[name]"}, ${draft.role || "[role]"} in ${draft.location || "[location]"}. 
Desire: ${draft.desire || "[desire]"}. Fear: ${draft.fear || "[fear]"}. 
Values: ${draft.values.join(", ") || "[values]"}. 
Central tension: ${draft.combinedTension || "[tension]"}. 

Artifact: ${draft.artifactName || "[artifact name]"} — publicly promises ${draft.publicPromise || "[public promise]"}, but actually ${draft.hiddenFunction || "[hidden function]"}. 

Style: critical design, not glossy tech marketing. No generic AI portraits. Show the artifact in situ within an innovation ecosystem context. Institutional or organizational object, not a personal gadget disconnected from power structures.`;
}

export function formatQuadrantLabel(quadrant: FutureQuadrant): string {
  return QUADRANT_LABELS[quadrant];
}

export function createInitialDraft(sessionId: string): JourneyDraft {
  return {
    sessionId,
    stage: "entry",
    orientationStep: 0,
    creationStep: 0,
    cardHand: null,
    combinedTension: "",
    reflectionText: "",
    characterName: "",
    location: "",
    role: "",
    aiFunction: "",
    desire: "",
    fear: "",
    values: [],
    artifactName: "",
    publicPromise: "",
    hiddenFunction: "",
    imageDataUrl: null,
    position: { x: 0.5, y: 0.5 },
    placementJustification: "",
    submitToCommons: false,
    submittedId: null,
    title: "",
    narrative: "",
  };
}

const STORAGE_KEY = "ffie-journey-draft";

export function loadDraft(): JourneyDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as JourneyDraft) : null;
  } catch {
    return null;
  }
}

export function saveDraft(draft: JourneyDraft) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function clearDraft() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export function getOrCreateSessionId(): string {
  if (typeof window === "undefined") return crypto.randomUUID();
  const existing = loadDraft();
  if (existing?.sessionId) return existing.sessionId;
  return crypto.randomUUID();
}
