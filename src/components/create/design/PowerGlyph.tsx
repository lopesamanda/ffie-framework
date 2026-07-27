import type { AiCapabilityPowerId } from "@/lib/journey/ai-capability-clusters";

/** Flat abstract glyphs for AI Capability "Power" section headers. */
export function PowerGlyph({ powerId }: { powerId: AiCapabilityPowerId }) {
  const shared = {
    width: 12,
    height: 12,
    viewBox: "0 0 12 12",
    fill: "none",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-hidden": true as const,
  };

  switch (powerId) {
    case "power-to-know":
      return (
        <svg {...shared}>
          <circle cx="6" cy="6" r="4.25" stroke="currentColor" strokeWidth="1" />
          <circle cx="6" cy="6" r="1.75" fill="currentColor" />
        </svg>
      );
    case "power-to-speak-make":
      return (
        <svg {...shared}>
          <path
            d="M2 4.5h8M2.5 6h7M3 7.5h6"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
          />
          <rect
            x="8.5"
            y="2.5"
            width="2"
            height="2"
            fill="currentColor"
            opacity="0.55"
          />
        </svg>
      );
    case "power-to-act":
      return (
        <svg {...shared}>
          <path
            d="M3 6h5.5M6.5 4l2.5 2-2.5 2"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "power-to-watch":
      return (
        <svg {...shared}>
          <rect
            x="2"
            y="3.5"
            width="8"
            height="5"
            rx="1"
            stroke="currentColor"
            strokeWidth="1"
          />
          <circle cx="6" cy="6" r="1.25" fill="currentColor" />
        </svg>
      );
  }
}
