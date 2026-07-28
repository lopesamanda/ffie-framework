import type {
  FutureQuadrant,
  PowerPosition,
  FutureCountry,
} from "@/types/future";
import { QUADRANT_LABELS } from "@/types/future";
import type { NarrativeCard } from "@/data/narrative-cards";
import type { CharacterGenderId, ArtifactTypeId } from "@/lib/journey/character-options";
import type { PersonaSector } from "@/lib/journey/persona-sectors";
import {
  artifactTypePhrase,
  composeLocation,
  GENDER_OPTIONS,
} from "@/lib/journey/character-options";
import type { CharacterPronounId } from "@/lib/journey/embody-flow";
import type { AiCapabilityPowerId } from "@/lib/journey/ai-capability-clusters";
import { composeHiddenFunction } from "@/lib/journey/hidden-function";
import { buildFutureCommonsNarrative } from "@/lib/journey/future-commons-narrative";
import { getFutureHorizonYear } from "@/lib/journey/future-horizon";
import { pronounsForSelection } from "@/lib/journey/character-pronouns";

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
  /** 0 = Likert placement, 1 = matrix reveal & share */
  outputStep: number;
  /** Sub-step within Embody the future (0–3). */
  embodySubStep: number;
  cardHand: CardHand | null;
  combinedTension: string;
  /** Deterministic Oracle Draw synthesis — main sentence (card names). */
  drawSynthesis: string;
  /** Secondary line listing card tensions. */
  drawSynthesisTensions: string;
  reflectionText: string;
  characterName: string;
  characterAge: string;
  characterGender: CharacterGenderId | "";
  characterPronoun: CharacterPronounId | "";
  characterRaceEthnicity: string;
  raceSelfDescribe: string;
  characterCity: string;
  characterCountry: FutureCountry | "";
  location: string;
  role: string;
  roleCustom: string;
  personaSector: PersonaSector | "";
  personaSectorCustom: string;
  aiFunction: string;
  tradeoffLoss: string;
  desire: string;
  fear: string;
  values: string[];
  artifactName: string;
  artifactType: ArtifactTypeId | "";
  /** Problem or tension the artifact responds to (references embody fear). */
  artifactProblemTension: string;
  /** Selected AI Power on Problem & capability step. */
  selectedAiPower: AiCapabilityPowerId | "";
  /** Selected capability card id under the chosen Power. */
  selectedAiCapability: string;
  /** Sub-step within Day to day (0 = main promise, 1 = reflective follow-up). */
  dayToDaySubStep: number;
  /** Reflective follow-up after the main day-to-day description. */
  dayToDayReflection: string;
  /** Day-to-day description after choosing a capability. */
  publicPromise: string;
  /** Optional one-line pitch — what the artifact claims to deliver. */
  artifactGoalPitch: string;
  hiddenFunction: string;
  /** Value chip selected as "pushed too far" on Hidden Function step. */
  hiddenFunctionExtremeValue: string;
  /** Sentence completion after the extreme-value prompt. */
  hiddenFunctionCompletion: string;
  artifactValues: string[];
  artifactValueOther: string;
  /** Optional closing reflection on the final Future card. */
  closingReflection: string;
  /** System Logic Likert (Q1) — Extracts ↔ Gives back */
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
  /** Horizon year for storage (current year + 10); user-facing copy uses FUTURE_HORIZON_LABEL. */
  futureYear: number;
};

export { CHARACTER_VALUES } from "@/lib/journey/character-options";

/** @deprecated Use ROLE_OPTIONS from character-options */
export const ROLE_SUGGESTIONS = [
  "Startup founder",
  "VC/investor",
  "Hub coordinator",
  "Freelancer",
  "Peripheral/grassroots worker",
  "Researcher",
  "Public sector manager",
];

/** @deprecated Use CHARACTER_VALUES from character-options */
export const WORKSHOP_VALUES = [
  "Cooperation",
  "Horizontality",
  "Diversity",
  "Autonomy",
  "Intersectionality",
  "Consent",
  "Socio-environmental Justice",
  "Decentralization",
  "Resilience",
  "Empathy",
  "Interoperability",
  "Open Source",
] as const;

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
  return buildFutureCommonsNarrative(draft);
}

export function buildReflectionQuestion(draft: JourneyDraft): string {
  return `Where do you feel "${draft.combinedTension.split(" · ")[0] || "this tension"}" in your own work, community, or use of AI?`;
}

export function buildAiImagePrompt(draft: JourneyDraft): string {
  const location =
    draft.location.trim() ||
    composeLocation(draft.characterCity, draft.characterCountry) ||
    "[location]";
  const characterName = draft.characterName.trim() || "[character name]";
  const characterRole = draft.role.trim() || "[character role]";
  const characterDesire = draft.desire.trim() || "[character desire]";
  const characterFear = draft.fear.trim() || "[character fear]";
  const artifactName = draft.artifactName.trim() || "[artifact name]";
  const artifactPublicPromise =
    draft.artifactGoalPitch.trim() ||
    draft.publicPromise.trim() ||
    "[artifact public promise]";
  const artifactDayToDay =
    draft.publicPromise.trim() || "[artifact day-to-day behavior]";
  const artifactHiddenFunction =
    composeHiddenFunction(draft) ||
    draft.hiddenFunction.trim() ||
    "[artifact hidden function]";
  const artifactType = artifactTypePhrase(draft.artifactType);
  const p = pronounsForSelection(draft.characterPronoun);

  const benefitCardName =
    draft.cardHand?.benefit.name.trim() || "[benefit card name]";
  const riskCardName = draft.cardHand?.risk.name.trim() || "[risk card name]";
  const barrierCardName =
    draft.cardHand?.barrier.name.trim() || "[barrier card name]";
  const trustCardName =
    draft.cardHand?.trust.name.trim() || "[trust card name]";

  return `Act as a Speculative Technology Prototyper working within a feminist, decolonial design-fiction methodology. You are visualizing a diegetic artifact from ${location}, ${draft.futureYear} — not a generic sci-fi object, but something grounded in the specific tensions below.

Context: this artifact exists in a world shaped by ${benefitCardName}, ${riskCardName}, ${barrierCardName}, and ${trustCardName}, and by the material/ecological cost named by the Environmental Impact card. It belongs to ${characterName}, a ${characterRole}, whose deepest hope is ${characterDesire} and whose deepest fear is ${characterFear}.

The artifact, ${artifactName}, is ${artifactType}. Publicly, it is presented as: ${artifactPublicPromise}. Day to day, it ${artifactDayToDay}. In reality, it also does this, quietly: ${artifactHiddenFunction}.

Your task: produce two visual moments of the same artifact, not one.
1. THE PROMISE — how this artifact is advertised, marketed, or presented to ${characterName} and people like ${p.object}. This should look aspirational and polished, exactly how the institution behind it wants it seen.
2. THE HIDDEN FUNCTION — what is actually happening underneath, at the exact moment ${characterName} uses it. This should feel like something noticed almost by accident, not a dramatic reveal.

Style guidance: avoid generic cyberpunk or dystopian sci-fi clichés (no neon holograms, no chrome robots). This is ${location} in ${draft.futureYear} — grounded, plausible, and specific to that place, not a placeless future. Favor a documentary or quasi-photographic register over a glossy product-render or advertisement aesthetic, so the image reads as evidence of something that could really exist, not a marketing mockup.`;
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
    outputStep: 0,
    embodySubStep: 0,
    cardHand: null,
    combinedTension: "",
    drawSynthesis: "",
    drawSynthesisTensions: "",
    reflectionText: "",
    characterName: "",
    characterAge: "",
    characterGender: "",
    characterPronoun: "",
    characterRaceEthnicity: "",
    raceSelfDescribe: "",
    characterCity: "",
    characterCountry: "",
    location: "",
    role: "",
    roleCustom: "",
    personaSector: "",
    personaSectorCustom: "",
    aiFunction: "",
    tradeoffLoss: "",
    desire: "",
    fear: "",
    values: [],
    artifactName: "",
    artifactType: "",
    artifactProblemTension: "",
    selectedAiPower: "",
    selectedAiCapability: "",
    dayToDaySubStep: 0,
    dayToDayReflection: "",
    publicPromise: "",
    artifactGoalPitch: "",
    hiddenFunction: "",
    hiddenFunctionExtremeValue: "",
    hiddenFunctionCompletion: "",
    artifactValues: [],
    artifactValueOther: "",
    imageDataUrl: null,
    closingReflection: "",
    systemLogicScore: null,
    powerOrgScore: null,
    position: { x: 0, y: 0 },
    powerPosition: "marginalized",
    placementJustification: "",
    submitToCommons: false,
    submittedId: null,
    title: "",
    narrative: "",
    futureYear: getFutureHorizonYear(),
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
      characterGender: parsed.characterGender ?? "",
      characterPronoun: parsed.characterPronoun ?? "",
      embodySubStep: parsed.embodySubStep ?? 0,
      outputStep: parsed.outputStep ?? 0,
      characterAge: parsed.characterAge ?? "",
      characterRaceEthnicity: parsed.characterRaceEthnicity ?? "",
      raceSelfDescribe: parsed.raceSelfDescribe ?? "",
      characterCity: parsed.characterCity ?? "",
      characterCountry: parsed.characterCountry ?? "",
      roleCustom: parsed.roleCustom ?? "",
      artifactType: parsed.artifactType ?? "",
      artifactProblemTension: parsed.artifactProblemTension ?? "",
      dayToDaySubStep: parsed.dayToDaySubStep ?? 0,
      dayToDayReflection: parsed.dayToDayReflection ?? "",
      artifactValues: parsed.artifactValues ?? [],
      artifactValueOther: parsed.artifactValueOther ?? "",
      location:
        parsed.location ??
        composeLocation(
          parsed.characterCity ?? "",
          parsed.characterCountry ?? "",
        ),
      tradeoffLoss: parsed.tradeoffLoss ?? "",
      selectedAiPower: parsed.selectedAiPower ?? "",
      selectedAiCapability: parsed.selectedAiCapability ?? "",
      values: parsed.values ?? [],
      futureYear: parsed.futureYear ?? getFutureHorizonYear(),
      drawSynthesis: parsed.drawSynthesis ?? "",
      drawSynthesisTensions: parsed.drawSynthesisTensions ?? "",
      personaSector: parsed.personaSector ?? "",
      personaSectorCustom: parsed.personaSectorCustom ?? "",
      closingReflection: parsed.closingReflection ?? "",
      hiddenFunctionExtremeValue: parsed.hiddenFunctionExtremeValue ?? "",
      hiddenFunctionCompletion: parsed.hiddenFunctionCompletion ?? "",
      artifactGoalPitch: parsed.artifactGoalPitch ?? "",
    };
  } catch {
    return null;
  }
}

export function genderLabelForDraft(draft: JourneyDraft): string {
  return (
    GENDER_OPTIONS.find((option) => option.id === draft.characterGender)
      ?.label ?? ""
  );
}

export function raceEthnicityForDraft(draft: JourneyDraft): string {
  if (draft.characterRaceEthnicity === "Self-describe") {
    return draft.raceSelfDescribe.trim();
  }
  return draft.characterRaceEthnicity.trim();
}

export function syncLocationFromParts(draft: JourneyDraft): string {
  return composeLocation(draft.characterCity, draft.characterCountry);
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
