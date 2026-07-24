import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Moderação</h1>
      <p className="mt-4 text-ffie-muted">
        Painel de submissões pending/published/rejected. Em construção.
      </p>
    </div>
  );
}
