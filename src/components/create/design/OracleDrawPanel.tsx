"use client";

import type { CardHand } from "@/lib/journey/types";
import { FfieButton } from "@/components/create/design/FfieButton";
import { OracleDrawRow } from "@/components/create/design/OracleDrawRow";

function SyncIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

type OracleDrawPanelProps = {
  hand: CardHand;
  shuffling?: boolean;
  onShuffle: () => void;
};

/** Open hand layout — all four cards revealed with shuffle control. */
export function OracleDrawPanel({
  hand,
  shuffling = false,
  onShuffle,
}: OracleDrawPanelProps) {
  return (
    <div className="space-y-4">
      <FfieButton
        variant="secondary"
        disabled={shuffling}
        onClick={onShuffle}
        icon={<SyncIcon />}
        className="!rounded-lg !px-4 !py-2.5 !text-xs !font-bold !tracking-[0.06em]"
      >
        {shuffling ? "Shuffling…" : "Shuffle & reset"}
      </FfieButton>
      <OracleDrawRow hand={hand} allRevealed />
    </div>
  );
}
