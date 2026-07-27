import type { Metadata } from "next";
import { CreateJourney } from "@/components/create/CreateJourney";

export const metadata: Metadata = {
  title: "Create a Future",
  description:
    "Draw Narrative Cards, reflect, and build a diegetic prototype for the Future Commons.",
};

export default function CreatePage() {
  return <CreateJourney />;
}
