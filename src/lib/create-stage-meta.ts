import type { JourneyStage } from "@/lib/journey/types";

export type StageMeta = {
  phaseLabel: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
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
    eyebrow: "Somewhere between Brazil and Portugal",
    title: "A future is taking shape.",
    subtitle:
      "This is not a survey. There are no right answers. You will draw cards, inhabit a life, and build something that does not yet exist.",
  },
  orientation: {
    phaseLabel: "Orientation",
    eyebrow: "The draw",
    title: "Four cards will shape your future.",
    subtitle:
      "Each card carries a structural tension drawn from real conditions — not hypothetical scenarios. You will draw one from each register. Together, they are the soil your future grows from.",
  },
  exploration: {
    phaseLabel: "Exploration",
    eyebrow: "Futures already imagined",
    title: "Others have been here before you.",
    subtitle:
      "Three diegetic prototypes from the thesis — from the same 19-card deck you are about to use.",
  },
  reflection: {
    phaseLabel: "Reflection",
    eyebrow: "Oracle Draw",
    title: "Your hand.",
    subtitle:
      "One card from each category, plus the Environmental Impact lens — always applied, never drawn.",
  },
  creation: {
    phaseLabel: "Creation",
    eyebrow: "Build the future",
    title: "Give it a body.",
    subtitle:
      "Character, machine, artifact — then two questions place it on the matrix.",
  },
  output: {
    phaseLabel: "Your Future",
    eyebrow: "Your future",
    title: "It exists now.",
    subtitle: undefined,
  },
  discovery: {
    phaseLabel: "Discovery",
    eyebrow: "Future Commons",
    title: "Your future joins others.",
    subtitle:
      "These futures don't agree with each other. That's the point. Wander among them.",
  },
};
