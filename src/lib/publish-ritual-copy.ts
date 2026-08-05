/** Shared microcopy for the Anchor a Future publish ritual. */

export const PUBLISH_RITUAL = {
  livePreview: {
    heading: "Before you anchor this future, look at it whole.",
    subtitle: (artifactName: string) =>
      `This is how ${artifactName || "your artifact"} will appear in the Commons.`,
    continue: "Continue",
  },
  calibration: {
    heading: "Calibrate where this future sits.",
    subtitle: "Two questions place it on the Living Cartography.",
    continue: "See your future",
  },
  groundIt: {
    heading: "Ground it before you let it go.",
    visibilityPublic: "Anchor to the Commons",
    visibilityPrivate: "Keep it close",
    attributionLabel: "Situated Knowledge (optional)",
    attributionHint:
      "Is this future grounded in a specific place, community, or lineage of knowledge? Name it here, if you'd like.",
    attributionPlaceholder: "e.g., a workshop in Recife, a conversation with…",
    consentNote:
      "This artifact is speculative fiction, not personal data. Nothing about you is published — only what you chose to imagine.",
    skip: "Skip this",
    continue: "Continue",
  },
  anchor: {
    heading: "Anchor this future?",
    subtitle: (artifactName: string) =>
      `Once anchored, ${artifactName || "your future"} joins the Commons — a shared, living cartography others can find, sit with, and respond to.`,
    primary: "Anchor it",
    secondary: "Wait, let me look again",
    holding: "Anchoring…",
  },
  confirmation: {
    heading: "Anchored.",
    subtitlePublished: (artifactName: string) =>
      `${artifactName || "Your future"} now lives in the Commons — one more coordinate on the map of futures being contested and imagined.`,
    subtitlePrivate: (artifactName: string) =>
      `${artifactName || "Your future"} is anchored — kept close, not sent for moderation.`,
    viewCommons: "View it in the Commons",
    bringToLife: "Bring it to life",
    shareExternal: "Share externally",
  },
} as const;

export const HOME_MANIFESTO = {
  lines: [
    "AI is already writing the future. FFIE is where you ask: for whom, and at what cost.",
    "Draw the tension. Give it a body. Watch the trade-off show its price.",
    "Not a prediction — a future you can hold, question, and put down.",
  ],
  primaryCta: "Start a simulation",
} as const;

export const EXPLORE_COPY = {
  heading: "Explore",
  subtitle:
    "The Living Cartography — where power, care, and extraction intersect.",
  filtersLabel: "Filters",
  filtersTooltip:
    "Also known as Intersectional Lenses — adjusting the gaze across system logic and power distribution.",
  sortOptions: ["Newest", "By quadrant", "By register"] as const,
} as const;
