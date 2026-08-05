"use client";

import { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type HoldToAnchorButtonProps = {
  onComplete: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  holdingLabel?: string;
  className?: string;
};

const HOLD_MS = 1000;

/** Deliberate press-and-hold CTA — ~1s fill before firing. */
export function HoldToAnchorButton({
  onComplete,
  disabled = false,
  children,
  holdingLabel = "Anchoring…",
  className = "",
}: HoldToAnchorButtonProps) {
  const reduceMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [holding, setHolding] = useState(false);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);

  const cancel = useCallback(() => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    startRef.current = null;
    setHolding(false);
    setProgress(0);
  }, []);

  const tick = useCallback(() => {
    if (startRef.current == null) return;
    const elapsed = Date.now() - startRef.current;
    const next = Math.min(elapsed / HOLD_MS, 1);
    setProgress(next);
    if (next >= 1) {
      cancel();
      onComplete();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [cancel, onComplete]);

  const startHold = useCallback(() => {
    if (disabled) return;
    setHolding(true);
    startRef.current = Date.now();
    if (reduceMotion) {
      onComplete();
      return;
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [disabled, onComplete, reduceMotion, tick]);

  return (
    <button
      type="button"
      disabled={disabled}
      onPointerDown={startHold}
      onPointerUp={cancel}
      onPointerLeave={cancel}
      onPointerCancel={cancel}
      className={`relative overflow-hidden rounded-lg bg-ffie-accent px-6 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    >
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 bg-white/20"
        style={{ width: `${progress * 100}%` }}
        transition={{ duration: 0.05 }}
      />
      <span className="relative">
        {holding && !reduceMotion ? holdingLabel : children}
      </span>
    </button>
  );
}
