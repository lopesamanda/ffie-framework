import { researchFindingsSeed } from "@/data/research-findings-seed";
import { VISUAL_DIRECTION_IMAGES } from "@/lib/journey/visual-directions";
import type { FutureEntry } from "@/types/future";

export type ArtifactMarqueeItem = {
  id: string;
  name: string;
  imageSrc: string;
  href: string;
};

function visualForEntry(entry: FutureEntry, index: number): string {
  if (entry.imageUrl) return entry.imageUrl;
  const pool = VISUAL_DIRECTION_IMAGES.filter((item) => item.artifactType);
  const pick = pool[index % pool.length];
  return pick?.path ?? VISUAL_DIRECTION_IMAGES[0]!.path;
}

/** Published artifacts for exploration carousels — research findings + Future Commons. */
export function buildArtifactMarqueeItems(
  futureCommons: FutureEntry[] = [],
): ArtifactMarqueeItem[] {
  const publishedCommons = futureCommons.filter(
    (entry) => entry.status === "published",
  );
  const entries = [...researchFindingsSeed, ...publishedCommons];

  return entries.map((entry, index) => ({
    id: entry.id,
    name: entry.artifact.name,
    imageSrc: visualForEntry(entry, index),
    href: `/explore/${entry.id}`,
  }));
}
