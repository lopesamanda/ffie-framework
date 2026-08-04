"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { FFIE_CARD_TEXT } from "@/lib/card-layout";

export type MatrixAnchor = { x: number; y: number };

const CARD_WIDTH = 300;
const MOBILE_BREAKPOINT = "(max-width: 1023px)";

function computeAnchoredPosition(
  anchor: MatrixAnchor,
  container: HTMLElement,
): { left: number; top: number } {
  const padding = 12;
  const maxWidth = Math.min(CARD_WIDTH, container.clientWidth - padding * 2);
  const estimatedHeight = 240;

  let left = anchor.x + 18;
  let top = anchor.y - 24;

  if (left + maxWidth > container.clientWidth - padding) {
    left = anchor.x - maxWidth - 18;
  }

  left = Math.max(
    padding,
    Math.min(left, container.clientWidth - maxWidth - padding),
  );
  top = Math.max(
    padding,
    Math.min(top, container.clientHeight - estimatedHeight - padding),
  );

  return { left, top };
}

type MatrixPointInteractionProps = {
  children: ReactNode;
  open: boolean;
  anchor: MatrixAnchor | null;
  /** Lightweight label shown near the point on mobile before the sheet opens. */
  previewLabel?: string;
  title: string;
  onClose: () => void;
  childrenContent: ReactNode;
  footerLink?: { href: string; label: string };
};

export function MatrixPointInteraction({
  children,
  open,
  anchor,
  previewLabel,
  title,
  onClose,
  childrenContent,
  footerLink,
}: MatrixPointInteractionProps) {
  const reduceMotion = useReducedMotion();
  const isMobile = useMediaQuery(MOBILE_BREAKPOINT);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mobilePhase, setMobilePhase] = useState<"closed" | "preview" | "sheet">(
    "closed",
  );

  useEffect(() => {
    if (!open || !isMobile) {
      setMobilePhase("closed");
      return;
    }

    setMobilePhase("preview");
    const sheetTimer = window.setTimeout(
      () => setMobilePhase("sheet"),
      reduceMotion ? 0 : 320,
    );

    return () => window.clearTimeout(sheetTimer);
  }, [open, isMobile, reduceMotion, anchor?.x, anchor?.y]);

  const showTooltip =
    mobilePhase === "preview" && Boolean(previewLabel && anchor);
  const showSheet = open && isMobile && mobilePhase === "sheet";

  useEffect(() => {
    if (!showSheet) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [showSheet]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const cardPosition =
    open && anchor && containerRef.current && !isMobile
      ? computeAnchoredPosition(anchor, containerRef.current)
      : null;

  const handleBackdropClick = useCallback(
    (event: React.MouseEvent) => {
      if (event.target === event.currentTarget) onClose();
    },
    [onClose],
  );

  return (
    <div ref={containerRef} data-matrix-point-root className="relative">
      {children}

      <AnimatePresence>
        {showTooltip && anchor && (
          <motion.div
            key="matrix-point-tooltip"
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, y: 4 }}
            transition={{ duration: 0.18 }}
            className="pointer-events-none absolute z-30 max-w-[200px] -translate-x-1/2 -translate-y-full rounded-lg border border-ffie-line bg-ffie-surface px-2.5 py-1.5 text-center text-[11px] font-medium text-ffie-ink shadow-sm"
            style={{ left: anchor.x, top: anchor.y - 10 }}
          >
            {previewLabel}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && !isMobile && anchor && cardPosition && (
          <>
            <motion.button
              type="button"
              aria-label="Close detail"
              className="fixed inset-0 z-40 cursor-default bg-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
            <motion.div
              key="matrix-anchored-card"
              role="dialog"
              aria-modal="true"
              aria-labelledby="matrix-point-detail-title"
              initial={
                reduceMotion ? false : { opacity: 0, scale: 0.96, y: 6 }
              }
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={
                reduceMotion ? undefined : { opacity: 0, scale: 0.98, y: 4 }
              }
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="absolute z-50 w-[min(300px,calc(100%-1.5rem))] rounded-xl border border-ffie-line bg-ffie-surface p-4 shadow-[0_12px_40px_rgba(35,19,82,0.16)]"
              style={{ left: cardPosition.left, top: cardPosition.top }}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <h3
                  id="matrix-point-detail-title"
                  className="font-display text-base font-bold leading-snug text-ffie-ink"
                >
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="shrink-0 rounded-md border border-ffie-line px-2 py-0.5 text-xs text-ffie-muted transition hover:border-ffie-accent/40 hover:text-ffie-ink"
                >
                  ✕
                </button>
              </div>
              <div className={`space-y-3 text-sm ${FFIE_CARD_TEXT}`}>
                {childrenContent}
              </div>
              {footerLink && (
                <Link
                  href={footerLink.href}
                  className="mt-4 inline-flex text-sm font-medium text-ffie-accent transition hover:underline"
                >
                  {footerLink.label}
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSheet && (
          <>
            <motion.button
              type="button"
              aria-label="Close detail"
              className="fixed inset-0 z-40 bg-[rgba(35,19,82,0.4)] backdrop-blur-[1px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleBackdropClick}
            />
            <motion.div
              key="matrix-bottom-sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="matrix-sheet-detail-title"
              initial={reduceMotion ? false : { y: "100%" }}
              animate={{ y: 0 }}
              exit={reduceMotion ? undefined : { y: "100%" }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[min(72vh,520px)] overflow-y-auto rounded-t-2xl border border-ffie-line bg-ffie-surface px-5 pb-8 pt-4 shadow-[0_-12px_40px_rgba(35,19,82,0.18)]"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-ffie-line" />
              <div className="mb-4 flex items-start justify-between gap-3">
                <h3
                  id="matrix-sheet-detail-title"
                  className="font-display text-lg font-bold leading-snug text-ffie-ink"
                >
                  {title}
                </h3>
                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="shrink-0 rounded-lg border border-ffie-line px-3 py-1.5 text-sm font-medium text-ffie-muted transition hover:border-ffie-accent/40 hover:text-ffie-ink"
                >
                  ✕
                </button>
              </div>
              <div className={`space-y-3 text-sm ${FFIE_CARD_TEXT}`}>
                {childrenContent}
              </div>
              {footerLink && (
                <Link
                  href={footerLink.href}
                  className="mt-5 inline-flex text-sm font-medium text-ffie-accent transition hover:underline"
                >
                  {footerLink.label}
                </Link>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Compute anchor coords relative to a container from a clicked SVG circle. */
export function matrixAnchorFromCircleClick(
  event: React.MouseEvent<SVGCircleElement>,
  container: HTMLElement | null,
): MatrixAnchor | null {
  if (!container) return null;
  const dotRect = event.currentTarget.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  return {
    x: dotRect.left + dotRect.width / 2 - containerRect.left,
    y: dotRect.top + dotRect.height / 2 - containerRect.top,
  };
}
