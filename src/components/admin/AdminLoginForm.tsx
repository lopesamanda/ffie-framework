"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

export function AdminLoginForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setPending(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error ?? "Login failed");
        return;
      }

      router.refresh();
    } catch {
      setError("Network error — try again");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md px-6 py-16">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
        Moderation
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">Admin</h1>
      <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
        Enter the admin password to review pending Future Commons submissions.
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <label className="block space-y-2">
          <span className="text-sm font-medium text-ffie-ink">Password</span>
          <input
            type="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-xl border border-ffie-line bg-ffie-surface px-4 py-3 text-sm text-ffie-ink outline-none transition focus:border-ffie-accent"
            required
          />
        </label>

        {error ? (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending || !password}
          className="rounded-full bg-ffie-ink px-5 py-2.5 text-sm font-medium text-white transition hover:bg-ffie-accent disabled:cursor-not-allowed disabled:opacity-50"
        >
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}
