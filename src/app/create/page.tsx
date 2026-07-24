import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create a Future",
  description:
    "Draw Narrative Cards, reflect, and build a diegetic prototype for the Future Commons.",
};

const stages = [
  "Entry",
  "Orientation",
  "Exploration",
  "Reflection",
  "Creation",
  "Future Output",
  "Discovery",
];

export default function CreatePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
        Create a Future
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
        What future are you carrying?
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-ffie-muted">
        Draw a hand of cards and find out. The full journey — Entry through
        Discovery — is specified in{" "}
        <code className="text-sm text-ffie-ink">docs/ffie_mvp_journey.md</code>{" "}
        and will be built in the next increment.
      </p>

      <ol className="mt-10 space-y-3 border-l border-ffie-line pl-6">
        {stages.map((stage, index) => (
          <li key={stage} className="text-sm text-ffie-muted">
            <span className="font-medium text-ffie-ink">
              {index + 1}. {stage}
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link
          href="/explore"
          className="rounded-full border border-ffie-line px-5 py-2.5 text-sm text-ffie-muted transition hover:border-ffie-accent/40"
        >
          Explore existing futures first
        </Link>
        <span className="rounded-full bg-ffie-accent/20 px-5 py-2.5 text-sm font-medium text-ffie-accent">
          Begin — coming soon
        </span>
      </div>
    </div>
  );
}
