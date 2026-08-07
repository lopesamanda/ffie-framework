"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArtifactMaterializePanel } from "@/components/create/ArtifactMaterializePanel";
import { FfieButton } from "@/components/create/design/FfieButton";
import { FutureWorkActionsGrid } from "@/components/create/FutureWorkWithPanel";
import { InteractiveMatrixReveal } from "@/components/create/InteractiveMatrixReveal";
import { PublishPreviewCard } from "@/components/create/PublishPreviewCard";
import { PublishRitualStepper } from "@/components/create/design/PublishRitualStepper";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { PUBLISH_RITUAL } from "@/lib/publish-ritual-copy";
import type { JourneyDraft } from "@/lib/journey/types";

type AnchoredConfirmationScreenProps = {
  draft: JourneyDraft;
  onDownload: () => void;
  downloading: boolean;
  onCreateAnother?: () => void;
};

export function AnchoredConfirmationScreen({
  draft,
  onDownload,
  downloading,
  onCreateAnother,
}: AnchoredConfirmationScreenProps) {
  const reduceMotion = useReducedMotion();
  const [showMaterialize, setShowMaterialize] = useState(false);
  const [copied, setCopied] = useState(false);
  const copy = PUBLISH_RITUAL.confirmation;

  const commonsUrl =
    typeof window !== "undefined" && draft.submittedId
      ? `${window.location.origin}/explore/${draft.submittedId}`
      : typeof window !== "undefined"
        ? `${window.location.origin}/explore`
        : "/explore";

  const handleCopyLink = () => {
    copyToClipboard(commonsUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const handleBringToLife = () => {
    setShowMaterialize(true);
    document.getElementById("anchored-bring-to-life")?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <div className="w-full space-y-10">
      <PublishRitualStepper activeStep={3} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-start">
        <InteractiveMatrixReveal
          position={draft.position}
          hidePlacementCaption
          hideQuadrantCopy
          prominent
          className="w-full max-w-none"
        />
        <PublishPreviewCard draft={draft} id="future-output-card" />
      </div>

      <div className="space-y-3 text-center lg:text-left">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ffie-accent">
          {draft.submittedId ? copy.eyebrow : "Kept private"}
        </p>
        <h2 className="font-display text-2xl font-bold tracking-tight text-ffie-ink md:text-3xl">
          {copy.heading}
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-ffie-muted">
          {draft.submittedId
            ? copy.subtitlePublished(
                draft.artifactName.trim() || draft.title.trim() || "Your future",
              )
            : copy.subtitlePrivate(
                draft.artifactName.trim() || draft.title.trim() || "Your future",
              )}
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <Link href={commonsUrl} className="inline-flex">
          <FfieButton variant="primary">{copy.viewLive}</FfieButton>
        </Link>
        <FfieButton variant="secondary" onClick={handleBringToLife}>
          {copy.bringToLife}
        </FfieButton>
        <FfieButton variant="secondary" onClick={handleCopyLink}>
          {copied ? "Link copied" : copy.copyShareLink}
        </FfieButton>
        <FfieButton variant="secondary" onClick={onDownload} disabled={downloading}>
          {downloading ? "Preparing…" : copy.download}
        </FfieButton>
      </div>

      <div className="w-full space-y-6 border-t border-ffie-line/60 pt-8">
        <h3 className="font-display text-base font-semibold text-ffie-ink">
          {copy.workWithHeading}
        </h3>
        <FutureWorkActionsGrid reduceMotion={reduceMotion} />
      </div>

      {showMaterialize && (
        <motion.div
          id="anchored-bring-to-life"
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
          className="rounded-xl border border-ffie-line/80 bg-ffie-bg/70 px-4 py-5 sm:px-5"
        >
          <p className="text-sm font-medium text-ffie-ink">
            Bring it to life (optional)
          </p>
          <p className="mt-1 text-xs leading-relaxed text-ffie-muted">
            Copy a ready-made image prompt into your external AI tool — nothing
            gets uploaded back into FFIE.
          </p>
          <div className="mt-4">
            <ArtifactMaterializePanel draft={draft} embedded />
          </div>
        </motion.div>
      )}

      {onCreateAnother && (
        <div className="flex flex-wrap gap-3 border-t border-ffie-line/60 pt-8">
          <FfieButton variant="secondary" onClick={onCreateAnother}>
            Create another future
          </FfieButton>
        </div>
      )}

      <PublishRitualStepper activeStep={3} variant="dots" className="pt-2" />
    </div>
  );
}
