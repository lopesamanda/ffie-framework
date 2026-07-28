"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FFIE_CARD_TEXT,
  ffieCardDescription,
  ffieCardShell,
  ffieCardTitle,
} from "@/lib/card-layout";

const WORK_ACTIONS = [
  {
    title: "Backcast it",
    description:
      "What decisions made today would lead here? Use it to open a strategy conversation.",
  },
  {
    title: "Pre-mortem it",
    description:
      "Treat the Weakness as a risk you're designing against before it happens.",
  },
  {
    title: "Bring it to a workshop",
    description:
      "Print or project the card and have your team debate what they'd change in the roadmap to avoid or achieve this future.",
  },
  {
    title: "Start a conversation",
    description:
      "Share it with a colleague and ask if any part of it feels familiar.",
  },
] as const;

type LineSegment = { x1: number; y1: number; x2: number; y2: number };

function useRadiatingLines(
  layoutRef: RefObject<HTMLElement | null>,
  sourceRef: RefObject<HTMLElement | null>,
  targetRefs: RefObject<(HTMLDivElement | null)[]>,
  enabled: boolean,
  measureKey: number,
) {
  const [lines, setLines] = useState<LineSegment[]>([]);

  useLayoutEffect(() => {
    if (!enabled) {
      setLines([]);
      return;
    }

    const update = () => {
      const layout = layoutRef.current;
      const source = sourceRef.current;
      if (!layout || !source) return;

      const layoutRect = layout.getBoundingClientRect();
      const sourceRect = source.getBoundingClientRect();
      const targets = targetRefs.current;

      const nextLines: LineSegment[] = [];
      targets.forEach((target, index) => {
        if (!target) return;
        const targetRect = target.getBoundingClientRect();
        const anchorT = 0.18 + index * 0.22;
        nextLines.push({
          x1: sourceRect.right - layoutRect.left,
          y1: sourceRect.top + sourceRect.height * anchorT - layoutRect.top,
          x2: targetRect.left - layoutRect.left,
          y2: targetRect.top + targetRect.height / 2 - layoutRect.top,
        });
      });

      setLines(nextLines);
    };

    update();
    const settleTimer = window.setTimeout(update, 560);

    const ro = new ResizeObserver(update);
    if (layoutRef.current) ro.observe(layoutRef.current);
    if (sourceRef.current) ro.observe(sourceRef.current);
    targetRefs.current.forEach((el) => {
      if (el) ro.observe(el);
    });

    window.addEventListener("resize", update);
    return () => {
      window.clearTimeout(settleTimer);
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [enabled, layoutRef, sourceRef, targetRefs, measureKey]);

  return lines;
}

function WorkActionCard({
  title,
  description,
  setCardRef,
  index,
  reduceMotion,
}: {
  title: string;
  description: string;
  setCardRef: (el: HTMLDivElement | null) => void;
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      ref={setCardRef}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.42, ease: [0.16, 1, 0.3, 1], delay: 0.28 + index * 0.07 }
      }
      className={`${ffieCardShell} bg-ffie-bg/50 px-4 py-3.5`}
    >
      <h4 className={`${ffieCardTitle} text-sm ${FFIE_CARD_TEXT}`}>{title}</h4>
      <p
        className={`mt-1.5 ${ffieCardDescription} not-italic leading-snug ${FFIE_CARD_TEXT}`}
      >
        {description}
      </p>
    </motion.div>
  );
}

function RadiatingLines({
  lines,
  reduceMotion,
}: {
  lines: LineSegment[];
  reduceMotion: boolean | null;
}) {
  if (lines.length === 0) return null;

  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 hidden overflow-visible lg:block"
    >
      <defs>
        <linearGradient id="future-work-line" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(110, 82, 196, 0.38)" />
          <stop offset="55%" stopColor="rgba(110, 82, 196, 0.16)" />
          <stop offset="100%" stopColor="rgba(110, 82, 196, 0.06)" />
        </linearGradient>
      </defs>
      {lines.map((line, index) => {
        const length = Math.hypot(line.x2 - line.x1, line.y2 - line.y1);
        return (
          <motion.line
            key={index}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
            stroke="url(#future-work-line)"
            strokeWidth={1}
            strokeLinecap="round"
            strokeDasharray={length}
            initial={reduceMotion ? false : { strokeDashoffset: length, opacity: 0 }}
            animate={{ strokeDashoffset: 0, opacity: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : {
                    duration: 0.55,
                    ease: [0.4, 0, 0.2, 1],
                    delay: 0.18 + index * 0.06,
                  }
            }
          />
        );
      })}
    </svg>
  );
}

export function FutureWorkWithPanel({
  layoutRef,
  sourceRef,
}: {
  layoutRef: RefObject<HTMLElement | null>;
  sourceRef: RefObject<HTMLElement | null>;
}) {
  const reduceMotion = useReducedMotion();
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [desktopLayout, setDesktopLayout] = useState(false);
  const [refsVersion, setRefsVersion] = useState(0);

  const registerCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (cardRefs.current[index] === el) return;
    cardRefs.current[index] = el;
    setRefsVersion((version) => version + 1);
  };

  useLayoutEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setDesktopLayout(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const lines = useRadiatingLines(
    layoutRef,
    sourceRef,
    cardRefs,
    desktopLayout,
    refsVersion,
  );

  return (
    <>
      <RadiatingLines lines={lines} reduceMotion={reduceMotion} />
      <motion.aside
        className="mt-8 w-full lg:mt-0 lg:flex-1 lg:pl-10 xl:pl-12"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={
          reduceMotion ? { duration: 0 } : { duration: 0.45, delay: 0.22 }
        }
        aria-labelledby="future-work-with-heading"
      >
        <motion.h3
          id="future-work-with-heading"
          className="font-display text-base font-semibold text-ffie-ink"
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : { duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.24 }
          }
        >
          How can you work with this future?
        </motion.h3>

        <div className="relative mt-4 space-y-3 lg:max-w-sm">
          {WORK_ACTIONS.map((action, index) => (
            <WorkActionCard
              key={action.title}
              title={action.title}
              description={action.description}
              index={index}
              reduceMotion={reduceMotion}
              setCardRef={registerCardRef(index)}
            />
          ))}
        </div>
      </motion.aside>
    </>
  );
}
