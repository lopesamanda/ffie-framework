"use client";

import Link from "next/link";
import {
  FFIE_CARD_TEXT,
  ffieCardCategory,
  ffieCardShell,
} from "@/lib/card-layout";

/** Exit to Explore — kept from the previous Understand screen. */
export function BrowseInspirationLink() {
  return (
    <Link
      href="/explore"
      className={`${ffieCardShell} block max-w-md bg-ffie-surface px-[18px] py-4 transition hover:-translate-y-0.5 hover:border-ffie-accent/30`}
    >
      <p className={`${ffieCardCategory} text-ffie-accent`}>Need inspiration?</p>
      <p className={`mt-2 text-sm font-medium text-ffie-ink ${FFIE_CARD_TEXT}`}>
        Browse real prototypes
      </p>
      <p className={`mt-1 text-xs text-ffie-muted ${FFIE_CARD_TEXT}`}>
        Research Findings from the thesis — outside this linear flow.
      </p>
    </Link>
  );
}
