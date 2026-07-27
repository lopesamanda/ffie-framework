"use client";

import type { CardHand } from "@/lib/journey/types";
import { buildOracleSynthesis } from "@/lib/journey/oracle-synthesis";

export function OracleSynthesisCallout({ hand }: { hand: CardHand }) {
  const sentence = buildOracleSynthesis(hand);

  return (
    <div
      className="rounded-xl border border-ffie-ink/10 bg-ffie-surface px-5 py-4 shadow-[0_2px_12px_rgba(35,19,82,0.06)]"
      role="note"
      aria-label="Oracle Draw synthesis"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
        Your draw, in one sentence
      </p>
      <p className="mt-2 text-base leading-relaxed text-ffie-ink">{sentence}</p>
    </div>
  );
}
