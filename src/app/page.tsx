import Link from "next/link";
import { ArtifactMarquee } from "@/components/home/ArtifactMarquee";
import { CursorLens } from "@/components/home/CursorLens";
import { HomeClosingCta, HomeHero } from "@/components/home/HomeHero";
import { HomeFrameworkSection } from "@/components/home/HomeFrameworkSection";
import { MatrixThumbnailPreview } from "@/components/home/MatrixThumbnailPreview";
import { ScrollRevealSection } from "@/components/motion/ScrollRevealSection";
import { buildArtifactMarqueeItems } from "@/lib/artifact-marquee-items";
import { getPublishedSubmissions } from "@/lib/submissions";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const futureCommons = await getPublishedSubmissions();
  const marqueeItems = buildArtifactMarqueeItems(futureCommons);

  return (
    <>
      <CursorLens />
      <HomeHero />

      <HomeFrameworkSection />

      <section className="border-t border-ffie-line/60 py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollRevealSection>
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
              From the commons
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ffie-ink md:text-4xl">
              Artifacts already in play
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-ffie-muted">
              Research prototypes and community futures — each one a diegetic
              artifact placed on the Critical Feminist Matrix. Click any to read
              the full scenario.
            </p>
          </ScrollRevealSection>

          <div className="mt-10 -mx-6 px-2 md:-mx-0">
            <ArtifactMarquee items={marqueeItems} variant="single" />
          </div>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              href="/explore"
              data-cursor-lens
              className="inline-flex items-center justify-center rounded-lg border border-ffie-accent bg-ffie-accent-soft px-6 py-3 text-sm font-semibold text-ffie-accent transition hover:border-ffie-accent/80 hover:bg-ffie-accent/10"
            >
              Explore the Matrix →
            </Link>
            <MatrixThumbnailPreview className="h-[88px] w-[88px] sm:h-[96px] sm:w-[96px]" />
          </div>
        </div>
      </section>

      <HomeClosingCta />
    </>
  );
}
