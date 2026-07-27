import type { NarrativeCard } from "@/data/narrative-cards";
import type { CardHand } from "@/lib/journey/types";

export type SynthesisMode = "narrative" | "direct";

/**
 * Switch to "direct" only if specific combinations read awkwardly in practice.
 * Not auto-detected — every hand uses the same template family.
 */
export const SYNTHESIS_MODE: SynthesisMode = "narrative";

const POSITIVE_TRUST_IDS = new Set([
  "instrumental-trust",
  "conditional-trust",
]);

function trustConnectorNarrative(trust: NarrativeCard): string {
  return POSITIVE_TRUST_IDS.has(trust.id) ? "supported by" : "even as";
}

function trustConnectorDirect(trust: NarrativeCard): string {
  return POSITIVE_TRUST_IDS.has(trust.id) ? "mitigated by" : "despite";
}

export function buildOracleSynthesis(
  hand: Pick<CardHand, "benefit" | "barrier" | "risk" | "trust">,
  mode: SynthesisMode = SYNTHESIS_MODE,
): string {
  const benefit = hand.benefit.synthesisPhrase;
  const barrier = hand.barrier.synthesisPhrase;
  const risk = hand.risk.synthesisPhrase;
  const trust = hand.trust.synthesisPhrase;

  if (mode === "direct") {
    const connector = trustConnectorDirect(hand.trust);
    return `This future pursues ${benefit}, while confronting ${barrier}. The risk to watch for is ${risk}, ${connector} ${trust}.`;
  }

  const connector = trustConnectorNarrative(hand.trust);
  return `We can work toward ${benefit}, even while facing ${barrier}, as long as we avoid ${risk} — ${connector} ${trust}.`;
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
