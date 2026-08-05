"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  GLOSSARY,
  GLOSSARY_TERM_IDS,
  type GlossaryTermId,
} from "@/lib/glossary";
import {
  QUADRANT_LABELS,
  type FutureQuadrant,
} from "@/types/future";

type QuadrantFilter = FutureQuadrant | "all";

function quadrantLabel(quadrant: FutureQuadrant | null): string {
  if (!quadrant) return "Applies everywhere";
  return QUADRANT_LABELS[quadrant].replace(" Future", "");
}

function TermCard({ termId }: { termId: GlossaryTermId }) {
  const [open, setOpen] = useState(false);
  const entry = GLOSSARY[termId];
  const reduceMotion = useReducedMotion();

  return (
    <article className="rounded-xl border border-ffie-line bg-ffie-surface/80 p-5">
      <div className={`border-l-[3px] pl-4 ${entry.registerColor}`}>
        <h3 className="font-display text-lg font-semibold text-ffie-ink">
          {entry.term}
        </h3>
        <p className="mt-1 text-xs text-ffie-muted">
          also known as {entry.conventionalTerm}
        </p>
        <span className="mt-2 inline-block rounded-full bg-ffie-accent-soft px-2 py-0.5 text-[10px] uppercase tracking-wide text-ffie-accent">
          {entry.reference}
        </span>
        <p className="mt-3 text-sm leading-relaxed text-ffie-ink/90">
          {entry.definition}
        </p>
        <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.1em] text-ffie-muted">
          {quadrantLabel(entry.quadrant)}
        </p>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="mt-4 text-xs font-medium text-ffie-accent underline-offset-2 hover:underline"
          aria-expanded={open}
        >
          {open ? "Hide question" : "Sit with a question"}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
              className="mt-3 text-sm italic leading-relaxed text-ffie-muted"
            >
              {entry.provocativeQuestion}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}

export function DictionaryOfCriticalFutures() {
  const [filter, setFilter] = useState<QuadrantFilter>("all");

  const filtered = GLOSSARY_TERM_IDS.filter((id) => {
    if (filter === "all") return true;
    const quadrant = GLOSSARY[id].quadrant;
    return quadrant === filter || quadrant === null;
  });

  const filters: { value: QuadrantFilter; label: string }[] = [
    { value: "all", label: "All" },
    { value: "dominant_dystopian", label: "Extractive + Hierarchical" },
    { value: "techno_optimist", label: "Extractive + Collective Care" },
    { value: "fragmented", label: "Emancipatory + Hierarchical" },
    { value: "feminist_preferred", label: "Emancipatory + Collective Care" },
  ];

  return (
    <section id="dictionary" className="mt-16 scroll-mt-24">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
        Dictionary of Critical Futures
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ffie-ink">
        How FFIE speaks
      </h2>
      <p className="mt-3 max-w-prose text-sm leading-relaxed text-ffie-muted">
        Terms here shape how FFIE speaks. The method was validated in
        participatory workshops in Recife and Lisbon — not abstracted into
        universalized prompts. You&apos;ll meet these words again as tooltips
        wherever they appear in the interface.
      </p>

      <div className="mt-6 flex flex-wrap gap-2">
        {filters.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setFilter(value)}
            aria-pressed={filter === value}
            className={`rounded-full border px-3 py-1.5 text-[11px] font-medium transition ${
              filter === value
                ? "border-ffie-accent bg-ffie-accent-soft text-ffie-accent"
                : "border-ffie-line bg-ffie-surface text-ffie-muted hover:border-ffie-accent/30"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {filtered.map((termId) => (
          <TermCard key={termId} termId={termId} />
        ))}
      </div>

      <p className="mt-8 text-xs leading-relaxed text-ffie-muted">
        Terms here shape how FFIE speaks. You&apos;ll meet them again — as
        tooltips — wherever they appear in the interface.
      </p>
    </section>
  );
}
