import type { CardHand } from "@/lib/journey/types";
import type { NarrativeCard } from "@/data/narrative-cards";

const AFFIRMING_TRUST_IDS = new Set([
  "instrumental-trust",
  "conditional-trust",
]);

/** Primary tension clause — lowercase for mid-sentence use. */
function tensionClause(tension: string): string {
  const primary = tension.split(";")[0]?.trim() ?? tension;
  if (!primary) return primary;
  return primary.charAt(0).toLowerCase() + primary.slice(1);
}

function isAffirmingTrust(trust: NarrativeCard): boolean {
  return AFFIRMING_TRUST_IDS.has(trust.id);
}

/**
 * Two-sentence synthesis from each drawn card's Tension field.
 * Sentence 1: risk + barrier. Sentence 2: benefit + trust (affirming or skeptical).
 */
export function buildOracleSynthesis(
  hand: Pick<CardHand, "benefit" | "barrier" | "risk" | "trust">,
): string {
  const riskTension = tensionClause(hand.risk.tension);
  const barrierTension = tensionClause(hand.barrier.tension);
  const benefitTension = tensionClause(hand.benefit.tension);
  const trustTension = tensionClause(hand.trust.tension);

  const sentence1 = `In this future, ${riskTension} collides with ${barrierTension}.`;

  const sentence2 = isAffirmingTrust(hand.trust)
    ? `But ${benefitTension} still holds — because ${trustTension}.`
    : `Yet ${benefitTension} isn't enough — ${trustTension} still lingers.`;

  return `${sentence1} ${sentence2}`;
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
