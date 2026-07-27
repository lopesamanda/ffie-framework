"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdminSubmissionListItem } from "@/lib/submissions";
import { excerptAtWordBoundary } from "@/lib/text-excerpt";
import { ffieCardShell, FFIE_CARD_TEXT } from "@/lib/card-layout";
import { QUADRANT_LABELS, type FutureStatus } from "@/types/future";

type Tab = FutureStatus;

const TABS: { id: Tab; label: string }[] = [
  { id: "pending", label: "Pending" },
  { id: "published", label: "Published" },
  { id: "rejected", label: "Rejected" },
];

function truncate(text: string, max = 160) {
  return excerptAtWordBoundary(text, max);
}

function formatDate(iso: string) {
  try {
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function powerLabel(value: string) {
  return value.replace(/_/g, " ");
}

type Props = {
  submissions: AdminSubmissionListItem[];
};

export function AdminModeration({ submissions }: Props) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("pending");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const counts = useMemo(() => {
    return {
      pending: submissions.filter((item) => item.status === "pending").length,
      published: submissions.filter((item) => item.status === "published").length,
      rejected: submissions.filter((item) => item.status === "rejected").length,
    };
  }, [submissions]);

  const visible = useMemo(
    () => submissions.filter((item) => item.status === tab),
    [submissions, tab],
  );

  async function moderate(id: string, status: "published" | "rejected") {
    setError(null);
    setBusyId(id);

    try {
      const response = await fetch(`/api/admin/submissions/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          error?: string;
        } | null;
        setError(data?.error ?? "Action failed");
        return;
      }

      router.refresh();
    } catch {
      setError("Network error — try again");
    } finally {
      setBusyId(null);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.refresh();
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <header className="max-w-2xl">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
            Moderation
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
            Future Commons queue
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
            Review visitor submissions. Publishing makes them eligible for the
            public Explore → Future Commons view.
          </p>
        </header>

        <button
          type="button"
          onClick={logout}
          className="self-start rounded-full border border-ffie-line px-4 py-2 text-sm text-ffie-muted transition hover:border-ffie-ink hover:text-ffie-ink"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 inline-flex rounded-full border border-ffie-line bg-ffie-surface p-1">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setTab(item.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === item.id
                ? "bg-ffie-ink text-white"
                : "text-ffie-muted hover:text-ffie-ink"
            }`}
          >
            {item.label}
            <span className="ml-2 tabular-nums opacity-70">{counts[item.id]}</span>
          </button>
        ))}
      </div>

      {error ? (
        <p className="mt-4 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="mt-8 space-y-4">
        {visible.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-ffie-line p-10 text-center text-sm text-ffie-muted">
            {tab === "pending"
              ? "No pending submissions."
              : tab === "published"
                ? "No published submissions yet."
                : "No rejected submissions."}
          </p>
        ) : (
          visible.map((item) => (
            <article
              key={item.id}
              className={`px-[18px] py-6 ${ffieCardShell} bg-ffie-surface`}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div className="min-w-0 flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-ffie-accent-soft px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-ffie-accent">
                      {QUADRANT_LABELS[item.quadrant] ?? item.quadrant}
                    </span>
                    <span className="rounded-full border border-ffie-line px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-ffie-muted">
                      {powerLabel(item.power_position)}
                    </span>
                    <span className="text-xs text-ffie-muted">
                      {formatDate(item.created_at)}
                    </span>
                  </div>

                  <h2 className="text-xl font-semibold tracking-tight">
                    {item.title}
                  </h2>

                  <p className={`text-sm leading-relaxed text-ffie-muted ${FFIE_CARD_TEXT}`}>
                    {truncate(item.narrative)}
                  </p>

                  <dl className="grid gap-2 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-ffie-muted">
                        Character
                      </dt>
                      <dd className="mt-0.5 text-ffie-ink">
                        {item.character_name}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-wide text-ffie-muted">
                        Artifact
                      </dt>
                      <dd className="mt-0.5 text-ffie-ink">
                        {item.artifact_name}
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-xs uppercase tracking-wide text-ffie-muted">
                        Location
                      </dt>
                      <dd className="mt-0.5 text-ffie-ink">{item.location}</dd>
                    </div>
                  </dl>
                </div>

                {tab === "pending" ? (
                  <div className="flex shrink-0 gap-2 lg:flex-col">
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => moderate(item.id, "published")}
                      className="rounded-full bg-ffie-ink px-4 py-2 text-sm font-medium text-white transition hover:bg-ffie-accent disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {busyId === item.id ? "Working…" : "Publish"}
                    </button>
                    <button
                      type="button"
                      disabled={busyId === item.id}
                      onClick={() => moderate(item.id, "rejected")}
                      className="rounded-full border border-ffie-line px-4 py-2 text-sm font-medium text-ffie-muted transition hover:border-red-300 hover:text-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <span className="shrink-0 self-start rounded-full border border-ffie-line px-3 py-1 text-xs uppercase tracking-wide text-ffie-muted">
                    {item.status}
                  </span>
                )}
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
