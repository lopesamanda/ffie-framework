import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FutureDetailContent } from "@/components/FutureDetailContent";
import { researchFindingsSeed } from "@/data/research-findings-seed";

type Props = {
  params: Promise<{ futureId: string }>;
};

export async function generateStaticParams() {
  return researchFindingsSeed.map((entry) => ({ futureId: entry.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { futureId } = await params;
  const entry = researchFindingsSeed.find((item) => item.id === futureId);

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
  const entry = researchFindingsSeed.find((item) => item.id === futureId);

  if (!entry) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 md:py-16">
      <FutureDetailContent entry={entry} />
    </div>
  );
}
