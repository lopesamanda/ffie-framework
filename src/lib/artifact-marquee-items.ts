import type { CardCategory } from "@/data/narrative-cards";
import { researchFindingsSeed } from "@/data/research-findings-seed";
import { CATEGORY_STYLES } from "@/lib/category-styles";
import { VISUAL_DIRECTION_IMAGES } from "@/lib/journey/visual-directions";
import type { FutureEntry } from "@/types/future";

const REGISTER_CYCLE: CardCategory[] = [
  "risk",
  "benefit",
  "trust",
  "barrier",
  "transversal",
];

export type ArtifactMarqueeItem = {
  id: string;
  name: string;
  imageSrc: string;
  href: string;
  register: CardCategory;
  accentColor: string;
};

function visualForEntry(entry: FutureEntry, index: number): string {
  if (entry.imageUrl) return entry.imageUrl;
  const pool = VISUAL_DIRECTION_IMAGES.filter((item) => item.artifactType);
  const pick = pool[index % pool.length];
  return pick?.path ?? VISUAL_DIRECTION_IMAGES[0]!.path;
}

function registerForIndex(index: number): CardCategory {
  return REGISTER_CYCLE[index % REGISTER_CYCLE.length]!;
}

/** Published artifacts for exploration carousels — research findings + Future Commons. */
export function buildArtifactMarqueeItems(
  futureCommons: FutureEntry[] = [],
): ArtifactMarqueeItem[] {
  const publishedCommons = futureCommons.filter(
    (entry) => entry.status === "published",
  );
  const entries = [...researchFindingsSeed, ...publishedCommons];

  return entries.map((entry, index) => {
    const register = registerForIndex(index);
    return {
      id: entry.id,
      name: entry.artifact.name,
      imageSrc: visualForEntry(entry, index),
      href: `/explore/${entry.id}`,
      register,
      accentColor: CATEGORY_STYLES[register].border,
    };
  });
}
