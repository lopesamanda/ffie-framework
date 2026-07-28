"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { DiagonalLineSweep } from "@/components/motion/DiagonalLineSweep";

const DEFAULT_DURATION_MS = 650;

/** Brief full-viewport diagonal sweep between major Create journey phases. */
export function PhaseSweepOverlay({
  active,
  durationMs = DEFAULT_DURATION_MS,
  onComplete,
}: {
  active: boolean;
  durationMs?: number;
  onComplete: () => void;
}) {
  useEffect(() => {
    if (!active) return;
    const timer = window.setTimeout(onComplete, durationMs);
    return () => window.clearTimeout(timer);
  }, [active, durationMs, onComplete]);

  if (!active || typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] bg-ffie-bg/92"
      aria-hidden
    >
      <DiagonalLineSweep durationMs={durationMs} />
    </div>,
    document.body,
  );
}
