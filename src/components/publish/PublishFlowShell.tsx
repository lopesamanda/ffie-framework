"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  FfieEyebrow,
  FfieHeading,
  FfieLead,
} from "@/components/create/design/FfieEyebrow";

type PublishFlowShellProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  /** Stable key for AnimatePresence route transitions. */
  flowKey?: string;
};

export function PublishFlowShell({
  eyebrow,
  title,
  subtitle,
  children,
  flowKey = "publish-flow",
}: PublishFlowShellProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-10 md:py-14">
      <motion.div
        key={flowKey}
        initial={reduceMotion ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-2xl border border-ffie-line bg-ffie-bg shadow-[0_8px_32px_rgba(35,19,82,0.08)]"
        style={{ borderTopWidth: 3, borderTopColor: "var(--color-ffie-accent)" }}
      >
        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <FfieEyebrow>{eyebrow}</FfieEyebrow>
          <div className="mt-2">
            <FfieHeading as="h1">{title}</FfieHeading>
          </div>
          {subtitle && (
            <div className="mt-3 max-w-prose">
              <FfieLead>{subtitle}</FfieLead>
            </div>
          )}
          <div className="mt-8">{children}</div>
        </div>
      </motion.div>
    </div>
  );
}
