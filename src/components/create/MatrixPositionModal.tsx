"use client";

import { useEffect } from "react";
import { InteractiveMatrixReveal } from "@/components/create/InteractiveMatrixReveal";
import { formatQuadrantLabel, quadrantFromPosition } from "@/lib/journey/types";

export function MatrixPositionModal({
  open,
  onClose,
  position,
}: {
  open: boolean;
  onClose: () => void;
  position: { x: number; y: number };
}) {
  const quadrant = quadrantFromPosition(position.x, position.y);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="matrix-modal-title"
    >
      <button
        type="button"
        aria-label="Close matrix view"
        className="absolute inset-0 bg-[rgba(35,19,82,0.45)] backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl border border-ffie-line bg-ffie-surface p-4 shadow-[0_24px_64px_rgba(35,19,82,0.22)] sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <p
              id="matrix-modal-title"
              className="font-display text-lg font-bold text-ffie-ink"
            >
              {formatQuadrantLabel(quadrant)}
            </p>
            <p className="mt-1 text-sm text-ffie-muted">
              Your future on the Critical Feminist Matrix
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-ffie-line px-3 py-1.5 text-sm font-medium text-ffie-muted transition hover:border-ffie-accent/40 hover:text-ffie-ink"
          >
            Close
          </button>
        </div>
        <InteractiveMatrixReveal
          position={position}
          interactive={false}
          prominent
          hidePlacementCaption
        />
      </div>
    </div>
  );
}
