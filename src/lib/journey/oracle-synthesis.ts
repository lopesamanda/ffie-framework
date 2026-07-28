import type { CardHand } from "@/lib/journey/types";

function tensionTag(tension: string): string {
  return tension.trim();
}

export type OracleSynthesisParts = {
  main: string;
  tensions: string;
};

/**
 * Main synthesis line uses each card's Name (title).
 * Tensions are shown separately below.
 */
export function buildOracleSynthesisParts(
  hand: Pick<CardHand, "benefit" | "barrier" | "risk" | "trust">,
): OracleSynthesisParts {
  const benefitName = hand.benefit.name.trim();
  const riskName = hand.risk.name.trim();
  const barrierName = hand.barrier.name.trim();
  const trustName = hand.trust.name.trim();
  const trustTension = tensionTag(hand.trust.tension);
  const benefitTension = tensionTag(hand.benefit.tension);
  const riskTension = tensionTag(hand.risk.tension);
  const barrierTension = tensionTag(hand.barrier.tension);

  return {
    main: `Here, ${benefitName} — but underneath, ${riskName} meets ${barrierName}, and trust in it is ${trustName}: ${trustTension}.`,
    tensions: `Tensions inside this ecosystem: ${benefitTension} · ${riskTension} · ${barrierTension}`,
  };
}

/** Main synthesis sentence — stored on draft and submissions. */
export function buildOracleSynthesis(
  hand: Pick<CardHand, "benefit" | "barrier" | "risk" | "trust">,
): string {
  return buildOracleSynthesisParts(hand).main;
}

export function buildOracleSynthesisTensions(
  hand: Pick<CardHand, "benefit" | "barrier" | "risk" | "trust">,
): string {
  return buildOracleSynthesisParts(hand).tensions;
}

/** True once Benefit, Risk, Trust, and Barrier are all face-up in the Oracle row. */
export function allFourOracleCardsRevealed(
  oracleRevealIndex?: number,
  cardFlipped?: boolean,
): boolean {
  if (oracleRevealIndex === undefined) return true;
  return (
    oracleRevealIndex >= 4 || (oracleRevealIndex === 3 && Boolean(cardFlipped))
  );
}
