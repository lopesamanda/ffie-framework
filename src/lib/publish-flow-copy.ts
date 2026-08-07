import type { FutureQuadrant } from "@/types/future";
import { QUADRANT_MATRIX_LABELS } from "@/types/future";

/** Microcopy aligned to Figma FFIE Design System publish-flow frames. */
export const PUBLISH_FLOW = {
  phaseLabel: "Phase 05 · Share",
  matrix: {
    heading: "Two questions place this future on the Critical Feminist Matrix.",
    recapEyebrow: "What kind of future does your artifact belong to?",
    recapValuesLabel: "Values shaping this artifact",
    systemLogicEyebrow: "System Logic · Horizontal axis",
    powerOrgEyebrow: "Power Organization · Vertical axis",
    systemLogicQuestion:
      "In the world you imagined, does this technology mostly extract something from the people who use it — time, data, autonomy — or give something back?",
    powerOrgQuestion:
      "Who decides how this technology is used in that future — a person or company at the top, or the community that lives with it, together?",
    extractsLabel: "Extracts",
    givesBackLabel: "Gives back",
    centralizedLabel: "Centralized",
    collectiveLabel: "Collective",
    continue: "See your future",
    livePositionLabel: "Live position",
    systemLogicSummary: "System Logic (X)",
    powerOrgSummary: "Power Org. (Y)",
    currentQuadrant: "Current quadrant",
  },
  review: {
    heading: "Last thing.",
    subtitle:
      "Choose who can see your future, then optionally tell others why it matters to you.",
    visibilityEyebrow: "Who can see this?",
    visibilityPublic: "Publish to Future Commons",
    visibilityPublicHint:
      "Discoverable by anyone exploring the Matrix. Can be debated and remixed.",
    visibilityPrivate: "Keep private",
    visibilityPrivateHint: "Only visible to you. You can publish any time later.",
    reflectionEyebrow: "Why does this future matter to you?",
    reflectionOptional: "(optional)",
    skip: "Skip this",
    publish: "Publish",
    consentNote:
      "This artifact is speculative fiction, not personal data. Nothing about you is published — only what you chose to imagine.",
  },
  published: {
    eyebrow: "Published to Future Commons",
    eyebrowPrivate: "Kept private",
    heading: "Your future lives in the Commons.",
    headingPrivate: "Your future is anchored for you.",
    subtitlePublished: (artifactName: string) =>
      `${artifactName} is now discoverable and open to debate. Everything below is what others will find.`,
    subtitlePrivate: (artifactName: string) =>
      `${artifactName} is kept private — nothing is sent for moderation.`,
    viewLive: "View live",
    bringToLife: "Bring to life",
    copyLink: "Copy link",
    download: "Download this future",
    createAnother: "Create another future",
    workWithHeading: "How can you work with this future?",
    anchoredEyebrow: "Anchored in the matrix",
    personEyebrow: "The person behind this future",
    goalLabel: "Goal",
    weaknessLabel: "Weakness",
    makesPossibleLabel: "What this makes possible",
    refuseLabel: "What they refuse to give up",
    cardsDrawnLabel: "Cards drawn for this future",
    valuesLabel: "Values shaping this artifact",
    hiddenFunctionLabel: "Hidden function",
    hiddenFunctionTap: "HIDDEN FUNCTION (tap to reveal)",
    hiddenFunctionRevealed: "revealed — only you see this",
    bringToLifeOptional: "Bring it to life (optional)",
    bringToLifeHint:
      "Copy a ready-made image prompt into your external AI tool — nothing gets uploaded back into FFIE.",
  },
} as const;

export function quadrantDisplayName(id: FutureQuadrant): string {
  return QUADRANT_MATRIX_LABELS[id];
}

/** Short anchored copy shown beside the published matrix — Figma node 61-2670. */
export const QUADRANT_ANCHORED_SUMMARIES: Record<FutureQuadrant, string> = {
  feminist_preferred:
    "This future organizes power collectively and gives back to its users. The tension lives in making it structurally durable over time.",
  techno_optimist:
    "This future frames care on the surface while extractive logic still runs underneath. The tension lives in closing the gap between promise and practice.",
  dominant_dystopian:
    "This future concentrates power and extracts without consent. The tension lives in whether anyone can still move it from default.",
  fragmented:
    "This future challenges extraction without collective infrastructure to sustain it. The tension lives in making resistance shared, not solitary.",
};
