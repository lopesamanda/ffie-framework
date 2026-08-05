import type { Metadata } from "next";
import { ExploreView } from "@/components/ExploreView";
import { ExplorePageHeader } from "@/components/explore/ExplorePageHeader";
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
      <ExplorePageHeader />

      <ExploreView futureCommons={futureCommons} />
    </div>
  );
}
