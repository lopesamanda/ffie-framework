"use client";

import {
  useState,
  useRef,
  useEffect,
  type ReactNode,
  type FocusEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { GLOSSARY, type GlossaryTermId } from "@/lib/glossary";

export function SpeculativeTooltip({
  term,
  children,
}: {
  term: GlossaryTermId;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const entry = GLOSSARY[term];

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
    },
    [],
  );

  const show = () => {
    timeoutRef.current = setTimeout(() => setOpen(true), 350);
  };

  const hide = () => {
    clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  const handleBlur = (event: FocusEvent<HTMLSpanElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      hide();
    }
  };

  return (
    <span
      className="relative inline-block cursor-help underline decoration-dotted underline-offset-4 decoration-ffie-accent/40"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={handleBlur}
      tabIndex={0}
    >
      {children}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 4 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            role="tooltip"
            className={`absolute left-0 top-full z-50 mt-2 w-72 rounded-lg border border-ffie-line border-l-[3px] ${entry.registerColor} bg-ffie-surface p-4 shadow-[0_8px_24px_rgba(35,19,82,0.08)]`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-semibold text-ffie-ink">
                {entry.term}
              </span>
              <span className="shrink-0 rounded-full bg-ffie-accent-soft px-2 py-0.5 text-[10px] uppercase tracking-wide text-ffie-accent">
                {entry.reference}
              </span>
            </div>
            <p className="mt-1 text-xs text-ffie-muted">
              also known as {entry.conventionalTerm}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ffie-ink/90">
              {entry.definition}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
