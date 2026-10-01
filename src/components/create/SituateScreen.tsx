"use client";

import { MatrixCalibrationScreen } from "@/components/create/MatrixCalibrationScreen";
import type { JourneyDraft } from "@/lib/journey/types";

type SituateScreenProps = {
  draft: JourneyDraft;
  onSystemLogicChange: (score: number) => void;
  onPowerOrgChange: (score: number) => void;
  onContinue: () => void;
  onBack: () => void;
};

/** Situate — no Figma frame yet. Existing matrix, with axis microcopy first. */
export function SituateScreen({
  draft,
  onSystemLogicChange,
  onPowerOrgChange,
  onContinue,
  onBack,
}: SituateScreenProps) {
  return (
    <div className="space-y-8">
      <div className="max-w-xl space-y-5">
        <p className="text-sm leading-relaxed text-ffie-muted">
          These two axes are how FFIE reads a future — who extracts, and how
          power is held. Place yours after you understand them.
        </p>

        <div className="space-y-4 rounded-xl border border-ffie-line bg-ffie-surface px-5 py-5">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
              Who holds power?
            </p>
            <p className="mt-2 text-sm tracking-wide text-ffie-ink">
              <span className="text-ffie-muted">Extractive</span>
              <span className="mx-2 text-ffie-ink/25" aria-hidden>
                ←————————→
              </span>
              <span className="text-ffie-muted">Emancipatory</span>
            </p>
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-muted">
              How is power organized?
            </p>
            <p className="mt-2 text-sm tracking-wide text-ffie-ink">
              <span className="text-ffie-muted">Hierarchical</span>
              <span className="mx-2 text-ffie-ink/25" aria-hidden>
                ←————————→
              </span>
              <span className="text-ffie-muted">Collective Care</span>
            </p>
          </div>
        </div>

        <p className="font-display text-base font-semibold text-ffie-ink">
          Now place your future.
        </p>
      </div>

      <MatrixCalibrationScreen
        draft={draft}
        onSystemLogicChange={onSystemLogicChange}
        onPowerOrgChange={onPowerOrgChange}
        onContinue={onContinue}
        onBack={onBack}
        showRitualChrome={false}
        continueLabel="Continue"
      />
    </div>
  );
}
