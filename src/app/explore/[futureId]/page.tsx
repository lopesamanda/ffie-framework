import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FutureDetailContent } from "@/components/FutureDetailContent";
import { researchFindingsSeed } from "@/data/research-findings-seed";
import { getPublishedSubmissionById } from "@/lib/submissions";
import type { FutureEntry } from "@/types/future";

type Props = {
  params: Promise<{ futureId: string }>;
};

export async function generateStaticParams() {
  return researchFindingsSeed.map((entry) => ({ futureId: entry.id }));
}

async function resolveFuture(futureId: string): Promise<FutureEntry | null> {
  const fromSeed = researchFindingsSeed.find((item) => item.id === futureId);
  if (fromSeed) return fromSeed;
  return getPublishedSubmissionById(futureId);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { futureId } = await params;
  const entry = await resolveFuture(futureId);

  if (!entry) {
    return { title: "Future not found" };
  }

  return {
    title: entry.title,
    description: entry.narrative.slice(0, 160),
  };
}

export default async function FutureDetailPage({ params }: Props) {
  const { futureId } = await params;
  const entry = await resolveFuture(futureId);

  if (!entry) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <FutureDetailContent entry={entry} />
    </div>
  );
}
