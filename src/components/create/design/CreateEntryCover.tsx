"use client";

import { FfieButton } from "@/components/create/design/FfieButton";

function BeginArrowIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden
    >
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type CreateEntryCoverProps = {
  onBegin: () => void;
};

/** Figma Create Flow — Entry (Screen0, node 3:70). No place-framing eyebrow. */
export function CreateEntryCover({ onBegin }: CreateEntryCoverProps) {
  return (
    <div className="relative flex min-h-[480px] flex-col items-center justify-center px-4 py-12 sm:min-h-[520px] sm:px-6 sm:py-16">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(35, 19, 82, 0.043) 0%, transparent 72%)",
        }}
      />

      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[18%] select-none text-center font-display text-[clamp(140px,28vw,220px)] font-extrabold leading-none tracking-[-0.04em] text-ffie-ink/[0.035] sm:top-[22%]"
      >
        2036
      </p>

      <div className="relative z-10 mx-auto flex w-full max-w-[540px] flex-col items-center text-center">
        <h1 className="font-display text-[clamp(32px,5.5vw,42px)] font-extrabold leading-[1.15] tracking-[-0.025em] text-ffie-ink">
          <span className="block">A future is taking shape.</span>
          <span className="block">You&apos;re the one imagining it.</span>
        </h1>

        <div className="mt-5 space-y-0 px-2 text-[15px] leading-[1.7] text-ffie-muted">
          <p>This is not a survey. There are no right answers.</p>
          <p>
            You will draw cards, inhabit a life, and build something that does
            not yet exist.
          </p>
        </div>

        <div className="mt-10">
          <FfieButton onClick={onBegin} icon={<BeginArrowIcon />} iconPosition="trailing">
            Begin
          </FfieButton>
        </div>
      </div>
    </div>
  );
}
