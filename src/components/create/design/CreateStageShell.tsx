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
  /** Entry uses timeline only — no duplicate title block (Figma Entry frame). */
  headerMode?: "default" | "entry";
  /** Full-bleed hero cover — no card chrome (Figma Screen0). */
  variant?: "default" | "cover";
  children: React.ReactNode;
};

export function CreateStageShell({
  stage,
  eyebrow,
  title,
  subtitle,
  showTimeline = true,
  headerMode = "default",
  variant = "default",
  children,
}: Props) {
  const meta = STAGE_META[stage];
  const reduceMotion = useReducedMotion();
  const isEntry = headerMode === "entry";
  const isCover = variant === "cover";
  const resolvedTitle = title ?? meta.title;
  const resolvedSubtitle = subtitle ?? meta.subtitle;

  return (
    <div
      className={
        isCover
          ? "overflow-hidden"
          : "overflow-hidden rounded-2xl border border-ffie-line bg-ffie-bg shadow-[0_8px_32px_rgba(35,19,82,0.08)]"
      }
      style={
        isCover ? undefined : { borderTopWidth: 3, borderTopColor: meta.accentColor }
      }
    >
      {showTimeline && !isCover && (
        <div className="border-b border-ffie-line/50 bg-ffie-surface px-6 py-3 sm:px-10">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <PhaseTimeline current={stage} />
            <FfieEyebrow muted className="shrink-0">
              {meta.phaseLabel}
            </FfieEyebrow>
          </div>
        </div>
      )}

      <motion.div
        key={stage}
        initial={reduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className={isCover ? undefined : "px-6 py-8 sm:px-10 sm:py-10"}
      >
        {!isEntry && (
          <>
            <FfieEyebrow>{eyebrow ?? meta.eyebrow}</FfieEyebrow>
            <div className="mt-2">
              <FfieHeading as="h1">{resolvedTitle}</FfieHeading>
            </div>
            {resolvedSubtitle && (
              <div className="mt-3 max-w-prose">
                <FfieLead>{resolvedSubtitle}</FfieLead>
              </div>
            )}
          </>
        )}
        <div className={isEntry ? undefined : "mt-8"}>{children}</div>
      </motion.div>
    </div>
  );
}
