"use client";

import { motion, useReducedMotion } from "framer-motion";
import { PhaseTimeline } from "@/components/create/design/PhaseTimeline";
import {
  FfieEyebrow,
  FfieHeading,
  FfieLead,
} from "@/components/create/design/FfieEyebrow";
import { STAGE_META } from "@/lib/create-stage-meta";
import type { JourneyStage } from "@/lib/journey/types";

type Props = {
  stage: JourneyStage;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  showTimeline?: boolean;
  children: React.ReactNode;
};

export function CreateStageShell({
  stage,
  eyebrow,
  title,
  subtitle,
  showTimeline = true,
  children,
}: Props) {
  const meta = STAGE_META[stage];
  const reduceMotion = useReducedMotion();

  return (
    <div className="overflow-hidden rounded-2xl border border-ffie-line bg-ffie-bg shadow-[0_8px_32px_rgba(35,19,82,0.08)]">
      {showTimeline && (
        <div className="border-b border-ffie-line/50 bg-ffie-surface px-6 py-3 sm:px-10">
          <div className="flex flex-wrap items-center gap-4">
            <PhaseTimeline current={stage} />
            <FfieEyebrow muted>{meta.phaseLabel}</FfieEyebrow>
          </div>
        </div>
      )}

      <motion.div
        key={stage}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="px-6 py-8 sm:px-10 sm:py-10"
      >
        <FfieEyebrow>{eyebrow ?? meta.eyebrow}</FfieEyebrow>
        <div className="mt-2">
          <FfieHeading>{title ?? meta.title}</FfieHeading>
        </div>
        {(subtitle ?? meta.subtitle) && (
          <div className="mt-3">
            <FfieLead>{subtitle ?? meta.subtitle}</FfieLead>
          </div>
        )}
        <div className="mt-8">{children}</div>
      </motion.div>
    </div>
  );
}
