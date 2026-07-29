import type { JourneyStage } from "@/lib/journey/types";
import { EMBODY_SCREEN_COUNT } from "@/lib/journey/embody-flow";

export const CREATE_FFIE_PHASES = [
  "UNDERSTAND",
  "SITUATE",
  "EMBODY",
  "MATERIALIZE",
  "SHARE",
] as const;

export type CreateFfiePhase = (typeof CREATE_FFIE_PHASES)[number];

export type CreatePhaseContext = {
  stage: JourneyStage;
  creationStep: number;
  embodySubStep: number;
  oracleDrawIndex: number;
  outputStep: number;
};

export function getCreateFfiePhase(ctx: CreatePhaseContext): CreateFfiePhase {
  const { stage, creationStep, outputStep } = ctx;

  if (stage === "understand") return "UNDERSTAND";
  if (stage === "orientation" || stage === "reflection") return "SITUATE";
  if (stage === "creation" && creationStep === 0) return "EMBODY";
  if (stage === "creation" && creationStep > 0) return "MATERIALIZE";
  if (stage === "output" || stage === "discovery") return "SHARE";

  return "UNDERSTAND";
}

/** Sub-step count for the active FFIE phase only. */
export function getActivePhaseSubStepCount(
  phase: CreateFfiePhase,
): number {
  switch (phase) {
    case "UNDERSTAND":
      return 1;
    case "SITUATE":
      return 6;
    case "EMBODY":
      return EMBODY_SCREEN_COUNT;
    case "MATERIALIZE":
      return 4;
    case "SHARE":
      return 3;
    default:
      return 1;
  }
}

/** Zero-based sub-step index within the active phase. */
export function getActivePhaseSubStepIndex(
  phase: CreateFfiePhase,
  ctx: CreatePhaseContext,
): number {
  switch (phase) {
    case "UNDERSTAND":
      return 0;
    case "SITUATE":
      if (ctx.stage === "orientation") return 0;
      if (!ctx.oracleDrawIndex && ctx.stage === "reflection") return 1;
      return Math.min(ctx.oracleDrawIndex + 1, 5);
    case "EMBODY":
      return ctx.embodySubStep;
    case "MATERIALIZE":
      return Math.max(0, ctx.creationStep - 1);
    case "SHARE":
      if (ctx.stage === "discovery") return 2;
      return ctx.outputStep;
    default:
      return 0;
  }
}

export function getCreatePhaseEyebrow(phase: CreateFfiePhase): string {
  return phase;
}
