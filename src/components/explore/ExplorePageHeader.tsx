"use client";

import { SpeculativeTooltip } from "@/components/SpeculativeTooltip";
import { EXPLORE_COPY } from "@/lib/publish-ritual-copy";

export function ExplorePageHeader() {
  return (
    <header className="mb-10 max-w-3xl">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
        Critical Feminist Matrix
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        {EXPLORE_COPY.heading}
      </h1>
      <p className="mt-4 text-base leading-relaxed text-ffie-muted">
        <SpeculativeTooltip term="livingCartography">
          {EXPLORE_COPY.subtitle}
        </SpeculativeTooltip>
      </p>
    </header>
  );
}
