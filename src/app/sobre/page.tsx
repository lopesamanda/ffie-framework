import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre a pesquisa",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Sobre a pesquisa</h1>
      <p className="mt-4 text-ffie-muted">
        Tese de doutorado em Design · FFIE Framework. Em construção.
      </p>
    </div>
  );
}
