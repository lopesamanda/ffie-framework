"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionStyle,
} from "framer-motion";
import { QUADRANT_COLORS } from "@/types/future";

const HEADLINE =
  "Explore futures. Create your own. See where power and care collide.";
const HEADLINE_WORDS = HEADLINE.split(" ");
const WORD_STAGGER_S = 0.05;

const AMBIENT_BLOBS = [
  {
    color: QUADRANT_COLORS.techno_optimist,
    top: "6%",
    left: "4%",
    size: "min(44vw, 400px)",
    drift: { x: [0, 18, -10, 0], y: [0, -14, 8, 0] },
    duration: 32,
  },
  {
    color: QUADRANT_COLORS.feminist_preferred,
    top: "10%",
    right: "6%",
    size: "min(46vw, 420px)",
    drift: { x: [0, -12, 16, 0], y: [0, 10, -12, 0] },
    duration: 36,
  },
  {
    color: QUADRANT_COLORS.dominant_dystopian,
    bottom: "12%",
    left: "8%",
    size: "min(40vw, 360px)",
    drift: { x: [0, 10, -14, 0], y: [0, 12, -8, 0] },
    duration: 30,
  },
  {
    color: QUADRANT_COLORS.fragmented,
    bottom: "8%",
    right: "4%",
    size: "min(42vw, 380px)",
    drift: { x: [0, -16, 12, 0], y: [0, -8, 14, 0] },
    duration: 34,
  },
] as const;

function AmbientMatrixField({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden ffie-grain">
      <div
        className="absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse 90% 75% at 50% 35%, color-mix(in srgb, var(--color-ffie-accent) 14%, transparent) 0%, transparent 68%)",
            "radial-gradient(ellipse 60% 50% at 72% 58%, color-mix(in srgb, var(--color-ffie-accent-soft) 55%, transparent) 0%, transparent 72%)",
          ].join(", "),
        }}
      />
      {AMBIENT_BLOBS.map((blob, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full blur-3xl"
          style={{
            backgroundColor: blob.color,
            opacity: 0.28,
            width: blob.size,
            height: blob.size,
            top: blob.top,
            left: "left" in blob ? blob.left : undefined,
            right: "right" in blob ? blob.right : undefined,
            bottom: "bottom" in blob ? blob.bottom : undefined,
          }}
          animate={reduceMotion ? undefined : blob.drift}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: blob.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }
          }
        />
      ))}
    </div>
  );
}

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

export function HomeHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const motionEnabled = !reduceMotion;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.12]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -56]);
  const foregroundOpacity = useTransform(scrollYProgress, [0, 0.95], [1, 0.88]);

  const backgroundMotionStyle: MotionStyle | undefined = motionEnabled
    ? { opacity: backgroundOpacity, y: backgroundY }
    : undefined;

  const foregroundMotionStyle: MotionStyle | undefined = motionEnabled
    ? { y: foregroundY, opacity: foregroundOpacity }
    : undefined;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[min(88vh,820px)] overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={backgroundMotionStyle}
      >
        <AmbientMatrixField reduceMotion={!motionEnabled} />
      </motion.div>

      <motion.div
        className="relative mx-auto max-w-6xl px-6 py-16 md:py-24"
        style={foregroundMotionStyle}
      >
        <div className="max-w-prose">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
            Feminist Foresight in Innovation Ecosystems
          </p>
          <KineticHeadline reduceMotion={!motionEnabled} />
          <p className="mt-6 text-lg leading-relaxed text-ffie-muted">
            FFIE is a research-validated foresight method for innovation
            ecosystems. Its replicable unit is simple and powerful:{" "}
            <strong className="font-medium text-ffie-ink">
              persona + diegetic artifact, positioned on the Critical Feminist
              2×2 Matrix
            </strong>
            . This is an instrument for engaging with feminist foresight
            directly — not a site that explains a framework from the sidelines.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
