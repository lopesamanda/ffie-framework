"use client";

import Link from "next/link";
import { ScrollRevealSection } from "@/components/motion/ScrollRevealSection";
import { PhaseTimelineExplainer } from "@/components/create/design/PhaseTimelineExplainer";
import { QuadrantPill } from "@/components/create/design/QuadrantPill";
import { ABOUT_SECTIONS, FOUR_FUTURES } from "@/data/about-content";
import { ffieCardShell } from "@/lib/card-layout";
import { QUADRANT_COLORS } from "@/types/future";

export function AboutPageContent() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <ScrollRevealSection>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
          About FFIE
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          An instrument, not an explainer
        </h1>
        <p className="mt-4 max-w-prose text-lg leading-relaxed text-ffie-muted">
          Two verbs:{" "}
          <Link href="/explore" className="text-ffie-accent hover:underline">
            Explore
          </Link>{" "}
          and{" "}
          <Link href="/create" className="text-ffie-accent hover:underline">
            Create
          </Link>
          . The method is validated in workshops; the site is where you engage
          with it directly.
        </p>
      </ScrollRevealSection>

      <nav
        aria-label="About sections"
        className="sticky top-0 z-10 mt-10 flex flex-wrap gap-2 border-b border-ffie-line bg-ffie-bg/95 py-4 backdrop-blur-sm"
      >
        {[
          ABOUT_SECTIONS.problem,
          ABOUT_SECTIONS.method,
          ABOUT_SECTIONS.fourFutures,
          ABOUT_SECTIONS.why,
          ABOUT_SECTIONS.credibility,
        ].map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-ffie-line px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-ffie-muted transition hover:border-ffie-accent/40 hover:text-ffie-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ffie-accent"
          >
            {section.eyebrow}
          </a>
        ))}
      </nav>

      <div className="mt-10 space-y-10">
        <ScrollRevealSection
          id={ABOUT_SECTIONS.problem.id}
          className={`scroll-mt-24 px-[18px] py-6 ${ffieCardShell} bg-ffie-surface`}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
            {ABOUT_SECTIONS.problem.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
            {ABOUT_SECTIONS.problem.title}
          </h2>
          <div className="mt-4 space-y-4">
            {ABOUT_SECTIONS.problem.body.map((paragraph) => (
              <p key={paragraph} className="max-w-prose leading-relaxed text-ffie-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection
          id={ABOUT_SECTIONS.method.id}
          className={`scroll-mt-24 px-[18px] py-6 ${ffieCardShell} bg-ffie-surface`}
          delay={0.05}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
            {ABOUT_SECTIONS.method.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
            {ABOUT_SECTIONS.method.title}
          </h2>
          <div className="mt-4 space-y-4">
            {ABOUT_SECTIONS.method.body.map((paragraph) => (
              <p key={paragraph} className="max-w-prose leading-relaxed text-ffie-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-8">
            <PhaseTimelineExplainer />
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection
          id={ABOUT_SECTIONS.fourFutures.id}
          className={`scroll-mt-24 px-[18px] py-6 ${ffieCardShell} bg-ffie-surface`}
          delay={0.05}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
            {ABOUT_SECTIONS.fourFutures.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
            {ABOUT_SECTIONS.fourFutures.title}
          </h2>
          <p className="mt-4 max-w-prose leading-relaxed text-ffie-muted">
            {ABOUT_SECTIONS.fourFutures.body[0]}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {FOUR_FUTURES.map(({ quadrant, title, summary }) => (
              <div
                key={quadrant}
                className="rounded-xl border border-ffie-line px-4 py-4"
                style={{ backgroundColor: `${QUADRANT_COLORS[quadrant]}99` }}
              >
                <QuadrantPill quadrant={quadrant} />
                <h3 className="mt-3 font-display text-sm font-bold text-ffie-ink">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ffie-muted">
                  {summary}
                </p>
              </div>
            ))}
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection
          id={ABOUT_SECTIONS.why.id}
          className={`scroll-mt-24 px-[18px] py-6 ${ffieCardShell} bg-ffie-surface`}
          delay={0.05}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
            {ABOUT_SECTIONS.why.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
            {ABOUT_SECTIONS.why.title}
          </h2>
          <div className="mt-4 space-y-4">
            {ABOUT_SECTIONS.why.body.map((paragraph) => (
              <p key={paragraph} className="max-w-prose leading-relaxed text-ffie-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection
          id={ABOUT_SECTIONS.credibility.id}
          className={`scroll-mt-24 px-[18px] py-6 ${ffieCardShell} bg-ffie-surface`}
          delay={0.05}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
            {ABOUT_SECTIONS.credibility.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
            {ABOUT_SECTIONS.credibility.title}
          </h2>
          <div className="mt-4 space-y-4">
            {ABOUT_SECTIONS.credibility.body.map((paragraph) => (
              <p key={paragraph} className="max-w-prose leading-relaxed text-ffie-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollRevealSection>
      </div>
    </div>
  );
}
