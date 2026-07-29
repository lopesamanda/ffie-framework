"use client";

import { Fragment } from "react";

type HighlightedWeaknessTextProps = {
  text: string;
  extremeValue: string;
  highlightedValue: string | null;
  className?: string;
};

/** Highlights the extreme value word inside Artifact Weakness when its chip is hovered. */
export function HighlightedWeaknessText({
  text,
  extremeValue,
  highlightedValue,
  className = "",
}: HighlightedWeaknessTextProps) {
  const shouldHighlight =
    highlightedValue &&
    extremeValue &&
    highlightedValue.toLowerCase() === extremeValue.toLowerCase() &&
    text.toLowerCase().includes(extremeValue.toLowerCase());

  if (!shouldHighlight) {
    return <span className={className}>{text}</span>;
  }

  const pattern = new RegExp(
    `(${extremeValue.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "i",
  );
  const parts = text.split(pattern);

  return (
    <span className={className}>
      {parts.map((part, index) =>
        part.toLowerCase() === extremeValue.toLowerCase() ? (
          <mark
            key={index}
            className="rounded bg-ffie-accent/25 px-0.5 text-ffie-ink not-italic"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </span>
  );
}
