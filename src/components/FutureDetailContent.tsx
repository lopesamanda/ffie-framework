import Link from "next/link";
import {
  COUNTRY_COLORS,
  QUADRANT_LABELS,
  type FutureEntry,
} from "@/types/future";

export function FutureDetailContent({ entry }: { entry: FutureEntry }) {
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

      <section className="space-y-4">
        <p className="text-lg leading-relaxed text-ffie-ink">{entry.narrative}</p>
        <blockquote className="border-l-2 border-ffie-accent pl-4 text-base italic leading-relaxed text-ffie-muted">
          {entry.reflectionQuestion}
        </blockquote>
      </section>

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
            <dt className="font-medium text-ffie-ink">Public promise</dt>
            <dd className="text-ffie-muted">{entry.artifact.publicPromise}</dd>
          </div>
          <div>
            <dt className="font-medium text-ffie-ink">Hidden function</dt>
            <dd className="text-ffie-muted">{entry.artifact.hiddenFunction}</dd>
          </div>
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
          Create a Future
        </Link>
      </div>
    </article>
  );
}
