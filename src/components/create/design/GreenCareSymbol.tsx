/** Decorative green care mark — fixed in the Feminist Preferable quadrant on the live mini-matrix. */
export function GreenCareSymbol({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={className}
    >
      <path
        d="M12 21c-4.5-3.2-7-6.4-7-10.2C5 7.8 7.4 5 10.5 5c1.6 0 3 .8 3.9 2.1C15.3 5.8 16.7 5 18.3 5 21.4 5 23.8 7.8 23.8 10.8 23.8 14.6 21.3 17.8 16.8 21"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 21V11"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M9 14c1.2-1.5 2.1-2.2 3-2.2s1.8.7 3 2.2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
