"use client";

import { CardReferenceTag } from "@/components/create/CardReferenceTag";
import { OracleSynthesisCallout } from "@/components/create/design/OracleSynthesisCallout";
import {
  ORACLE_DRAW_ORDER,
  OracleFanRevealedCard,
} from "@/components/create/design/OracleDeckFan";
import type { CardHand } from "@/lib/journey/types";

const RECAP_ROTATIONS = [-5, -1.5, 1.5, 5] as const;

/** Open deck recap after Oracle Draw — four revealed cards plus Environmental Impact. */
export function OracleDrawRecap({ hand }: { hand: CardHand }) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
        Your full draw
      </p>

      <div className="-mx-1 overflow-x-auto pb-2">
        <div className="flex min-w-min items-end gap-2 px-1 sm:gap-3">
          {ORACLE_DRAW_ORDER.map((key, index) => (
            <div
              key={key}
              className="shrink-0 origin-bottom"
              style={{
                transform: `rotate(${RECAP_ROTATIONS[index] ?? 0}deg)`,
              }}
            >
              <OracleFanRevealedCard card={hand[key]} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#2c8a52]">
            Environmental Impact
          </span>
          <span className="rounded-[3px] border border-[#2c8a52] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.08em] text-[#2c8a52]">
            Always applied
          </span>
        </div>
        <OracleFanRevealedCard card={hand.transversal} />
      </div>
    </div>
  );
}

export function OracleDrawReflectionPrompt({
  hand,
  reflectionText,
  onReflectionChange,
  fieldClassName,
}: {
  hand: CardHand;
  reflectionText: string;
  onReflectionChange: (value: string) => void;
  fieldClassName: string;
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {ORACLE_DRAW_ORDER.map((key) => (
          <CardReferenceTag key={key} card={hand[key]} compact />
        ))}
      </div>

      <OracleSynthesisCallout hand={hand} />

      <label className="block space-y-2">
        <span className="text-sm font-medium text-ffie-ink">
          Where do you feel this tension yourself — in your work, your community,
          your own use of AI?
        </span>
        <textarea
          value={reflectionText}
          onChange={(event) => onReflectionChange(event.target.value)}
          rows={3}
          className={fieldClassName}
          placeholder="A sentence or two is enough."
        />
      </label>
    </div>
  );
}
