"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HeroReactiveCanvas } from "@/components/home/HeroReactiveCanvas";
import { HomeTarotDeck } from "@/components/home/HomeTarotDeck";

const HEADLINE =
  "Explore futures. Create your own. See where power and care collide.";
const HEADLINE_WORDS = HEADLINE.split(" ");
const WORD_STAGGER_S = 0.05;

function KineticHeadline({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ffie-ink md:text-5xl">
      {HEADLINE_WORDS.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            delay: reduceMotion ? 0 : index * WORD_STAGGER_S,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {word}
          {index < HEADLINE_WORDS.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </h1>
  );
}

export function HomeClosingCta() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-ffie-line/60 py-20 md:py-28">
      <HeroReactiveCanvas className="opacity-70" />
      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
          Your turn
        </p>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ffie-ink md:text-4xl">
          Draw cards. Build a future. Place it on the matrix.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ffie-muted">
          A guided journey from narrative tension to a shareable diegetic prototype
          — embodied, materialized, and ready for debate.
        </p>
        <motion.div
          className="mt-8"
          whileHover={reduceMotion ? undefined : { scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        >
          <Link
            href="/create"
            data-cursor-lens
            className="inline-flex items-center justify-center rounded-lg bg-ffie-accent px-8 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-ffie-accent/90"
          >
            Start creating →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

export function HomeHero() {
  const reduceMotion = useReducedMotion() ?? false;

  return (
    <section className="relative overflow-hidden pb-6 md:pb-10">
      <HeroReactiveCanvas />
      <div className="ffie-grain pointer-events-none absolute inset-0" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 py-10 md:py-14">
        <div className="max-w-prose">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
            Feminist Foresight in Innovation Ecosystems
          </p>
          <KineticHeadline reduceMotion={reduceMotion} />
          <p className="mt-5 text-lg leading-relaxed text-ffie-muted">
            FFIE is a research-based method for exploring AI&apos;s impact on
            innovation ecosystems. Build a persona, design an artifact they use,
            and place it on the Critical Feminist Matrix to see what future it
            creates.
          </p>
        </div>

        <HomeTarotDeck />
      </div>
    </section>
  );
}
