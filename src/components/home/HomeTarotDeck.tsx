"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CardCategory } from "@/data/narrative-cards";
import {
  CATEGORY_STYLES,
  ORACLE_CATEGORY_LABELS,
} from "@/lib/category-styles";
import { ffieCardShell } from "@/lib/card-layout";

const REGISTER: {
  category: CardCategory;
  description: string;
}[] = [
  {
    category: "risk",
    description: "What could go wrong — structurally, not hypothetically.",
  },
  {
    category: "benefit",
    description: "What AI promises to deliver, and at what cost.",
  },
  {
    category: "trust",
    description: "Who is believed, and who is excluded from belief.",
  },
  {
    category: "barrier",
    description: "What prevents access, agency, or exit.",
  },
];

const FAN_ROTATIONS = [-14, -5, 5, 14] as const;
const SPREAD_X = [-210, -70, 70, 210] as const;

function CategoryMark({
  category,
  color,
}: {
  category: CardCategory;
  color: string;
}) {
  switch (category) {
    case "risk":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 4 L20 19 H4 Z"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12 9 V13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="16.5" r="1" fill={color} />
        </svg>
      );
    case "benefit":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 3 L14.5 9 H21 L15.8 13 L17.8 19.5 L12 15.5 L6.2 19.5 L8.2 13 L3 9 H9.5 Z"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "trust":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <path
            d="M12 4 L19 8 V13 C19 17 12 20 12 20 C12 20 5 17 5 13 V8 Z"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "barrier":
      return (
        <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
          <circle cx="12" cy="12" r="8" fill="none" stroke={color} strokeWidth="1.8" />
          <path d="M7 7 L17 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function TarotCard({
  category,
  index,
  deckHovered,
  flipped,
  selected,
  onSelect,
  reduceMotion,
}: {
  category: CardCategory;
  index: number;
  deckHovered: boolean;
  flipped: boolean;
  selected: boolean;
  onSelect: () => void;
  reduceMotion: boolean | null;
}) {
  const style = CATEGORY_STYLES[category];
  const label = ORACLE_CATEGORY_LABELS[category];
  const register = REGISTER.find((item) => item.category === category)!;

  const fanX = deckHovered ? SPREAD_X[index] : index * 18 - 27;
  const fanRotate = deckHovered ? 0 : FAN_ROTATIONS[index];

  return (
    <motion.button
      type="button"
      data-cursor-lens
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${label}. ${register.description}`}
      className="absolute bottom-0 left-1/2 h-[200px] w-[128px] cursor-pointer [perspective:900px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ffie-accent"
      style={{
        zIndex: selected ? 20 : index + 2,
        marginLeft: -64,
      }}
      animate={
        reduceMotion
          ? { x: fanX, rotate: fanRotate, y: selected ? -8 : 0 }
          : {
              x: fanX,
              rotate: fanRotate,
              y: selected ? -10 : deckHovered ? -6 : 0,
            }
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      <motion.div
        className="relative h-full w-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
        }
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-between rounded-xl border border-white/20 px-3 py-4 shadow-[0_8px_24px_rgba(35,19,82,0.2)] [backface-visibility:hidden]"
          style={{ backgroundColor: style.bg }}
        >
          <span
            className="text-center text-[9px] font-semibold uppercase tracking-[0.12em]"
            style={{ color: style.text }}
          >
            {label}
          </span>
          <CategoryMark category={category} color={style.text} />
          <span className="h-2" aria-hidden />
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl px-4 py-5 text-center shadow-[0_8px_24px_rgba(35,19,82,0.2)] [backface-visibility:hidden] [transform:rotateY(180deg)]"
          style={{ backgroundColor: style.coverFill, color: style.coverText }}
        >
          <p className="text-sm leading-snug font-medium">{register.description}</p>
        </div>
      </motion.div>
    </motion.button>
  );
}

export function HomeTarotDeck() {
  const reduceMotion = useReducedMotion();
  const [deckHovered, setDeckHovered] = useState(false);
  const [selected, setSelected] = useState<CardCategory | null>(null);
  const [flipped, setFlipped] = useState<Record<CardCategory, boolean>>({
    risk: false,
    benefit: false,
    trust: false,
    barrier: false,
    transversal: false,
  });

  const handleSelect = (category: CardCategory) => {
    setFlipped((current) => {
      const next = { ...current };
      for (const key of REGISTER.map((item) => item.category)) {
        next[key] = key === category ? !current[category] : false;
      }
      return next;
    });
    setSelected((current) => (current === category ? null : category));
  };

  const activeRegister = REGISTER.find((item) => item.category === selected);

  return (
    <div className="mt-10 md:mt-12">
      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-muted">
        Four narrative registers
      </p>

      <div
        className="relative mx-auto mt-4 h-[240px] max-w-3xl"
        onMouseEnter={() => setDeckHovered(true)}
        onMouseLeave={() => setDeckHovered(false)}
      >
        {REGISTER.map(({ category }, index) => (
          <TarotCard
            key={category}
            category={category}
            index={index}
            deckHovered={deckHovered}
            flipped={flipped[category]}
            selected={selected === category}
            onSelect={() => handleSelect(category)}
            reduceMotion={reduceMotion}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeRegister && (
          <motion.div
            key={activeRegister.category}
            initial={reduceMotion ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`mx-auto mt-6 max-w-xl px-5 py-4 ${ffieCardShell}`}
            style={{
              backgroundColor: CATEGORY_STYLES[activeRegister.category].bg,
              borderColor: CATEGORY_STYLES[activeRegister.category].border,
            }}
          >
            <p
              className="font-display text-lg font-bold"
              style={{ color: CATEGORY_STYLES[activeRegister.category].text }}
            >
              {ORACLE_CATEGORY_LABELS[activeRegister.category]}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ffie-ink/85">
              {activeRegister.description}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ffie-muted">
              These registers surface through Oracle Draw during Create — each card
              names a structural tension your character carries into the future.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
