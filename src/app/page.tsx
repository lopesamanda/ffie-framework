import Link from "next/link";
import { HomeHero } from "@/components/home/HomeHero";
import { MiniOracleDrawPreview } from "@/components/home/MiniOracleDrawPreview";
import { SectorMatrixTeaser } from "@/components/home/SectorMatrixTeaser";
import { ScrollRevealSection } from "@/components/motion/ScrollRevealSection";
import { getPublishedSubmissions } from "@/lib/submissions";
import { ffieCardShell } from "@/lib/card-layout";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const futureCommons = await getPublishedSubmissions();

  return (
    <>
      <HomeHero />

      <div className="relative mx-auto max-w-6xl px-6 pb-16 md:pb-24">
        <ScrollRevealSection>
          <SectorMatrixTeaser futureCommons={futureCommons} />
        </ScrollRevealSection>

        <ScrollRevealSection className="mt-14 grid gap-6 md:grid-cols-2">
          <Link
            href="/explore"
            className={`group px-[18px] py-8 transition hover:border-ffie-accent/40 hover:shadow-md ${ffieCardShell} border-ffie-accent/20 bg-ffie-accent-soft`}
          >
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
              Explore Futures
            </p>
            <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ffie-accent">
              Research Findings & Future Commons
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
              Browse the eight thesis prototypes on the Critical Feminist Matrix,
              then discover futures created by visitors — two collections, never
              blended.
            </p>
          </Link>

          <Link
            href="/create"
            className={`group relative overflow-hidden px-[18px] py-8 transition hover:border-ffie-accent/40 hover:shadow-md ${ffieCardShell} bg-ffie-surface`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-muted">
                  Create a Future
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold tracking-tight group-hover:text-ffie-accent">
                  Draw cards. Build a future.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
                  A guided journey from Narrative Cards to a shareable Future Output —
                  embody a life, name an artifact, and place it on the matrix.
                </p>
              </div>
              <MiniOracleDrawPreview />
            </div>
          </Link>
        </ScrollRevealSection>
      </div>
    </>
  );
}
