import type { Metadata } from "next";
import { PublishReviewView } from "@/components/publish/PublishReviewView";

export const metadata: Metadata = {
  title: "Reflect before publishing",
  description:
    "Choose visibility and leave a reflection before your future enters the Commons.",
};

export default function PublishReviewPage() {
  return <PublishReviewView />;
}
