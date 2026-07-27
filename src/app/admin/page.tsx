import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/admin/AdminLoginForm";
import { AdminModeration } from "@/components/admin/AdminModeration";
import {
  isAdminAuthenticated,
  isAdminPasswordConfigured,
} from "@/lib/admin-auth";
import { listSubmissionsForAdmin } from "@/lib/submissions";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!isAdminPasswordConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Moderation</h1>
        <p className="mt-4 text-sm leading-relaxed text-ffie-muted">
          Set <code className="text-ffie-ink">ADMIN_PASSWORD</code> in{" "}
          <code className="text-ffie-ink">.env.local</code> to enable the admin
          queue. See <code className="text-ffie-ink">.env.example</code>.
        </p>
      </div>
    );
  }

  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return <AdminLoginForm />;
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-3xl font-semibold tracking-tight">Moderation</h1>
        <p className="mt-4 text-sm leading-relaxed text-ffie-muted">
          Supabase is not configured. Set{" "}
          <code className="text-ffie-ink">NEXT_PUBLIC_SUPABASE_URL</code> and{" "}
          <code className="text-ffie-ink">SUPABASE_SERVICE_ROLE_KEY</code> to
          load submissions.
        </p>
      </div>
    );
  }

  const submissions = await listSubmissionsForAdmin();

  return <AdminModeration submissions={submissions} />;
}
