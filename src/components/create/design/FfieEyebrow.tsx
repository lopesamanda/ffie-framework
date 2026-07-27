export function FfieEyebrow({
  children,
  muted = false,
  className = "",
}: {
  children: React.ReactNode;
  muted?: boolean;
  className?: string;
}) {
  return (
    <p
      className={`text-[10px] font-medium uppercase tracking-[0.15em] ${
        muted ? "text-ffie-ink/25" : "text-ffie-ink/40"
      } ${className}`}
    >
      {children}
    </p>
  );
}

export function FfieHeading({
  children,
  as: Tag = "h2",
}: {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3";
}) {
  return (
    <Tag className="font-display text-[26px] font-bold leading-tight tracking-[-0.02em] text-ffie-ink">
      {children}
    </Tag>
  );
}

export function FfieLead({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed text-ffie-muted">{children}</p>
  );
}
