"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArtifactMaterializePanel } from "@/components/create/ArtifactMaterializePanel";
import { FfieButton } from "@/components/create/design/FfieButton";
import { FutureWorkActionsGrid } from "@/components/create/FutureWorkWithPanel";
import { InteractiveMatrixReveal } from "@/components/create/InteractiveMatrixReveal";
import { FutureCardPreview } from "@/components/create/FutureCardPreview";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
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

  return (
    <div className="w-full space-y-10">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-start">
        <InteractiveMatrixReveal
          position={draft.position}
          hidePlacementCaption
          hideQuadrantCopy
          prominent
          className="w-full max-w-none"
        />
        <FutureCardPreview
          draft={draft}
          id="future-output-card"
          compact
          showCommonsNarrative
          showCardTags
        />
      </div>

      <div className="space-y-4 text-center lg:text-left">
        {draft.submittedId ? (
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-accent">
            Published to Future Commons
          </p>
        ) : (
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-ffie-muted">
            Kept private
          </p>
        )}
        <h2 className="font-display text-2xl font-bold tracking-tight text-ffie-ink md:text-3xl">
          {draft.submittedId
            ? "Your future is now part of the Commons."
            : "Your future is anchored."}
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-ffie-muted">
          {draft.submittedId
            ? "It will appear on the matrix after moderation. You can share it, download it, or bring the artifact to life with an external image tool."
            : "Download it, share a link to your local copy, or bring the artifact to life with an external image tool."}
        </p>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <Link href={commonsUrl} className="inline-flex">
          <FfieButton variant="primary">View it live</FfieButton>
        </Link>
        <FfieButton
          variant={showMaterialize ? "primary" : "secondary"}
          onClick={() => {
            setShowMaterialize(true);
            document.getElementById("anchored-next-steps")?.scrollIntoView({
              behavior: reduceMotion ? "auto" : "smooth",
              block: "start",
            });
          }}
        >
          Bring it to life
        </FfieButton>
        <FfieButton variant="secondary" onClick={handleCopyLink}>
          {copied ? "Link copied" : "Copy share link"}
        </FfieButton>
        <FfieButton variant="secondary" onClick={onDownload} disabled={downloading}>
          {downloading ? "Preparing…" : "Download this future"}
        </FfieButton>
      </div>

      <div className="w-full space-y-8 border-t border-ffie-line/60 pt-8">
        <div>
          <h3 className="font-display text-base font-semibold text-ffie-ink">
            How can you work with this future?
          </h3>
          <div className="mt-5">
            <FutureWorkActionsGrid reduceMotion={reduceMotion} />
          </div>
        </div>

        <div
          id="anchored-next-steps"
          className="rounded-xl border border-ffie-line/80 bg-ffie-bg/70 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] sm:px-5"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
            Next steps
          </p>
          <p className="mt-2 text-xs leading-relaxed text-ffie-muted">
            Pick any option above — none depends on the others. Use this space
            to copy a ready-made image prompt when you choose Bring it to life.
          </p>
          {showMaterialize && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4"
            >
              <ArtifactMaterializePanel draft={draft} embedded />
            </motion.div>
          )}
        </div>
      </div>

      {onCreateAnother && (
        <div className="flex flex-wrap gap-3 border-t border-ffie-line/60 pt-8">
          <FfieButton variant="secondary" onClick={onCreateAnother}>
            Create another future
          </FfieButton>
        </div>
      )}
    </div>
  );
}
