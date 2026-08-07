"use client";

import Link from "next/link";
import { PublishedActionButton } from "@/components/create/published/PublishedActionButton";
import { PUBLISH_RITUAL } from "@/lib/publish-ritual-copy";

type PublishedActionBarProps = {
  commonsUrl: string;
  onBringToLife: () => void;
  onCopyLink: () => void;
  linkCopied: boolean;
  onDownload: () => void;
  downloading: boolean;
  onCreateAnother?: () => void;
};

export function PublishedActionBar({
  commonsUrl,
  onBringToLife,
  onCopyLink,
  linkCopied,
  onDownload,
  downloading,
  onCreateAnother,
}: PublishedActionBarProps) {
  const copy = PUBLISH_RITUAL.confirmation;

  return (
    <div
      role="toolbar"
      aria-label="Published future actions"
      className="flex flex-wrap gap-2.5 rounded-2xl border border-ffie-line/70 bg-ffie-surface/60 p-3 shadow-[inset_0_1px_0_rgba(255,255,255,0.65)] backdrop-blur-sm"
    >
      <Link
        href={commonsUrl}
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full bg-ffie-ink px-5 py-2.5 font-display text-sm font-bold tracking-[0.01em] text-ffie-bg shadow-[0_4px_12px_rgba(35,19,82,0.22)] transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ffie-accent"
      >
        {copy.viewLive}
      </Link>
      <PublishedActionButton onClick={onBringToLife}>
        {copy.bringToLife}
      </PublishedActionButton>
      <PublishedActionButton onClick={onCopyLink} success={linkCopied}>
        {linkCopied ? "Link copied" : copy.copyShareLink}
      </PublishedActionButton>
      <PublishedActionButton onClick={onDownload} disabled={downloading}>
        {downloading ? "Preparing…" : copy.download}
      </PublishedActionButton>
      {onCreateAnother && (
        <PublishedActionButton onClick={onCreateAnother}>
          {copy.createAnother}
        </PublishedActionButton>
      )}
    </div>
  );
}
