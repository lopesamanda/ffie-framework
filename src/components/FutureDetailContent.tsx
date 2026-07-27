import Link from "next/link";
import { isRecentlyPublished } from "@/lib/future-commons";
import {
  MATRIX_FRAMEWORK_INTRO,
  QUADRANT_DESCRIPTIONS,
} from "@/lib/journey/matrix-copy";
import {
  COUNTRY_COLORS,
  QUADRANT_LABELS,
  type FutureEntry,
} from "@/types/future";

export function FutureDetailContent({ entry }: { entry: FutureEntry }) {
  const isResearchFinding = entry.collection === "research_findings";
  const justPublished = isRecentlyPublished(entry);

  return (
    <article className="space-y-8">
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white"
            style={{ backgroundColor: COUNTRY_COLORS[entry.country] }}
          >
            {entry.country}
          </span>
          <span className="rounded-full bg-ffie-accent-soft px-2.5 py-1 text-xs font-medium text-ffie-accent">
            {QUADRANT_LABELS[entry.quadrant]}
          </span>
          <span className="rounded-full border border-ffie-line px-2.5 py-1 text-xs text-ffie-muted">
            {entry.powerPosition}
          </span>
          {justPublished && (
            <span className="rounded-full border border-ffie-accent/35 bg-ffie-accent-soft/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-ffie-accent">
              Just published
            </span>
          )}
        </div>

        <div>
          <p className="text-sm text-ffie-muted">
            {entry.character.name} — {entry.character.role}, {entry.country},{" "}
            {entry.year}
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
            {entry.title}
          </h1>
        </div>
      </header>

      <section className="max-w-prose space-y-3">
        <p className="text-sm leading-relaxed text-ffie-muted">
          {MATRIX_FRAMEWORK_INTRO}
        </p>
        <p className="text-sm leading-relaxed text-ffie-ink">
          {QUADRANT_DESCRIPTIONS[entry.quadrant]}
        </p>
      </section>

      <section className="max-w-prose space-y-4">
        <p className="text-lg leading-relaxed text-ffie-ink">{entry.narrative}</p>
        <blockquote className="border-l-2 border-ffie-accent pl-4 text-base italic leading-relaxed text-ffie-muted">
          {entry.reflectionQuestion}
        </blockquote>
      </section>

      {isResearchFinding && (
        <div className="rounded-xl border border-ffie-accent/25 bg-[#f6f4ff] px-5 py-4">
          <Link
            href="/create"
            className="text-sm font-medium italic text-ffie-accent transition hover:underline"
          >
            Inspired? Build your own future →
          </Link>
        </div>
      )}

      <section className="rounded-xl border border-ffie-line bg-ffie-bg/60 p-5 text-sm">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-ffie-muted">
          Reference data
        </p>
        <dl className="grid gap-4 md:grid-cols-2">
          <div>
            <dt className="font-medium text-ffie-ink">Tension</dt>
            <dd className="text-ffie-muted">{entry.tension}</dd>
          </div>
          <div>
            <dt className="font-medium text-ffie-ink">Artifact</dt>
            <dd className="text-ffie-muted">{entry.artifact.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-[0.12em] text-ffie-muted">
              Goal
            </dt>
            <dd className="mt-1 text-ffie-muted">{entry.artifact.publicPromise}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-[0.12em] text-ffie-muted">
              Weakness
            </dt>
            <dd className="mt-1 text-ffie-muted">{entry.artifact.hiddenFunction}</dd>
          </div>
          {entry.artifact.values && entry.artifact.values.length > 0 && (
            <div className="md:col-span-2">
              <dt className="font-medium text-ffie-ink">Embedded values</dt>
              <dd className="text-ffie-muted">{entry.artifact.values.join(" · ")}</dd>
            </div>
          )}
          <div>
            <dt className="font-medium text-ffie-ink">AI function</dt>
            <dd className="text-ffie-muted">{entry.character.aiFunction}</dd>
          </div>
          <div>
            <dt className="font-medium text-ffie-ink">Desire / Fear</dt>
            <dd className="text-ffie-muted">
              {entry.character.desire} · {entry.character.fear}
            </dd>
          </div>
          <div className="md:col-span-2">
            <dt className="font-medium text-ffie-ink">Values</dt>
            <dd className="text-ffie-muted">{entry.character.values.join(" · ")}</dd>
          </div>
        </dl>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link
          href="/explore"
          className="rounded-full border border-ffie-line px-4 py-2 text-sm text-ffie-muted transition hover:border-ffie-accent/40 hover:text-ffie-ink"
        >
          Back to Explore
        </Link>
        <Link
          href="/create"
          className="rounded-full bg-ffie-accent px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
        >
          {isResearchFinding ? "Build your own future" : "Create a Future"}
        </Link>
      </div>
    </article>
  );
}
