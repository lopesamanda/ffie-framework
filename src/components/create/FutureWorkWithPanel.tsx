"use client";

import {
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  FFIE_CARD_TEXT,
  ffieCardDescription,
  ffieCardShell,
  ffieCardTitle,
} from "@/lib/card-layout";

export const FUTURE_WORK_ACTIONS = [
  {
    title: "Backcast it",
    description:
      "What decisions made today would lead here? Use it to open a strategy conversation.",
    icon: "backcast",
  },
  {
    title: "Pre-mortem it",
    description:
      "Treat the Weakness as a risk you're designing against before it happens.",
    icon: "premortem",
  },
  {
    title: "Bring it to a workshop",
    description:
      "Print or project the card and have your team debate what they'd change or achieve in the roadmap.",
    icon: "workshop",
  },
  {
    title: "Start a conversation",
    description:
      "Share it with a colleague and ask if any part of it feels familiar.",
    icon: "conversation",
  },
] as const;

type WorkIconId = (typeof FUTURE_WORK_ACTIONS)[number]["icon"];

function WorkActionIcon({ id }: { id: WorkIconId }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  switch (id) {
    case "backcast":
      return (
        <svg {...common}>
          <path d="M4 12h12" />
          <path d="M10 6l-6 6 6 6" />
          <path d="M20 5v14" />
        </svg>
      );
    case "premortem":
      return (
        <svg {...common}>
          <path d="M12 3v4" />
          <path d="M12 17v4" />
          <circle cx="12" cy="12" r="5" />
          <path d="M12 10v2l1.5 1.5" />
        </svg>
      );
    case "workshop":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="12" rx="1.5" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      );
    case "conversation":
      return (
        <svg {...common}>
          <path d="M5 6h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H9l-4 3v-3H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
          <path d="M15 9h3a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-1v2l-3-2" />
        </svg>
      );
  }
}

export function FutureWorkActionsGrid({
  reduceMotion,
}: {
  reduceMotion: boolean | null;
}) {
  return (
    <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
      {FUTURE_WORK_ACTIONS.map((action, index) => (
        <motion.div
          key={action.title}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={
            reduceMotion
              ? { duration: 0 }
              : {
                  duration: 0.42,
                  ease: [0.16, 1, 0.3, 1],
                  delay: 0.28 + index * 0.07,
                }
          }
          className={`flex flex-col gap-3 px-0 py-4 sm:px-5 sm:py-1 ${
            index > 0
              ? "border-t border-ffie-line/60 sm:border-t-0 sm:border-l"
              : ""
          }`}
        >
          <span
            className="inline-flex size-7 items-center justify-center rounded-full border border-ffie-line bg-ffie-surface text-[11px] font-semibold tracking-wide text-ffie-ink"
            aria-hidden
          >
            {index + 1}
          </span>
          <span className="text-ffie-accent">
            <WorkActionIcon id={action.icon} />
          </span>
          <h4 className={`${ffieCardTitle} text-sm ${FFIE_CARD_TEXT}`}>
            {action.title}
          </h4>
          <p
            className={`${ffieCardDescription} not-italic leading-snug ${FFIE_CARD_TEXT}`}
          >
            {action.description}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

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
  footer,
}: {
  layoutRef: RefObject<HTMLElement | null>;
  sourceRef: RefObject<HTMLElement | null>;
  footer?: ReactNode;
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
          {FUTURE_WORK_ACTIONS.map((action, index) => (
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

        {footer}
      </motion.aside>
    </>
  );
}
