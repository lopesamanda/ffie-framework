import type { JourneyStage } from "@/lib/journey/types";

export type StageMeta = {
  phaseLabel: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  /** Top accent for portal-style stage shell (design system). */
  accentColor: string;
};

/** Maps 7 journey stages → 5 compact timeline phases (Figma PhaseTimelineCompact). */
export function getPhaseIndex(stage: JourneyStage): number {
  if (stage === "entry" || stage === "orientation") return 1;
  if (stage === "exploration") return 2;
  if (stage === "reflection") return 3;
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
  orientation: {
    phaseLabel: "Orientation",
    eyebrow: "The draw",
    title: "Five cards will shape your future.",
    subtitle:
      "Each card carries a structural tension mapped during a real research process — studying how AI is actually being used across today's innovation ecosystems. You'll draw one card from each register, plus the Environmental Impact card, which applies to every future by default. Your combination can generate a different future each time. Need inspiration? Browse Research Findings anytime via the link below.",
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
    phaseLabel: "Reflection",
    eyebrow: "Oracle Draw",
    title: "Your hand.",
    subtitle:
      "One card from each category, plus the Environmental Impact lens — always applied, never drawn.",
    accentColor: "#1a2870",
  },
  creation: {
    phaseLabel: "Creation",
    eyebrow: "Build the future",
    title: "Give it a body.",
    subtitle:
      "Character, machine, artifact — then two questions place it on the matrix.",
    accentColor: "#c22b7a",
  },
  output: {
    phaseLabel: "Your Future",
    eyebrow: "Your future",
    title: "It exists now.",
    accentColor: "#6e52c4",
  },
  discovery: {
    phaseLabel: "Discovery",
    eyebrow: "Future Commons",
    title: "Your future joins others.",
    subtitle:
      "These futures don't agree with each other. That's the point. Wander among them.",
    accentColor: "#2c8a52",
  },
};
