"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { CardCategory } from "@/data/narrative-cards";
import {
  CATEGORY_STYLES,
  ORACLE_CATEGORY_LABELS,
} from "@/lib/category-styles";

const FAN_CATEGORIES: CardCategory[] = ["risk", "benefit", "trust", "barrier"];
const BASE_ROTATIONS = [0, 7, 14, 21] as const;

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
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
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
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
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
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
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
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden>
          <circle
            cx="12"
            cy="12"
            r="8"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
          />
          <path d="M7 7 L17 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function PreviewCoverCard({
  category,
  rotation,
  zIndex,
  hovered,
  reduceMotion,
  index,
}: {
  category: CardCategory;
  rotation: number;
  zIndex: number;
  hovered: boolean;
  reduceMotion: boolean | null;
  index: number;
}) {
  const style = CATEGORY_STYLES[category];
  const label = ORACLE_CATEGORY_LABELS[category].toUpperCase();
  const openOffset = hovered ? 3 : 1.5;

  return (
    <motion.div
      className="absolute bottom-0 left-1/2 origin-bottom-left"
      style={{ zIndex, marginLeft: "-36px" }}
      animate={
        reduceMotion
          ? { rotate: rotation + (hovered ? 2 : 0), y: 0 }
          : {
              rotate: [
                rotation,
                rotation + openOffset,
                rotation + openOffset * 0.5,
                rotation,
              ],
              y: [0, -2, -1, 0],
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : {
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.18,
            }
      }
    >
      <div
        className="flex h-[118px] w-[72px] flex-col items-center justify-between rounded-[10px] px-2 py-3 shadow-[0_4px_14px_rgba(35,19,82,0.18)]"
        style={{ backgroundColor: style.coverFill }}
      >
        <span className="text-center text-[6px] font-semibold uppercase leading-tight tracking-[0.08em] text-white/55">
          {label}
        </span>
        <CategoryMark category={category} color={style.coverText} />
        <span className="h-1.5" aria-hidden />
      </div>
    </motion.div>
  );
}

/** Decorative Oracle Draw fan for the Home Create card — non-interactive preview. */
export function HomeOracleFanPreview({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative mx-auto flex h-[200px] w-full max-w-[220px] items-end justify-center ${className}`}
      aria-hidden
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-[118px] w-[150px]">
        {FAN_CATEGORIES.map((category, index) => (
          <PreviewCoverCard
            key={category}
            category={category}
            rotation={BASE_ROTATIONS[index]}
            zIndex={index + 1}
            hovered={hovered}
            reduceMotion={reduceMotion}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
