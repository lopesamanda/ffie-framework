"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { CardCategory } from "@/data/narrative-cards";
import { RegisterDeckCardFace } from "@/components/register/RegisterDeckCardFace";
import {
  CATEGORY_STYLES,
  ORACLE_CATEGORY_LABELS,
} from "@/lib/category-styles";
import { ffieCardShell } from "@/lib/card-layout";
import {
  REGISTER_DECK,
  REGISTER_DECK_FAN,
} from "@/lib/register-deck-data";
import { useMediaQuery } from "@/hooks/useMediaQuery";

function TarotCard({
  entry,
  index,
  deckHovered,
  flipped,
  selected,
  onSelect,
  reduceMotion,
  spreadScale,
}: {
  entry: (typeof REGISTER_DECK)[number];
  index: number;
  deckHovered: boolean;
  flipped: boolean;
  selected: boolean;
  onSelect: () => void;
  reduceMotion: boolean | null;
  spreadScale: number;
}) {
  const label = ORACLE_CATEGORY_LABELS[entry.category];
  const fanX = deckHovered
    ? REGISTER_DECK_FAN.spreadX[index] * spreadScale
    : REGISTER_DECK_FAN.stackedOffset(index) * spreadScale;
  const fanRotate = deckHovered ? 0 : REGISTER_DECK_FAN.rotations[index];

  return (
    <motion.button
      type="button"
      data-cursor-lens
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${label}. ${entry.description}`}
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
        <div className="absolute inset-0 [backface-visibility:hidden]">
          <RegisterDeckCardFace entry={entry} variant="cover" className="h-full" />
        </div>
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <RegisterDeckCardFace entry={entry} variant="back" className="h-full" />
        </div>
      </motion.div>
    </motion.button>
  );
}

export function HomeTarotDeck() {
  const reduceMotion = useReducedMotion();
  const isWide = useMediaQuery("(min-width: 768px)");
  const spreadScale = isWide ? 1 : 0.42;
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
      for (const key of REGISTER_DECK.map((item) => item.category)) {
        next[key] = key === category ? !current[category] : false;
      }
      return next;
    });
    setSelected((current) => (current === category ? null : category));
  };

  const activeRegister = REGISTER_DECK.find((item) => item.category === selected);

  return (
    <div className="mt-10 md:mt-12">
      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-muted">
        Five narrative registers
      </p>

      <div
        className="relative mx-auto mt-4 h-[240px] max-w-5xl overflow-x-hidden px-2"
        onMouseEnter={() => setDeckHovered(true)}
        onMouseLeave={() => setDeckHovered(false)}
      >
        {REGISTER_DECK.map((entry, index) => (
          <TarotCard
            key={entry.category}
            entry={entry}
            index={index}
            deckHovered={deckHovered}
            flipped={flipped[entry.category]}
            selected={selected === entry.category}
            onSelect={() => handleSelect(entry.category)}
            reduceMotion={reduceMotion}
            spreadScale={spreadScale}
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
