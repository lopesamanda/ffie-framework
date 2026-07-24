import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crie o seu Futuro",
};

export default function CriePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Crie o seu Futuro</h1>
      <p className="mt-4 text-ffie-muted">
        Jornada em 4 passos (Situate → Embody → Materialize → Share). Em
        construção.
      </p>
    </div>
  );
}
