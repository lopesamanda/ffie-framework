"use client";

import Link from "next/link";
import { ScrollRevealSection } from "@/components/motion/ScrollRevealSection";
import { PhaseTimelineExplainer } from "@/components/create/design/PhaseTimelineExplainer";
import { QuadrantPill } from "@/components/create/design/QuadrantPill";
import { ABOUT_SECTIONS, FOUR_FUTURES } from "@/data/about-content";
import { DictionaryOfCriticalFutures } from "@/components/about/DictionaryOfCriticalFutures";
import {
  FFIE_INSTITUTIONAL_AFFILIATION,
  FFIE_OPEN_ACCESS_STATEMENT,
  FFIE_PEER_REVIEWED_PUBLICATIONS,
  FFIE_VALIDATION_ORIGIN,
} from "@/data/about-publications";
import { ffieCardShell } from "@/lib/card-layout";
import { QUADRANT_COLORS } from "@/types/future";

const NAV_SECTIONS = [
  ABOUT_SECTIONS.problem,
  ABOUT_SECTIONS.origin,
  ABOUT_SECTIONS.method,
  ABOUT_SECTIONS.fourFutures,
  ABOUT_SECTIONS.why,
  ABOUT_SECTIONS.credibility,
  ABOUT_SECTIONS.access,
  { id: "dictionary", title: "Dictionary" },
];

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
        <div className="mt-6 rounded-xl border border-ffie-line bg-ffie-surface/80 px-4 py-3">
          <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-ffie-accent">
            Institutional affiliation
          </p>
          <p className="mt-1 font-display text-base font-bold text-ffie-ink">
            {FFIE_INSTITUTIONAL_AFFILIATION.name}
          </p>
          <p className="mt-1 text-sm text-ffie-muted">
            {FFIE_INSTITUTIONAL_AFFILIATION.program} ·{" "}
            {FFIE_INSTITUTIONAL_AFFILIATION.lab}
          </p>
          <a
            href={FFIE_INSTITUTIONAL_AFFILIATION.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex text-sm font-medium text-ffie-accent transition hover:underline"
          >
            {FFIE_INSTITUTIONAL_AFFILIATION.researcher} →
          </a>
        </div>
      </ScrollRevealSection>

      <nav
        aria-label="About sections"
        className="sticky top-0 z-10 mt-10 flex flex-wrap gap-2 border-b border-ffie-line bg-ffie-bg/95 py-4 backdrop-blur-sm"
      >
        {NAV_SECTIONS.map((section) => (
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
          id={ABOUT_SECTIONS.origin.id}
          className={`scroll-mt-24 px-[18px] py-6 ${ffieCardShell} bg-ffie-surface`}
          delay={0.05}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
            {ABOUT_SECTIONS.origin.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
            {ABOUT_SECTIONS.origin.title}
          </h2>
          <div className="mt-4 space-y-4">
            {ABOUT_SECTIONS.origin.body.map((paragraph) => (
              <p key={paragraph} className="max-w-prose leading-relaxed text-ffie-muted">
                {paragraph}
              </p>
            ))}
            <p className="max-w-prose text-sm leading-relaxed text-ffie-muted">
              {FFIE_VALIDATION_ORIGIN.preStudy}
            </p>
            <ul className="space-y-3">
              {FFIE_VALIDATION_ORIGIN.cohorts.map((cohort) => (
                <li
                  key={cohort.label}
                  className="rounded-lg border border-ffie-line/80 bg-ffie-bg/40 px-4 py-3"
                >
                  <p className="font-medium text-ffie-ink">{cohort.label}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ffie-muted">
                    {cohort.detail}
                  </p>
                </li>
              ))}
            </ul>
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
            <p className="max-w-prose text-sm leading-relaxed text-ffie-ink">
              {ABOUT_SECTIONS.method.createBridge}{" "}
              <Link href="/create" className="font-medium text-ffie-accent hover:underline">
                Create →
              </Link>
            </p>
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

          <div className="mt-8 space-y-4 border-t border-ffie-line pt-6">
            <p className="text-sm font-medium text-ffie-ink">
              Read the published research →
            </p>
            <ul className="space-y-4">
              {FFIE_PEER_REVIEWED_PUBLICATIONS.map((pub) => (
                <li
                  key={pub.doi}
                  className="rounded-lg border border-ffie-line/80 bg-ffie-bg/30 px-4 py-3"
                >
                  <p className="text-sm font-medium leading-snug text-ffie-ink">
                    {pub.title}
                  </p>
                  <p className="mt-1 text-xs text-ffie-muted">
                    {pub.authors} · {pub.venue}, {pub.year}
                  </p>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex font-mono text-xs text-ffie-accent transition hover:underline"
                  >
                    doi:{pub.doi}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </ScrollRevealSection>

        <ScrollRevealSection
          id={ABOUT_SECTIONS.access.id}
          className={`scroll-mt-24 px-[18px] py-6 ${ffieCardShell} bg-ffie-surface`}
          delay={0.05}
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
            {ABOUT_SECTIONS.access.eyebrow}
          </p>
          <h2 className="mt-2 font-display text-xl font-bold tracking-tight">
            {ABOUT_SECTIONS.access.title}
          </h2>
          <div className="mt-4 space-y-4">
            {ABOUT_SECTIONS.access.body.map((paragraph) => (
              <p key={paragraph} className="max-w-prose leading-relaxed text-ffie-muted">
                {paragraph}
              </p>
            ))}
            <p className="max-w-prose text-sm font-medium text-ffie-ink">
              {FFIE_OPEN_ACCESS_STATEMENT}
            </p>
          </div>
        </ScrollRevealSection>

        <DictionaryOfCriticalFutures />
      </div>
    </div>
  );
}
