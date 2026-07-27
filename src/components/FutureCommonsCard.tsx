import Link from "next/link";
import { QuadrantPill } from "@/components/create/design/QuadrantPill";
import {
  FFIE_CARD_TEXT,
  ffieCardDivider,
  ffieCardShell,
  ffieCardTitle,
} from "@/lib/card-layout";
import { isRecentlyPublished } from "@/lib/future-commons";
import {
  excerptAtWordBoundary,
  narrativeNeedsExcerpt,
} from "@/lib/text-excerpt";
import type { FutureEntry } from "@/types/future";

type FutureCommonsCardProps = {
  entry: FutureEntry;
  /** Shorter excerpt for constellation / compact layouts */
  compact?: boolean;
  className?: string;
};

const EXCERPT_DEFAULT = 160;
const EXCERPT_COMPACT = 120;

export function FutureCommonsCard({
  entry,
  compact = false,
  className = "",
}: FutureCommonsCardProps) {
  const maxLen = compact ? EXCERPT_COMPACT : EXCERPT_DEFAULT;
  const excerpt = excerptAtWordBoundary(entry.narrative, maxLen);
  const truncated = narrativeNeedsExcerpt(entry.narrative, maxLen);
  const justPublished = isRecentlyPublished(entry);

  return (
    <article
      className={`flex h-full flex-col px-[18px] py-4 ${ffieCardShell} bg-ffie-surface ${className}`}
    >
      <div className="flex flex-wrap items-center gap-2">
        <QuadrantPill quadrant={entry.quadrant} />
        {justPublished && (
          <span className="rounded-full border border-ffie-accent/35 bg-ffie-accent-soft/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-ffie-accent">
            Just published
          </span>
        )}
      </div>
      <h3 className={`mt-2 ${ffieCardTitle} ${compact ? "" : "text-lg"} ${FFIE_CARD_TEXT}`}>
        {entry.title}
      </h3>
      <p className={`mt-1 text-sm text-ffie-muted ${FFIE_CARD_TEXT}`}>
        {entry.character.name} · {entry.artifact.name}
      </p>
      <div className={`my-3 ${ffieCardDivider}`} />
      <p className={`flex-1 text-sm leading-relaxed text-ffie-ink ${FFIE_CARD_TEXT}`}>
        {excerpt}
      </p>
      <Link
        href={`/explore/${entry.id}`}
        className="mt-4 inline-flex items-center text-sm font-medium text-ffie-accent transition hover:underline"
        aria-label={
          truncated
            ? `Read the full future: ${entry.title}`
            : `Open ${entry.title}`
        }
      >
        Read the full future →
      </Link>
    </article>
  );
}
