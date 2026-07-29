"use client";

import { FfieButton } from "@/components/create/design/FfieButton";
import { FFIE_PHASES } from "@/data/about-content";

type CreateUnderstandScreenProps = {
  onBegin: () => void;
};

export function CreateUnderstandScreen({ onBegin }: CreateUnderstandScreenProps) {
  const copy = FFIE_PHASES[0]!;

  return (
    <div className="mx-auto max-w-prose space-y-6">
      <p className="text-sm leading-relaxed text-ffie-muted">{copy.description}</p>
      <FfieButton onClick={onBegin}>Begin</FfieButton>
    </div>
  );
}
