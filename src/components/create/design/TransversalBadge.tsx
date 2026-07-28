/** Small inline tag for the Environmental Impact transversal lens. */
export function TransversalBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border border-[#2d6a4f]/30 bg-[#2d6a4f]/10 px-2 py-0.5 text-[9px] font-normal leading-snug text-[#2d6a4f]/90 ${className}`}
    >
      Transversal — applies to every future
    </span>
  );
}
