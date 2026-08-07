import type { Metadata } from "next";
import { PublishedFutureView } from "@/components/publish/PublishedFutureView";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: id === "local" ? "Future anchored" : "Published future",
    description: "Your speculative future — published or kept private.",
  };
}

export default async function PublishedFuturePage({ params }: Props) {
  const { id } = await params;
  return <PublishedFutureView id={id} />;
}
