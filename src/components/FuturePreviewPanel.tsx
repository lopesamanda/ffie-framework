import Link from "next/link";
import {
  COUNTRY_COLORS,
  QUADRANT_LABELS,
  type FutureEntry,
} from "@/types/future";
import { FFIE_CARD_TEXT } from "@/lib/card-layout";
import { excerptAtWordBoundary } from "@/lib/text-excerpt";

const SIDEBAR_EXCERPT = 220;

export function FuturePreviewPanel({ entry }: { entry: FutureEntry }) {
  const excerpt = excerptAtWordBoundary(entry.narrative, SIDEBAR_EXCERPT);

  return (
    <div className="space-y-4">
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
      </div>

      <div>
        <h2 className="text-xl font-semibold tracking-tight">{entry.title}</h2>
        <p className="mt-1 text-sm text-ffie-muted">
          {entry.character.name} · {entry.artifact.name}
        </p>
      </div>

      <p className={`max-w-prose text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}>
        {excerpt}
      </p>

      <blockquote
        className={`max-w-prose border-l-2 border-ffie-accent pl-3 text-sm italic leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}
      >
        {entry.reflectionQuestion}
      </blockquote>

      <Link
        href={`/explore/${entry.id}`}
        className="inline-flex items-center text-sm font-medium text-ffie-accent transition hover:underline"
      >
        Read the full future →
      </Link>
    </div>
  );
}
