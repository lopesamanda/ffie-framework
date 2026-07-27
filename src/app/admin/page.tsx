import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
};

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Moderation</h1>
      <p className="mt-4 text-ffie-muted">
        Pending prototype submissions and reported Readings. Spec in{" "}
        <code className="text-sm text-ffie-ink">docs/FFIE_product_brief.md</code>{" "}
        §5–6. Supabase integration — next increment.
      </p>
    </div>
  );
}
