"use client";

import type { ReactNode } from "react";

type SegmentedControlProps<T extends string> = {
  value: T;
  onChange: (value: T) => void;
  options: { value: T; label: string }[];
  ariaLabel: string;
};

/** Shared pill toggle — Explore collection/view filters and similar controls. */
export function SegmentedControl<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex rounded-full border border-ffie-line bg-ffie-surface p-1"
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selected
                ? "bg-ffie-ink text-white shadow-sm"
                : "text-ffie-muted hover:text-ffie-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}

export function SegmentedControlAccent<T extends string>({
  value,
  onChange,
  options,
  ariaLabel,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={ariaLabel}
      className="inline-flex rounded-full border border-ffie-line bg-ffie-surface p-1"
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onChange(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              selected
                ? "bg-ffie-accent-soft text-ffie-accent"
                : "text-ffie-muted hover:text-ffie-ink"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
