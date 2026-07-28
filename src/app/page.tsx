import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeOracleFanPreview } from "@/components/home/HomeOracleFanPreview";
import { SectorMatrixPreview } from "@/components/home/SectorMatrixPreview";
import { ScrollRevealSection } from "@/components/motion/ScrollRevealSection";
import { getPublishedSubmissions } from "@/lib/submissions";
import { ffieCardShell } from "@/lib/card-layout";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const futureCommons = await getPublishedSubmissions();

  return (
    <>
      <HomeHero />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <ScrollRevealSection className="-mt-4 md:-mt-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Link
              href="/explore"
              className={`group flex flex-col gap-6 px-[18px] py-7 transition hover:border-ffie-accent/40 hover:shadow-md sm:flex-row sm:items-stretch sm:gap-5 ${ffieCardShell} border-ffie-accent/20 bg-ffie-accent-soft`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
                  Explore Futures
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ffie-accent">
                  Research Findings & Future Commons
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
                  Browse eight research prototypes on the Critical Feminist Matrix,
                  then explore futures submitted by the community. Two collections,
                  kept separate.
                </p>
                <p className="mt-3 text-xs leading-relaxed text-ffie-muted/90">
                  Each dot is a future created by someone like you, colored by sector
                  on the matrix. Create your own to see where it lands.
                </p>
              </div>
              <SectorMatrixPreview
                futureCommons={futureCommons}
                className="w-full sm:w-[42%] sm:max-w-[220px] sm:self-center"
              />
            </Link>

            <Link
              href="/create"
              className={`group flex flex-col gap-6 px-[18px] py-7 transition hover:border-ffie-accent/40 hover:shadow-md sm:flex-row sm:items-stretch sm:gap-5 ${ffieCardShell} bg-ffie-surface`}
            >
              <div className="min-w-0 flex-1">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-muted">
                  Create a Future
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight group-hover:text-ffie-accent">
                  Draw cards. Build a future.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
                  A guided journey from narrative cards to a shareable future.
                  Embody a life, name an artifact, and place it on the matrix.
                </p>
                <p className="mt-4 text-sm font-semibold text-ffie-accent transition group-hover:underline">
                  Start creating →
                </p>
              </div>
              <div className="flex w-full items-center justify-center sm:w-[42%] sm:max-w-[220px] sm:self-center">
                <HomeOracleFanPreview />
              </div>
            </Link>
          </div>
        </ScrollRevealSection>
      </div>
    </>
  );
}
