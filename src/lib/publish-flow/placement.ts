import {
  calibrationToSigned,
  computePlacementFromMatrixScales,
  quadrantFromPosition,
  signedToUnit,
  type JourneyDraft,
} from "@/lib/journey/types";

export function unitFromSigned(x: number, y: number) {
  return signedToUnit(x, y);
}

export function signedFromUnit(unitX: number, unitY: number) {
  return {
    x: unitX * 2 - 1,
    y: unitY * 2 - 1,
  };
}

export function calibrationFromSigned(value: number): number {
  return ((value + 1) / 2) * 100;
}

export function clampUnit(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** Apply a unit-space coordinate to the journey draft placement fields. */
export function placementPatchFromUnit(
  unitX: number,
  unitY: number,
): Pick<
  JourneyDraft,
  | "position"
  | "systemLogicScore"
  | "powerOrgScore"
  | "powerPosition"
  | "placementJustification"
> {
  const ux = clampUnit(unitX);
  const uy = clampUnit(unitY);
  const signed = signedFromUnit(ux, uy);
  const systemLogicScore = calibrationFromSigned(signed.x);
  const powerOrgScore = calibrationFromSigned(signed.y);
  const placement = computePlacementFromMatrixScales(
    systemLogicScore,
    powerOrgScore,
  );

  return {
    position: placement.position,
    systemLogicScore,
    powerOrgScore,
    powerPosition: placement.powerPosition,
    placementJustification: placement.placementJustification,
  };
}

export function unitFromDraft(draft: JourneyDraft) {
  if (draft.position.x !== 0 || draft.position.y !== 0) {
    return unitFromSigned(draft.position.x, draft.position.y);
  }
  if (draft.systemLogicScore != null && draft.powerOrgScore != null) {
    return unitFromSigned(
      calibrationToSigned(draft.systemLogicScore),
      calibrationToSigned(draft.powerOrgScore),
    );
  }
  return { x: 0.5, y: 0.5 };
}

export function activeQuadrantFromDraft(draft: JourneyDraft) {
  return quadrantFromPosition(draft.position.x, draft.position.y);
}
