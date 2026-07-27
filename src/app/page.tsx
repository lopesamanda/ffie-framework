import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
          Feminist Foresight in Innovation Ecosystems
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ffie-ink md:text-5xl">
          Explore futures. Create your own. See where power and care collide.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ffie-muted">
          FFIE is a research-validated foresight method for innovation
          ecosystems. Its replicable unit is simple and powerful:{" "}
          <strong className="font-medium text-ffie-ink">
            persona + diegetic artifact, positioned on the Critical Feminist
            2×2 Matrix
          </strong>
          . This is an instrument for engaging with feminist foresight
          directly — not a site that explains a framework from the sidelines.
        </p>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <Link
          href="/explore"
          className="group rounded-2xl border border-ffie-accent/20 bg-ffie-accent-soft p-8 transition hover:border-ffie-accent/40 hover:shadow-md"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ffie-accent">
            Explore Futures
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ffie-accent">
            Research Findings & Future Commons
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
            Browse the eight thesis prototypes on the Critical Feminist Matrix,
            then discover futures created by visitors — two collections, never
            blended.
          </p>
        </Link>

        <Link
          href="/create"
          className="group rounded-2xl border border-ffie-line bg-ffie-surface p-8 transition hover:border-ffie-accent/40 hover:shadow-md"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ffie-muted">
            Create a Future
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight group-hover:text-ffie-accent">
            Draw cards. Build a future.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
            A guided journey from Narrative Cards to a shareable Future Output —
            coming in the next increment.
          </p>
        </Link>
      </section>
    </div>
  );
}
