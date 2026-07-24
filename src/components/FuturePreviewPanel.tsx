import Link from "next/link";
import {
  COUNTRY_COLORS,
  QUADRANT_LABELS,
  type FutureEntry,
} from "@/types/future";

export function FuturePreviewPanel({ entry }: { entry: FutureEntry }) {
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
        <h3 className="text-xl font-semibold tracking-tight">{entry.title}</h3>
        <p className="mt-1 text-sm text-ffie-muted">
          {entry.character.name} · {entry.artifact.name}
        </p>
      </div>

      <p className="text-sm leading-relaxed text-ffie-ink line-clamp-5">
        {entry.narrative}
      </p>

      <blockquote className="border-l-2 border-ffie-accent pl-3 text-sm italic text-ffie-muted">
        {entry.reflectionQuestion}
      </blockquote>

      <Link
        href={`/explore/${entry.id}`}
        className="inline-block text-sm font-medium text-ffie-accent hover:underline"
      >
        Read full future →
      </Link>
    </div>
  );
}
