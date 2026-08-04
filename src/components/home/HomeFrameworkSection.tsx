"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ScrollRevealSection } from "@/components/motion/ScrollRevealSection";
import { FFIE_PHASES } from "@/data/about-content";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const PHASE_ICONS = ["◎", "⌖", "◉", "▣", "↗"] as const;

function PhaseTimeline({
  activeIndex,
  reduceMotion,
}: {
  activeIndex: number;
  reduceMotion: boolean | null;
}) {
  return (
    <div
      className="flex w-full items-end justify-between gap-1 px-1 sm:gap-2"
      aria-label="Five-phase framework progression"
    >
      {FFIE_PHASES.map((phase, index) => {
        const isVisible = index <= activeIndex;
        const isActive = index === activeIndex;
        const isPast = index < activeIndex;

        return (
          <motion.div
            key={phase.phase}
            className="flex min-w-0 flex-1 flex-col items-center gap-2 text-center"
            initial={false}
            animate={
              reduceMotion
                ? {
                    opacity: isVisible ? (isActive ? 1 : 0.5) : 0,
                    scale: isActive ? 1 : isPast ? 0.85 : 0.75,
                    y: isVisible ? 0 : 12,
                  }
                : {
                    opacity: isVisible ? (isActive ? 1 : 0.48) : 0,
                    scale: isActive ? 1 : isPast ? 0.84 : 0.72,
                    y: isVisible ? 0 : 16,
                  }
            }
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className={`flex size-11 shrink-0 items-center justify-center rounded-full border text-lg sm:size-14 sm:text-xl ${
                isActive
                  ? "border-ffie-accent bg-ffie-accent-soft text-ffie-accent"
                  : isPast
                    ? "border-ffie-line/80 bg-ffie-surface text-ffie-muted"
                    : "border-ffie-line bg-ffie-surface text-ffie-muted"
              }`}
              aria-hidden
            >
              {PHASE_ICONS[index]}
            </span>
            <span
              className={`max-w-[4.5rem] text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] sm:max-w-none sm:text-xs sm:tracking-[0.1em] ${
                isActive ? "text-ffie-accent" : "text-ffie-muted"
              }`}
            >
              {phase.name}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}

function StickyFrameworkExplainer() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [displayIndex, setDisplayIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const activeIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, FFIE_PHASES.length - 1],
  );

  useEffect(() => {
    return activeIndex.on("change", (value) => {
      setDisplayIndex(
        Math.min(FFIE_PHASES.length - 1, Math.max(0, Math.round(value))),
      );
    });
  }, [activeIndex]);

  const phase = FFIE_PHASES[displayIndex] ?? FFIE_PHASES[0]!;

  return (
    <section ref={sectionRef} className="relative h-[220vh]">
      <div className="sticky top-20 md:top-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 md:grid-cols-2 md:items-center">
          <div className="space-y-5">
            <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
              The Framework
            </p>
            <h2 className="font-display text-3xl font-bold tracking-tight text-ffie-ink md:text-4xl">
              Five phases from tension to shareable future
            </h2>
            <motion.div
              key={phase.phase}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="space-y-3"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.12em] text-ffie-accent">
                Phase {phase.phase} — {phase.name}
              </p>
              <p className="text-base leading-relaxed text-ffie-muted">
                {phase.description}
              </p>
            </motion.div>
          </div>
          <PhaseTimeline activeIndex={displayIndex} reduceMotion={reduceMotion} />
        </div>
      </div>
    </section>
  );
}

function MobileFrameworkReveals() {
  return (
    <div className="space-y-10">
      {FFIE_PHASES.map((phase) => (
        <ScrollRevealSection key={phase.phase}>
          <div className="flex gap-4">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full border border-ffie-accent bg-ffie-accent-soft text-sm font-semibold text-ffie-accent"
              aria-hidden
            >
              {phase.phase}
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-ffie-ink">
                {phase.name}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ffie-muted">
                {phase.description}
              </p>
            </div>
          </div>
        </ScrollRevealSection>
      ))}
    </div>
  );
}

export function HomeFrameworkSection() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <section className="border-t border-ffie-line/60 bg-ffie-bg/50 py-16 md:py-24">
      {isDesktop ? (
        <StickyFrameworkExplainer />
      ) : (
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
            The Framework
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ffie-ink">
            Five phases from tension to shareable future
          </h2>
          <div className="mt-10">
            <MobileFrameworkReveals />
          </div>
        </div>
      )}
    </section>
  );
}
