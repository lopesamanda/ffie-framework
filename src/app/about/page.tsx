import type { Metadata } from "next";
import Link from "next/link";
import { ffieCardShell } from "@/lib/card-layout";

export const metadata: Metadata = {
  title: "About FFIE",
  description:
    "The framework, the research, and the feminist foresight method behind this instrument.",
};

const sections = [
  {
    id: "framework",
    title: "The Framework",
    body:
      "Five phases — Understand, Situate, Embody, Materialize, Share — validated across two workshop cohorts in Recife and Lisbon. The digital product is a single-player derivative of one validated cycle of the method's output, not the full facilitated protocol.",
  },
  {
    id: "research",
    title: "The Research",
    body:
      "Doctoral research in Design by Amanda Lopes. Two cohorts, 134 survey responses, 23 interviews, 8 diegetic prototypes. The Use-Distrust Paradox — high distrust of AI's societal trajectory alongside high personal certainty about adopting it — is the empirical bind the method renders visible.",
  },
  {
    id: "glossary",
    title: "Glossary",
    body:
      "Diegetic prototype · situated knowledge · tension (not solution) · extractive vs. emancipatory · hierarchical vs. collective care · marginalized vs. hegemonic position. Full definitions in docs/ffie_product_ux_foundations.md.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
        About FFIE
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        An instrument, not an explainer
      </h1>
      <p className="mt-4 max-w-prose text-lg leading-relaxed text-ffie-muted">
        Two verbs: Explore and Create. See{" "}
        <code className="text-sm text-ffie-ink">docs/FFIE_product_brief.md</code>{" "}
        for the full product scope and{" "}
        <Link href="/explore" className="text-ffie-accent hover:underline">
          Explore Futures
        </Link>{" "}
        to engage with the matrix directly.
      </p>

      <nav className="sticky top-0 z-10 mt-10 flex flex-wrap gap-2 border-b border-ffie-line bg-ffie-bg/95 py-4 backdrop-blur-sm">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-ffie-line px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-ffie-muted transition hover:border-ffie-accent/40 hover:text-ffie-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ffie-accent"
          >
            {section.title}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            className={`scroll-mt-24 px-[18px] py-6 ${ffieCardShell} bg-ffie-surface`}
          >
            <h2 className="font-display text-xl font-bold tracking-tight">
              {section.title}
            </h2>
            <p className="mt-4 max-w-prose leading-relaxed text-ffie-muted">
              {section.body}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
