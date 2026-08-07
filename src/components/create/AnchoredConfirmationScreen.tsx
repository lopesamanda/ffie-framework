"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArtifactMaterializePanel } from "@/components/create/ArtifactMaterializePanel";
import { PublishedActionBar } from "@/components/create/published/PublishedActionBar";
import { PublishedFutureCard } from "@/components/create/PublishedFutureCard";
import { FutureWorkActionsGrid } from "@/components/create/FutureWorkWithPanel";
import { PublishFlowChrome } from "@/components/publish/PublishFlowChrome";
import { FfieButton } from "@/components/create/design/FfieButton";
import { copyToClipboard } from "@/lib/copy-to-clipboard";
import { PUBLISH_FLOW } from "@/lib/publish-flow-copy";
import type { JourneyDraft } from "@/lib/journey/types";

type AnchoredConfirmationScreenProps = {
  draft: JourneyDraft;
  onDownload: () => void;
  downloading: boolean;
  onCreateAnother?: () => void;
  /** When true, wraps in PublishFlowChrome for standalone /published route. */
  standalone?: boolean;
};

export function AnchoredConfirmationScreen({
  draft,
  onDownload,
  downloading,
  onCreateAnother,
  standalone = false,
}: AnchoredConfirmationScreenProps) {
  const reduceMotion = useReducedMotion();
  const [showMaterialize, setShowMaterialize] = useState(false);
  const [promptFocused, setPromptFocused] = useState(false);
  const [copied, setCopied] = useState(false);
  const bringToLifeRef = useRef<HTMLDivElement>(null);
  const copy = PUBLISH_FLOW.published;

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

  const content = (
    <div className="w-full">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[rgba(35,19,82,0.4)]">
            {draft.submittedId ? copy.eyebrow : copy.eyebrowPrivate}
          </p>
          <h2 className="pt-[10px] font-display text-[26px] font-bold leading-[33.8px] tracking-[-0.52px] text-ffie-ink">
            {draft.submittedId ? copy.heading : copy.headingPrivate}
          </h2>
          <p className="pt-2 text-sm leading-[22.4px] text-[rgba(35,19,82,0.55)]">
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
        />
      </div>

      <div className="pt-[28px]">
        <PublishedFutureCard draft={draft} id="future-output-card" />
      </div>

      <div className="w-full space-y-6 border-t border-[rgba(35,19,82,0.12)] pt-8">
        <h3 className="font-display text-base font-semibold text-ffie-ink">
          {copy.workWithHeading}
        </h3>
        <FutureWorkActionsGrid reduceMotion={reduceMotion} />
      </div>

      {onCreateAnother && (
        <div className="flex justify-center pt-2">
          <FfieButton variant="secondary" onClick={onCreateAnother}>
            {copy.createAnother}
          </FfieButton>
        </div>
      )}

      <div ref={bringToLifeRef} className="scroll-mt-24">
        {showMaterialize ? (
          <motion.div
            id="anchored-bring-to-life"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`rounded-2xl border bg-white px-4 py-5 sm:px-5 ${
              promptFocused
                ? "border-ffie-accent"
                : "border-ffie-line"
            }`}
          >
            <p className="text-sm font-medium text-ffie-ink">
              {copy.bringToLifeOptional}
            </p>
            <p className="mt-1 text-xs leading-relaxed text-ffie-muted">
              {copy.bringToLifeHint}
            </p>
            <div className="mt-4">
              <ArtifactMaterializePanel
                draft={draft}
                embedded
                highlighted={promptFocused}
              />
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  );

  if (standalone) {
    return (
      <PublishFlowChrome activeStep={3}>{content}</PublishFlowChrome>
    );
  }

  return content;
}
