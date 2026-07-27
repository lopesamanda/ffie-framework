import type {
  FutureQuadrant,
  PowerPosition,
} from "@/types/future";
import { QUADRANT_LABELS } from "@/types/future";
import type { NarrativeCard } from "@/data/narrative-cards";

/** 5-point Likert used for automated matrix placement. */
export type LikertScore = 1 | 2 | 3 | 4 | 5;

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
  /** System Logic Likert (Q1) — Extrai ↔ Devolve */
  systemLogicScore: LikertScore | null;
  /** Power Organization Likert (Q2) — centralizada ↔ coletiva */
  powerOrgScore: LikertScore | null;
  /**
   * Matrix coords in signed space [-1, 1]:
   * x: Extractive (−) ↔ Emancipatory (+)
   * y: Hierarchical (−) ↔ Collective Care (+)
   * Matches Critical Feminist Matrix axes (Figma + FutureMatrix).
   */
  position: { x: number; y: number };
  powerPosition: PowerPosition;
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

/**
 * Quadrant from signed coords (−1…1), matching Figma CriticalFeministMatrix:
 * TL techno_optimist · TR feminist_preferable · BL dominant_dystopian · BR fragmented
 *
 * Journey / Future Commons Likert placement always uses signed space.
 * Research Findings keep explicit `quadrant` on each seed entry (unit 0…1 positions).
 */
export function quadrantFromPosition(x: number, y: number): FutureQuadrant {
  if (x < 0 && y >= 0) return "techno_optimist";
  if (x >= 0 && y >= 0) return "feminist_preferred";
  if (x < 0 && y < 0) return "dominant_dystopian";
  return "fragmented";
}

/** Map signed [−1,1] → unit [0,1] for SVG plotting alongside research-findings seed. */
export function signedToUnit(x: number, y: number): { x: number; y: number } {
  return { x: (x + 1) / 2, y: (y + 1) / 2 };
}

/** Likert 1–5 → signed −1.0 … 1.0 (1→−1, 3→0, 5→1). */
export function likertToSigned(score: LikertScore): number {
  return (score - 3) / 2;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function jitter(amount = 0.05) {
  return (Math.random() * 2 - 1) * amount;
}

/**
 * Derive matrix position, quadrant, and power_position from the two Likert answers.
 * power_position: Q2 1–2 (centralized) → hegemonic; 3–5 (collective) → marginalized
 * — matches seed polarity (sole hegemonic entry sits on the hierarchical side).
 */
export function computePlacementFromLikert(
  systemLogic: LikertScore,
  powerOrg: LikertScore,
): {
  position: { x: number; y: number };
  quadrant: FutureQuadrant;
  powerPosition: PowerPosition;
  placementJustification: string;
} {
  const x = clamp(likertToSigned(systemLogic) + jitter(), -1, 1);
  const y = clamp(likertToSigned(powerOrg) + jitter(), -1, 1);
  const powerPosition: PowerPosition =
    powerOrg <= 2 ? "hegemonic" : "marginalized";

  return {
    position: { x, y },
    quadrant: quadrantFromPosition(x, y),
    powerPosition,
    placementJustification: [
      `System logic (Extrai→Devolve): ${systemLogic}/5.`,
      `Power organization (centralizada→coletiva): ${powerOrg}/5.`,
    ].join(" "),
  };
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
    systemLogicScore: null,
    powerOrgScore: null,
    position: { x: 0, y: 0 },
    powerPosition: "marginalized",
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
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<JourneyDraft>;
    if (!parsed.sessionId) return null;
    return {
      ...createInitialDraft(parsed.sessionId),
      ...parsed,
      systemLogicScore: parsed.systemLogicScore ?? null,
      powerOrgScore: parsed.powerOrgScore ?? null,
      powerPosition: parsed.powerPosition ?? "marginalized",
      position: parsed.position ?? { x: 0, y: 0 },
      values: parsed.values ?? [],
    };
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
