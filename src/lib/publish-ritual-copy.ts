/** Shared microcopy for the Materialize publish ritual (Preview → Place → Reflect → Published). */

export const PUBLISH_RITUAL_STEPS = [
  "Preview",
  "Place",
  "Reflect",
  "Published",
] as const;

export type PublishRitualStepIndex = 0 | 1 | 2 | 3;

export const PUBLISH_RITUAL = {
  livePreview: {
    heading: "Look at it whole.",
    subtitle: (artifactName: string) =>
      `This is how ${artifactName || "your artifact"} will read in the Future Commons — persona, artifact, tensions, and values together.`,
    personaLine: (name: string, role: string) =>
      `Imagined by ${name || "someone"}, ${role || "a future-maker"}.`,
    continue: "Continue →",
  },
  calibration: {
    heading: "Place it on the map.",
    subtitle:
      "Two questions situate your future on the Living Cartography. Drag each slider anywhere along the axis — the live position updates as you go.",
    livePositionLabel: "Live position",
    summaryLabel: "Placement summary",
    systemLogicLabel: "System Logic",
    powerOrgLabel: "Power Organization",
    quadrantLabel: "Current quadrant",
    continue: "See your future →",
  },
  reflect: {
    heading: "One last thing.",
    subtitle:
      "Choose who can see this future, and leave a reflection if you want — or skip it.",
    visibilityPublic: "Publish to Future Commons",
    visibilityPublicHint:
      "Others can find it on the Living Cartography after moderation.",
    visibilityPrivate: "Keep private",
    visibilityPrivateHint:
      "Anchored for you only — nothing is sent for review.",
    reflectionLabel: "Reflection (optional)",
    reflectionPlaceholder: "A sentence or two is enough.",
    skip: "Skip this",
    consentNote:
      "This artifact is speculative fiction, not personal data. Nothing about you is published — only what you chose to imagine.",
    publish: "Publish →",
    publishing: "Publishing…",
  },
  confirmation: {
    eyebrow: "Published to Future Commons",
    heading: "Published.",
    subtitlePublished: (artifactName: string) =>
      `${artifactName || "Your future"} now lives in the Commons — one more coordinate on the map of futures being contested and imagined.`,
    subtitlePrivate: (artifactName: string) =>
      `${artifactName || "Your future"} is kept private — anchored for you, not sent for moderation.`,
    viewLive: "View it live",
    bringToLife: "Bring it to life",
    copyShareLink: "Copy share link",
    download: "Download this future",
    createAnother: "Create another future",
    workWithHeading: "How can you work with this future?",
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
