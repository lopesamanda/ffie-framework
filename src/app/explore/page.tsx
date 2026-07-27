import type { Metadata } from "next";
import { ExploreView } from "@/components/ExploreView";
import { getPublishedSubmissions } from "@/lib/submissions";

export const metadata: Metadata = {
  title: "Explore Futures",
  description:
    "Research Findings and Future Commons on the Critical Feminist 2×2 Matrix.",
};

export const dynamic = "force-dynamic";

export default async function ExplorePage() {
  const futureCommons = await getPublishedSubmissions();

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
          Critical Feminist Matrix
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Explore Futures
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ffie-muted">
          Horizontal axis — System Logic:{" "}
          <span className="text-ffie-ink">Extractive ↔ Emancipatory</span>.
          Vertical axis — Power Organization:{" "}
          <span className="text-ffie-ink">Hierarchical ↔ Collective Care</span>.
          The matrix is the primary lens; country and scenario refine what you
          see.
        </p>
      </header>

      <ExploreView futureCommons={futureCommons} />
    </div>
  );
}
