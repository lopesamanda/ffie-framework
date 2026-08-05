"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

type MatrixAxisBackdropProps = {
  className?: string;
};

/** Minimal animated axis diagram — linework only, no glow. */
export function MatrixAxisBackdrop({ className = "" }: MatrixAxisBackdropProps) {
  const reduceMotion = useReducedMotion();
  const [hoveredAxis, setHoveredAxis] = useState<"h" | "v" | null>(null);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 h-full w-full opacity-[0.55]"
        preserveAspectRatio="xMidYMid meet"
      >
        <motion.line
          x1="48"
          y1="352"
          x2="352"
          y2="352"
          stroke="#231352"
          strokeWidth="1"
          animate={
            reduceMotion
              ? undefined
              : { strokeOpacity: hoveredAxis === "h" ? 0.55 : [0.22, 0.32, 0.22] }
          }
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line
          x1="48"
          y1="48"
          x2="48"
          y2="352"
          stroke="#231352"
          strokeWidth="1"
          animate={
            reduceMotion
              ? undefined
              : { strokeOpacity: hoveredAxis === "v" ? 0.55 : [0.22, 0.32, 0.22] }
          }
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
      </svg>

      <div className="pointer-events-auto absolute inset-0">
        <button
          type="button"
          className="absolute bottom-[6%] left-[8%] right-[8%] h-[14%] cursor-default opacity-0"
          onMouseEnter={() => setHoveredAxis("h")}
          onMouseLeave={() => setHoveredAxis(null)}
          tabIndex={-1}
          aria-hidden
        />
        <button
          type="button"
          className="absolute bottom-[8%] left-[4%] top-[8%] w-[14%] cursor-default opacity-0"
          onMouseEnter={() => setHoveredAxis("v")}
          onMouseLeave={() => setHoveredAxis(null)}
          tabIndex={-1}
          aria-hidden
        />
      </div>

      <div className="pointer-events-none absolute inset-0 text-[10px] font-medium text-ffie-muted">
        <span className="absolute bottom-[3%] left-[8%]">Extractive</span>
        <span className="absolute bottom-[3%] right-[8%]">Emancipatory</span>
        <span className="absolute left-[1%] top-1/2 -translate-y-1/2 -rotate-90">
          Hierarchical
        </span>
        <span className="absolute left-[1%] top-[12%] -rotate-90">Collective Care</span>
      </div>

      {hoveredAxis && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pointer-events-none absolute bottom-4 left-1/2 max-w-xs -translate-x-1/2 rounded-lg border border-ffie-line bg-ffie-surface/95 px-3 py-2 text-center text-[11px] leading-snug text-ffie-muted shadow-sm"
        >
          {hoveredAxis === "h"
            ? "System Logic — Extractive ↔ Emancipatory"
            : "Power Organization — Hierarchical ↔ Collective Care"}
        </motion.p>
      )}
    </div>
  );
}
