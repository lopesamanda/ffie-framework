import type { JourneyStage } from "@/lib/journey/types";

export type StageMeta = {
  phaseLabel: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Top accent for portal-style stage shell (design system). */
  accentColor: string;
};

/** Maps journey stages → legacy 5-segment index (Explore path only). */
export function getPhaseIndex(stage: JourneyStage): number {
  if (stage === "entry" || stage === "choose") return 1;
  if (
    stage === "orientation" ||
    stage === "reflection" ||
    stage === "situate"
  ) {
    return 2;
  }
  if (stage === "exploration") return 2;
  if (stage === "creation") return 4;
  return 5;
}

export const STAGE_META: Record<JourneyStage, StageMeta> = {
  entry: {
    phaseLabel: "Entry",
    eyebrow: "",
    title: "A future is taking shape.",
    accentColor: "#6e52c4",
  },
  choose: {
    phaseLabel: "Choose",
    eyebrow: "CHOOSE",
    title: "Choose your territory",
    subtitle: "Where do you want to explore what AI could change?",
    accentColor: "#c48a1a",
  },
  orientation: {
    phaseLabel: "Draw",
    eyebrow: "DRAW",
    title: "Draw the tensions",
    subtitle:
      "Every future carries contradictions. Draw the ones that will shape yours.",
    accentColor: "#c8472a",
  },
  exploration: {
    phaseLabel: "Exploration",
    eyebrow: "Futures already imagined",
    title: "Others have been here before you.",
    subtitle:
      "Three diegetic prototypes from the thesis — from the same 19-card deck you are about to use.",
    accentColor: "#c48a1a",
  },
  reflection: {
    phaseLabel: "Draw",
    eyebrow: "DRAW",
    title: "Draw the tensions",
    subtitle:
      "One card from each category, plus the Environmental Impact lens — always applied, never drawn.",
    accentColor: "#1a2870",
  },
  situate: {
    phaseLabel: "Situate",
    eyebrow: "SITUATE",
    title: "Place your future",
    accentColor: "#6e52c4",
  },
  creation: {
    phaseLabel: "Creation",
    eyebrow: "EMBODY",
    title: "Give them a life.",
    subtitle:
      "Give them a name, a role, and a life inside the territory you chose.",
    accentColor: "#c22b7a",
  },
  output: {
    phaseLabel: "Share",
    eyebrow: "SHARE",
    title: "Where does it belong?",
    accentColor: "#6e52c4",
  },
  discovery: {
    phaseLabel: "Share",
    eyebrow: "SHARE",
    title: "Your future joins others.",
    subtitle:
      "These futures don't agree with each other. That's the point. Wander among them.",
    accentColor: "#2c8a52",
  },
};
