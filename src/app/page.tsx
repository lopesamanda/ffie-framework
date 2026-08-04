import { ArtifactMarquee } from "@/components/home/ArtifactMarquee";
import { CursorLens } from "@/components/home/CursorLens";
import { HomeClosingCta, HomeHero } from "@/components/home/HomeHero";
import { HomeFrameworkSection } from "@/components/home/HomeFrameworkSection";
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
            <ArtifactMarquee items={marqueeItems} scrollLinked />
          </div>
        </div>
      </section>

      <HomeClosingCta />
    </>
  );
}
