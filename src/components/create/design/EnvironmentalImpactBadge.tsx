"use client";

import Image from "next/image";
import { FFIE_CARD_TEXT } from "@/lib/card-layout";

/** Figma DS node 3:222 — transversal Environmental Impact banner (Oracle Draw). */
export const ENVIRONMENTAL_IMPACT_COPY =
  "This card is not drawn — it is always present. Every future in 2036 carries the weight of its infrastructure.";

export function EnvironmentalImpactBadge({
  className = "",
}: {
  /** @deprecated Card data unused — copy is fixed per Figma DS frame 3:222 */
  card?: unknown;
  className?: string;
}) {
  return (
    <div
      className={`flex w-full items-center gap-[14px] rounded-[10px] border border-[rgba(44,138,82,0.19)] bg-[#edf7f1] px-[19px] py-[15px] ${className}`}
    >
      <div className="relative size-4 shrink-0" aria-hidden>
        <Image
          src="/icons/environmental-impact-leaf.svg"
          alt=""
          width={16}
          height={16}
          className="size-full"
        />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-[#2c8a52]">
            Environmental Impact
          </p>
          <span className="rounded-[3px] border border-[#2c8a52] px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.064em] text-[#2c8a52]">
            ALWAYS APPLIED
          </span>
        </div>
        <p
          className={`mt-1 text-xs leading-[18px] text-[rgba(35,19,82,0.55)] ${FFIE_CARD_TEXT}`}
        >
          {ENVIRONMENTAL_IMPACT_COPY}
        </p>
      </div>
    </div>
  );
}
