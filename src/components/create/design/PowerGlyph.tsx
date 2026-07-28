import type { AiCapabilityPowerId } from "@/lib/journey/ai-capability-clusters";

/** Figma DS node 21:2029 — 44×44 source art scaled into 24×24 viewBox (1.5px effective stroke). */
const FIGMA_SCALE = 24 / 44;
const FIGMA_STROKE = 2.75;

type GlyphFrameProps = {
  children: React.ReactNode;
  size?: number;
  className?: string;
};

function GlyphFrame({ children, size = 20, className = "" }: GlyphFrameProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <g transform={`scale(${FIGMA_SCALE})`}>{children}</g>
    </svg>
  );
}

/** Power to Know — concentric partial arcs converging on a center dot. */
export function GlyphKnow({ size, className }: { size?: number; className?: string }) {
  return (
    <GlyphFrame size={size} className={className}>
      <path
        d="M22 38.5C31.1127 38.5 38.5 31.1127 38.5 22C38.5 12.8873 31.1127 5.5 22 5.5C12.8873 5.5 5.5 12.8873 5.5 22C5.5 31.1127 12.8873 38.5 22 38.5Z"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
        strokeDasharray="77.73 26.03"
      />
      <path
        d="M22 32.0833C27.5689 32.0833 32.0833 27.5689 32.0833 22C32.0833 16.4311 27.5689 11.9167 22 11.9167C16.4311 11.9167 11.9167 16.4311 11.9167 22C11.9167 27.5689 16.4311 32.0833 22 32.0833Z"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
        strokeDasharray="47.48 15.77"
      />
      <path
        d="M22 26.5833C24.5313 26.5833 26.5833 24.5313 26.5833 22C26.5833 19.4687 24.5313 17.4167 22 17.4167C19.4687 17.4167 17.4167 19.4687 17.4167 22C17.4167 24.5313 19.4687 26.5833 22 26.5833Z"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
        strokeDasharray="21.63 7.15"
      />
      <path
        d="M22 23.8333C23.0125 23.8333 23.8333 23.0125 23.8333 22C23.8333 20.9875 23.0125 20.1667 22 20.1667C20.9875 20.1667 20.1667 20.9875 20.1667 22C20.1667 23.0125 20.9875 23.8333 22 23.8333Z"
        fill="currentColor"
      />
    </GlyphFrame>
  );
}

/** Power to Speak & Make — rays fanning from a source point. */
export function GlyphSpeakMake({
  size,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <GlyphFrame size={size} className={className}>
      <path
        d="M22 25.6667C23.0125 25.6667 23.8333 24.8459 23.8333 23.8333C23.8333 22.8208 23.0125 22 22 22C20.9875 22 20.1667 22.8208 20.1667 23.8333C20.1667 24.8459 20.9875 25.6667 22 25.6667Z"
        fill="currentColor"
      />
      <path
        d="M22 21.0833V9.16667"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M23.375 21.45L28.875 11.9167"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M20.625 21.45L15.125 11.9167"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M24.3833 22.4583L31.5333 18.3333"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M19.6167 22.4583L12.4667 18.3333"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
      />
    </GlyphFrame>
  );
}

/** Power to Act — three stepped 45° segments. */
export function GlyphAct({ size, className }: { size?: number; className?: string }) {
  return (
    <GlyphFrame size={size} className={className}>
      <path
        d="M7.33333 33L14.6667 25.6667"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M18.3333 27.5L25.6667 20.1667"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M29.3333 22L36.6667 14.6667"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
      />
    </GlyphFrame>
  );
}

/** Power to Watch — incomplete orbit with anchor dot. */
export function GlyphWatch({ size, className }: { size?: number; className?: string }) {
  return (
    <GlyphFrame size={size} className={className}>
      <path
        d="M33.9167 15.125C35.4299 17.746 36.0361 20.793 35.6413 23.7936C35.2465 26.7942 33.8728 29.5808 31.7331 31.7212C29.5934 33.8615 26.8073 35.2362 23.8068 35.6319C20.8063 36.0277 17.7591 35.4224 15.1376 33.91C12.5161 32.3977 10.4669 30.0626 9.30758 27.267C8.14828 24.4714 7.94372 21.3713 8.72563 18.4476C9.50753 15.5239 11.2322 12.9398 13.6322 11.0961C16.0323 9.25234 18.9735 8.25194 22 8.25"
        stroke="currentColor"
        strokeWidth={FIGMA_STROKE}
        strokeLinecap="round"
      />
      <path
        d="M8.25 24.3833C9.56628 24.3833 10.6333 23.3163 10.6333 22C10.6333 20.6837 9.56628 19.6167 8.25 19.6167C6.93372 19.6167 5.86667 20.6837 5.86667 22C5.86667 23.3163 6.93372 24.3833 8.25 24.3833Z"
        fill="currentColor"
      />
    </GlyphFrame>
  );
}

export function PowerGlyph({
  powerId,
  size = 20,
  className = "",
}: {
  powerId: AiCapabilityPowerId;
  size?: number;
  className?: string;
}) {
  switch (powerId) {
    case "power-to-know":
      return <GlyphKnow size={size} className={className} />;
    case "power-to-speak-make":
      return <GlyphSpeakMake size={size} className={className} />;
    case "power-to-act":
      return <GlyphAct size={size} className={className} />;
    case "power-to-watch":
      return <GlyphWatch size={size} className={className} />;
  }
}
