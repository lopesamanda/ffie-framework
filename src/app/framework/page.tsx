import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "O Framework",
};

export default function FrameworkPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">O Framework</h1>
      <p className="mt-4 text-ffie-muted">
        Understand · Situate · Embody · Materialize · Share. Em construção.
      </p>
    </div>
  );
}
