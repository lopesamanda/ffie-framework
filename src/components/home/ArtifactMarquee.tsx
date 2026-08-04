"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { ArtifactMarqueeItem } from "@/lib/artifact-marquee-items";

type ArtifactMarqueeProps = {
  items: ArtifactMarqueeItem[];
  className?: string;
  /** Single row (Home) or dual opposing lanes (Explore). */
  variant?: "single" | "dual";
  scrollLinked?: boolean;
};

function MarqueeItem({
  item,
  exploreInteractive = false,
}: {
  item: ArtifactMarqueeItem;
  exploreInteractive?: boolean;
}) {
  const isRemote = item.imageSrc.startsWith("http");

  return (
    <Link
      href={item.href}
      data-cursor-lens
      style={{ ["--register-accent" as string]: item.accentColor }}
      className={`group flex w-[168px] shrink-0 flex-col gap-2.5 sm:w-[188px] ${
        exploreInteractive
          ? "transition-[transform] duration-300 [perspective:800px] hover:-translate-y-1 hover:scale-[1.04]"
          : "transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03]"
      }`}
    >
      <div
        className={`overflow-hidden rounded-lg border-2 bg-ffie-surface transition-[border-color,box-shadow] duration-300 ${
          exploreInteractive
            ? "border-ffie-line/60 group-hover:border-[color:var(--register-accent)] group-hover:shadow-[0_10px_24px_rgba(35,19,82,0.14)]"
            : "border-ffie-line/70 shadow-sm group-hover:shadow-md"
        }`}
      >
        <div className="relative aspect-[4/3] bg-ffie-bg">
          {isRemote ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.imageSrc}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <Image
              src={item.imageSrc}
              alt=""
              fill
              className="object-cover"
              sizes="188px"
            />
          )}
        </div>
      </div>
      <p className="truncate px-0.5 text-xs font-semibold text-ffie-ink">{item.name}</p>
    </Link>
  );
}

function SingleMarqueeRow({ items }: { items: ArtifactMarqueeItem[] }) {
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const doubled = [...items, ...items];

  if (items.length === 0) return null;

  if (reduceMotion) {
    return (
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <MarqueeItem key={item.id} item={item} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="relative overflow-hidden py-2"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="flex w-max gap-4 ffie-marquee-track"
        style={{ animationPlayState: paused ? "paused" : "running" }}
      >
        {doubled.map((item, index) => (
          <MarqueeItem key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

function MarqueeLane({
  items,
  direction,
  speed,
  hovered,
}: {
  items: ArtifactMarqueeItem[];
  direction: "left" | "right";
  speed: number;
  hovered: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const doubled = [...items, ...items];
  const baseDuration = Math.max(28, 52 - speed * 18);
  const duration = hovered ? baseDuration * 2.2 : baseDuration;

  if (items.length === 0) return null;

  return (
    <div className="relative overflow-hidden py-2">
      <motion.div
        className="flex w-max gap-4"
        animate={
          reduceMotion
            ? undefined
            : {
                x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration,
                repeat: Infinity,
                ease: "linear",
              }
        }
      >
        {doubled.map((item, index) => (
          <MarqueeItem
            key={`${item.id}-${index}`}
            item={item}
            exploreInteractive
          />
        ))}
      </motion.div>
    </div>
  );
}

export function ArtifactMarquee({
  items,
  className = "",
  variant = "single",
  scrollLinked = false,
}: ArtifactMarqueeProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [laneSplit, setLaneSplit] = useState<[ArtifactMarqueeItem[], ArtifactMarqueeItem[]]>([
    [],
    [],
  ]);
  const [hovered, setHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scrollSpeed = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useEffect(() => {
    if (items.length === 0) {
      setLaneSplit([[], []]);
      return;
    }
    const midpoint = Math.ceil(items.length / 2);
    setLaneSplit([items.slice(0, midpoint), items.slice(midpoint)]);
  }, [items]);

  const [speed, setSpeed] = useState(0.35);

  useEffect(() => {
    if (!scrollLinked) return;
    return scrollSpeed.on("change", (value) => setSpeed(value));
  }, [scrollLinked, scrollSpeed]);

  if (items.length === 0) return null;

  if (variant === "single") {
    return (
      <div ref={sectionRef} className={className}>
        <SingleMarqueeRow items={items} />
      </div>
    );
  }

  const [laneA, laneB] = laneSplit;

  return (
    <div
      ref={sectionRef}
      className={`space-y-3 ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <MarqueeLane items={laneA} direction="left" speed={speed} hovered={hovered} />
      <MarqueeLane
        items={laneB.length > 0 ? laneB : laneA}
        direction="right"
        speed={speed}
        hovered={hovered}
      />
    </div>
  );
}
