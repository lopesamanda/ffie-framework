import type { Metadata } from "next";
import { MatrixSelectionView } from "@/components/publish/MatrixSelectionView";

export const metadata: Metadata = {
  title: "Place on the Matrix",
  description:
    "Situate your speculative artifact on the Critical Feminist Matrix before publishing.",
};

export default function MatrixPage() {
  return <MatrixSelectionView />;
}
