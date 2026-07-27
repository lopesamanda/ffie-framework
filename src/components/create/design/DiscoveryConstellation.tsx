"use client";

import { FutureConstellation } from "@/components/explore/FutureConstellation";
import type { FutureEntry } from "@/types/future";

type Props = {
  futures: FutureEntry[];
};

/** Scattered constellation for Create Discovery — delegates to shared Explore component. */
export function DiscoveryConstellation({ futures }: Props) {
  return (
    <FutureConstellation
      entries={futures}
      emptyMessage="No published futures yet. Yours may be the first."
    />
  );
}
