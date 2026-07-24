import type { Metadata } from "next";
import { AtlasMatrix } from "@/components/AtlasMatrix";

export const metadata: Metadata = {
  title: "Atlas de Futuros",
  description:
    "Matriz Feminista Crítica 2×2 com os 8 protótipos diegéticos da tese FFIE.",
};

export default function AtlasPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <header className="mb-10 max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
          Matriz Feminista Crítica 2×2
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
          Atlas de Futuros
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ffie-muted">
          Oito pares persona + artefato diegético dos workshops de Recife e
          Lisboa (2036). Eixo horizontal: lógica de sistema{" "}
          <span className="text-ffie-ink">Extractive ↔ Emancipatory</span>.
          Eixo vertical: organização de poder{" "}
          <span className="text-ffie-ink">Hierarchical ↔ Collective Care</span>
          .
        </p>
      </header>

      <AtlasMatrix />
    </div>
  );
}
