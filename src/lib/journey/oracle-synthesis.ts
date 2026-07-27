import {
  NARRATIVE_CARDS,
  type NarrativeCard,
} from "@/data/narrative-cards";
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

const BENEFIT_CARDS = NARRATIVE_CARDS.filter(
  (card) => card.category === "benefit" && card.drawable,
);

function benefitOpenerIndex(benefit: NarrativeCard): number {
  const index = BENEFIT_CARDS.findIndex((card) => card.id === benefit.id);
  return (index >= 0 ? index : 0) % 3;
}

function benefitPhrase(benefit: NarrativeCard, openerIndex: number): string {
  if (openerIndex === 2 && benefit.synthesisPhraseTransition) {
    return benefit.synthesisPhraseTransition;
  }
  return benefit.synthesisPhrase;
}

/** Trust closes the sentence as a collective anchor — not a passive trailing reflection. */
function trustAnchor(trust: NarrativeCard): string {
  if (POSITIVE_TRUST_IDS.has(trust.id)) {
    return `communities sustain ${trust.synthesisPhrase} as the collective condition holding this transformation together`;
  }
  return `communities keep ${trust.synthesisPhrase} as a consciousness anchor that must stay in the room`;
}

export function buildOracleSynthesis(
  hand: Pick<CardHand, "benefit" | "barrier" | "risk" | "trust">,
  mode: SynthesisMode = SYNTHESIS_MODE,
): string {
  const benefit = benefitPhrase(hand.benefit, benefitOpenerIndex(hand.benefit));
  const barrier = hand.barrier.synthesisPhrase;
  const risk = hand.risk.synthesisPhrase;
  const anchor = trustAnchor(hand.trust);

  if (mode === "direct") {
    const connectorDirect = POSITIVE_TRUST_IDS.has(hand.trust.id)
      ? "mitigated by"
      : "despite";
    return `This future pursues ${hand.benefit.synthesisPhrase}, while confronting ${barrier}. The risk to watch for is ${risk}, ${connectorDirect} ${hand.trust.synthesisPhrase}.`;
  }

  const openerIndex = benefitOpenerIndex(hand.benefit);
  const benefitA = hand.benefit.synthesisPhrase;

  switch (openerIndex) {
    case 1:
      return `In the near future, people in this innovation ecosystem will be able to ${benefitA}, amid ${barrier}, refusing to accept ${risk} — a future where ${anchor}.`;
    case 2:
      return `We follow the transition where this innovation ecosystem moves toward ${benefit}, amid ${barrier}, refusing to accept ${risk} — a transition where ${anchor}.`;
    default:
      return `We project a scenario where people in this future innovation ecosystem can ${benefitA}, amid ${barrier}, refusing to accept ${risk} — a scenario where ${anchor}.`;
  }
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
