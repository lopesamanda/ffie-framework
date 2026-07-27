import type { FutureEntry } from "@/types/future";

const RECENT_MS = 14 * 24 * 60 * 60 * 1000;

/** Future Commons entry published within the last two weeks. */
export function isRecentlyPublished(entry: FutureEntry): boolean {
  if (entry.collection !== "future_commons" || !entry.publishedAt) {
    return false;
  }
  const published = Date.parse(entry.publishedAt);
  if (Number.isNaN(published)) return false;
  return Date.now() - published < RECENT_MS;
}
