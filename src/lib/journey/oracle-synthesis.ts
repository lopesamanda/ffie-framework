import type { CardHand } from "@/lib/journey/types";

const POSITIVE_TRUST_IDS = new Set([
  "instrumental-trust",
  "conditional-trust",
]);

function trustConnector(trustId: string): string {
  return POSITIVE_TRUST_IDS.has(trustId) ? "held together by" : "questioned through";
}

/**
 * Plain 2–3 sentence synthesis from drawn cards' synthesisClause fields.
 * Sentence 1: risk + barrier tension. Sentence 2: benefit counter-force + trust.
 */
export function buildOracleSynthesis(
  hand: Pick<CardHand, "benefit" | "barrier" | "risk" | "trust">,
): string {
  const risk = hand.risk.synthesisClause;
  const barrier = hand.barrier.synthesisClause;
  const benefit = hand.benefit.synthesisClause;
  const trust = hand.trust.synthesisClause;
  const connector = trustConnector(hand.trust.id);

  const sentence1 = `This future opens with ${risk}, while ${barrier} still shapes who gets ahead.`;
  const sentence2 = `Against that, ${benefit} pushes back as a counter-force, ${connector} ${trust}.`;

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
