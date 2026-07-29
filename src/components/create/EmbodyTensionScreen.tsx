"use client";

import { motion, useReducedMotion } from "framer-motion";
import { NarrativeBlank, NarrativeBlock } from "@/components/create/NarrativeBlank";
import {
  OracleFanRevealedCard,
  OracleFanTransversalCard,
} from "@/components/create/design/OracleDeckFan";
import type { CardHand } from "@/lib/journey/types";
import { verbFor, type CharacterPronouns } from "@/lib/journey/character-pronouns";

const FEAR_PLACEHOLDER = "fear related to AI";

const lineDrift = (reduceMotion: boolean | null) =>
  reduceMotion
    ? { initial: false as const, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 18 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as const },
      };

type EmbodyFearScreenProps = {
  draft: { fear: string };
  role: string;
  cardHand: CardHand | null;
  p: CharacterPronouns;
  onChange: (patch: { fear?: string }) => void;
};

export function EmbodyFearScreen({
  draft,
  role,
  cardHand,
  p,
  onChange,
}: EmbodyFearScreenProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="space-y-6">
      <p className="text-sm leading-relaxed text-ffie-muted">
        You drew these cards. Let them shape what {p.subject}{" "}
        {verbFor(p, "is", "are")} afraid of:
      </p>

      {cardHand && (
        <div className="flex flex-wrap gap-3">
          <OracleFanRevealedCard card={cardHand.risk} />
          <OracleFanRevealedCard card={cardHand.barrier} />
          <OracleFanTransversalCard card={cardHand.transversal} />
        </div>
      )}

      <NarrativeBlock>
        <motion.div {...lineDrift(reduceMotion)}>
          <NarrativeBlank
            before={`As a ${role}, what ${p.subject} ${verbFor(p, "fears", "fear")} most — whether from the technology itself, or from the ecosystem around it — is that Artificial Intelligence will `}
            after="."
            value={draft.fear}
            onChange={(fear) => onChange({ fear })}
            placeholder={FEAR_PLACEHOLDER}
          />
        </motion.div>
      </NarrativeBlock>

      <p className="text-sm italic leading-relaxed text-ffie-muted">
        Hope and fear rarely take turns. Most people carry both at once.
      </p>
    </div>
  );
}

/** @deprecated Use EmbodyBuildStoryScreen + EmbodyFearScreen */
export { EmbodyFearScreen as EmbodyTensionScreen };
