import Link from "next/link";
import { MatrixThumbnailPreview } from "@/components/home/MatrixThumbnailPreview";

/** Single unified pill CTA — matrix thumbnail + label in one clickable unit. */
export function ExploreMatrixCta() {
  return (
    <Link
      href="/explore"
      data-cursor-lens
      className="group inline-flex items-center gap-3 rounded-full border border-ffie-accent bg-ffie-accent-soft py-2 pl-2 pr-5 text-sm font-semibold text-ffie-accent shadow-sm transition hover:border-ffie-accent/80 hover:bg-ffie-accent/10 hover:shadow-md"
    >
      <MatrixThumbnailPreview className="h-11 w-11 rounded-md" />
      <span>Explore the Matrix →</span>
    </Link>
  );
}
