"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArtifactMaterializePanel } from "@/components/create/ArtifactMaterializePanel";
import { PublishedActionBar } from "@/components/create/published/PublishedActionBar";
import { PublishedFutureCard } from "@/components/create/PublishedFutureCard";
import { FutureWorkActionsGrid } from "@/components/create/FutureWorkWithPanel";
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
  const [promptFocused, setPromptFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const bringToLifeRef = useRef<HTMLDivElement>(null);
  const copy = PUBLISH_RITUAL.confirmation;

  const commonsUrl =
    typeof window !== "undefined" && draft.submittedId
      ? `${window.location.origin}/explore/${draft.submittedId}`
      : typeof window !== "undefined"
        ? `${window.location.origin}/explore`
        : "/explore";

  const artifactLabel =
    draft.artifactName.trim() || draft.title.trim() || "Your future";

  const handleCopyLink = () => {
    copyToClipboard(commonsUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2200);
  };

  const handleBringToLife = () => {
    setShowMaterialize(true);
    setPromptFocused(true);
    window.requestAnimationFrame(() => {
      bringToLifeRef.current?.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "center",
      });
    });
    window.setTimeout(() => setPromptFocused(false), 2400);
  };

  return (
    <div className="w-full space-y-8">
      <PublishRitualStepper activeStep={3} />

      <div className="space-y-3 text-center lg:text-left">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ffie-accent">
          {draft.submittedId ? copy.eyebrow : "Kept private"}
        </p>
        <h2 className="font-display text-2xl font-bold tracking-tight text-ffie-ink md:text-3xl">
          {copy.heading}
        </h2>
        <p className="max-w-prose text-sm leading-relaxed text-ffie-muted">
          {draft.submittedId
            ? copy.subtitlePublished(artifactLabel)
            : copy.subtitlePrivate(artifactLabel)}
        </p>
      </div>

      <PublishedActionBar
        commonsUrl={commonsUrl}
        onBringToLife={handleBringToLife}
        onCopyLink={handleCopyLink}
        linkCopied={copied}
        onDownload={onDownload}
        downloading={downloading}
        onCreateAnother={onCreateAnother}
      />

      <PublishedFutureCard draft={draft} id="future-output-card" />

      <div className="w-full space-y-6 border-t border-ffie-line/60 pt-8">
        <h3 className="font-display text-base font-semibold text-ffie-ink">
          {copy.workWithHeading}
        </h3>
        <FutureWorkActionsGrid reduceMotion={reduceMotion} />
      </div>

      <div ref={bringToLifeRef} className="scroll-mt-24">
        {showMaterialize ? (
          <motion.div
            id="anchored-bring-to-life"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`rounded-2xl border bg-ffie-bg/70 px-4 py-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-sm sm:px-5 ${
              promptFocused
                ? "border-ffie-accent ring-4 ring-ffie-accent/15"
                : "border-ffie-line/80"
            }`}
          >
            <p className="text-sm font-medium text-ffie-ink">
              Bring it to life (optional)
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ffie-muted">
              Copy a ready-made image prompt into your external AI tool — nothing
              gets uploaded back into FFIE.
            </p>
            <div className="mt-4">
              <ArtifactMaterializePanel draft={draft} embedded highlighted={promptFocused} />
            </div>
          </motion.div>
        ) : (
          <p className="text-xs text-ffie-muted">
            Choose <span className="font-medium text-ffie-ink">Bring it to life</span>{" "}
            above to open the generative prompt here.
          </p>
        )}
      </div>
    </div>
  );
}
