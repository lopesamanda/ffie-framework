import type { JourneyStage } from "@/lib/journey/types";
import { EMBODY_SCREEN_COUNT } from "@/lib/journey/embody-flow";

/** The six Create stages, in order. Each stage's output feeds the next. */
export const CREATE_STAGES = [
  { id: "CHOOSE", number: "01", label: "Choose" },
  { id: "DRAW", number: "02", label: "Draw" },
  { id: "SITUATE", number: "03", label: "Situate" },
  { id: "EMBODY", number: "04", label: "Embody" },
  { id: "MAKE", number: "05", label: "Make" },
  { id: "QUESTION", number: "06", label: "Question" },
] as const;

export type CreateStageId = (typeof CREATE_STAGES)[number]["id"];

/** SHARE is the publish ritual that follows the six stages. */
export type CreateFfiePhase = CreateStageId | "SHARE";

export type CreatePhaseContext = {
  stage: JourneyStage;
  creationStep: number;
  embodySubStep: number;
  oracleDrawIndex: number;
  outputStep: number;
  /** True once the user leaves the Oracle intro and begins drawing cards. */
  oracleSituateStarted: boolean;
};

export function getCreateFfiePhase(ctx: CreatePhaseContext): CreateFfiePhase {
  const { stage, creationStep } = ctx;

  if (stage === "entry" || stage === "choose") return "CHOOSE";
  if (
    stage === "orientation" ||
    stage === "reflection" ||
    stage === "exploration"
  ) {
    return "DRAW";
  }
  if (stage === "situate") return "SITUATE";
  if (stage === "creation" && creationStep === 0) return "EMBODY";
  if (stage === "creation") return "MAKE";
  return "SHARE";
}

/** Index into CREATE_STAGES; SHARE sits past the last stage. */
export function getCreateStageIndex(phase: CreateFfiePhase): number {
  if (phase === "SHARE") return CREATE_STAGES.length;
  return CREATE_STAGES.findIndex((entry) => entry.id === phase);
}

export function getCreatePhaseEyebrow(
  phase: CreateFfiePhase,
  options?: { outputStep?: number },
): string {
  if (phase === "SHARE") {
    return options?.outputStep === 3 ? "YOUR FUTURE" : "SHARE";
  }
  return phase;
}

/** "Stage 03 of 06" — calm counter beside the progress indicator. */
export function getCreateStageCounter(phase: CreateFfiePhase): string {
  if (phase === "SHARE") return "Share";
  const entry = CREATE_STAGES[getCreateStageIndex(phase)];
  const last = CREATE_STAGES[CREATE_STAGES.length - 1];
  return `Stage ${entry.number} of ${last.number}`;
}

/** Sub-step count for the active stage only. */
export function getActivePhaseSubStepCount(phase: CreateFfiePhase): number {
  switch (phase) {
    case "DRAW":
      return 6;
    case "EMBODY":
      return EMBODY_SCREEN_COUNT;
    case "MAKE":
      return 4;
    case "SHARE":
      return 4;
    default:
      return 1;
  }
}

/** Zero-based sub-step index within the active stage. */
export function getActivePhaseSubStepIndex(
  phase: CreateFfiePhase,
  ctx: CreatePhaseContext,
): number {
  switch (phase) {
    case "DRAW":
      if (ctx.stage === "orientation") return 0;
      if (!ctx.oracleDrawIndex && ctx.stage === "reflection") return 1;
      return Math.min(ctx.oracleDrawIndex + 1, 5);
    case "EMBODY":
      return ctx.embodySubStep;
    case "MAKE":
      return Math.max(0, ctx.creationStep - 1);
    case "SHARE":
      return ctx.outputStep;
    default:
      return 0;
  }
}
