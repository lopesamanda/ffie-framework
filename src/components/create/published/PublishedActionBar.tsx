"use client";

import Link from "next/link";
import { PUBLISH_FLOW } from "@/lib/publish-flow-copy";

type PublishedActionBarProps = {
  commonsUrl: string;
  onBringToLife: () => void;
  onCopyLink: () => void;
  linkCopied: boolean;
  onDownload: () => void;
  downloading: boolean;
};

/** Figma node 61-1851 action row — matte pills, no glass. */
export function PublishedActionBar({
  commonsUrl,
  onBringToLife,
  onCopyLink,
  linkCopied,
  onDownload,
  downloading,
}: PublishedActionBarProps) {
  const copy = PUBLISH_FLOW.published;

  return (
    <div
      role="toolbar"
      aria-label="Published future actions"
      className="flex flex-wrap justify-end gap-2"
    >
      <Link
        href={commonsUrl}
        className="inline-flex items-center justify-center rounded-full border border-ffie-line bg-white px-4 py-2.5 text-xs font-medium text-ffie-ink transition hover:border-ffie-ink/25"
      >
        {copy.viewLive}
      </Link>
      <button
        type="button"
        onClick={onBringToLife}
        className="inline-flex items-center justify-center rounded-full bg-[#5236a8] px-4 py-2.5 text-xs font-semibold text-white transition hover:opacity-90"
      >
        {copy.bringToLife}
      </button>
      <button
        type="button"
        onClick={onCopyLink}
        className="inline-flex items-center justify-center rounded-full bg-ffie-ink px-4 py-2.5 text-xs font-semibold text-ffie-bg transition hover:opacity-90"
      >
        {linkCopied ? "Link copied" : copy.copyLink}
      </button>
      <button
        type="button"
        onClick={onDownload}
        disabled={downloading}
        className="inline-flex items-center justify-center rounded-full border border-ffie-line bg-white px-4 py-2.5 text-xs font-medium text-ffie-ink transition hover:border-ffie-ink/25 disabled:opacity-50"
      >
        {downloading ? "Preparing…" : copy.download}
      </button>
    </div>
  );
}
