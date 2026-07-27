import type { Metadata } from "next";
import { AboutPageContent } from "@/components/about/AboutPageContent";

export const metadata: Metadata = {
  title: "About FFIE",
  description:
    "The framework, the research, and the feminist foresight method behind this instrument.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
