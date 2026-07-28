import type { CardHand } from "@/lib/journey/types";

/** Use tension tag as-is — connector language is tag-agnostic. */
function tensionTag(tension: string): string {
  return tension.trim();
}

/**
 * Three-sentence synthesis from each drawn card's Tension field.
 * Fixed connectors work regardless of whether tags are labels, "X vs. Y", or mini-sentences.
 */
export function buildOracleSynthesis(
  hand: Pick<CardHand, "benefit" | "barrier" | "risk" | "trust">,
): string {
  const riskTension = tensionTag(hand.risk.tension);
  const barrierTension = tensionTag(hand.barrier.tension);
  const benefitTension = tensionTag(hand.benefit.tension);
  const trustTension = tensionTag(hand.trust.tension);

  return `This future's core tension: ${riskTension} meeting ${barrierTension}. What might hold it together: ${benefitTension}. But trust in AI here means ${trustTension}.`;
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
