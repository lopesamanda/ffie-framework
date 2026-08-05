import type { CardCategory } from "@/data/narrative-cards";

export function RegisterCategoryMark({
  category,
  color,
  size = 28,
}: {
  category: CardCategory;
  color: string;
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
  };

  switch (category) {
    case "risk":
      return (
        <svg {...common}>
          <path
            d="M12 4 L20 19 H4 Z"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12 9 V13" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="12" cy="16.5" r="1" fill={color} />
        </svg>
      );
    case "benefit":
      return (
        <svg {...common}>
          <path
            d="M12 3 L14.5 9 H21 L15.8 13 L17.8 19.5 L12 15.5 L6.2 19.5 L8.2 13 L3 9 H9.5 Z"
            fill="none"
            stroke={color}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "trust":
      return (
        <svg {...common}>
          <path
            d="M12 4 L19 8 V13 C19 17 12 20 12 20 C12 20 5 17 5 13 V8 Z"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "barrier":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" fill="none" stroke={color} strokeWidth="1.8" />
          <path d="M7 7 L17 17" stroke={color} strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );
    case "transversal":
      return (
        <svg {...common}>
          <path
            d="M12 3 C8 8 5 11 5 14a7 7 0 0 0 14 0c0-3-3-6-7-11z"
            fill="none"
            stroke={color}
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M12 10v4" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}
