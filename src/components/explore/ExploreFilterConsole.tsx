"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { SpeculativeTooltip } from "@/components/SpeculativeTooltip";
import { EXPLORE_COPY } from "@/lib/publish-ritual-copy";
import {
  QUADRANT_LABELS,
  type FutureCountry,
  type FutureQuadrant,
  type PersonaSector,
} from "@/types/future";
import { PERSONA_SECTOR_OPTIONS } from "@/lib/journey/persona-sectors";
import { ROLE_OPTIONS } from "@/lib/journey/character-options";

function FilterModule({
  icon,
  label,
  summary,
  children,
}: {
  icon: string;
  label: string;
  summary: string;
  children: ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-lg border border-ffie-line/80 bg-ffie-bg">
      <button
        type="button"
        data-cursor-lens
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        className="flex w-full items-center gap-3 px-3 py-2.5 text-left transition hover:bg-ffie-accent-soft/40"
      >
        <span
          className="flex size-7 shrink-0 items-center justify-center rounded-md border border-ffie-line bg-ffie-surface text-xs"
          aria-hidden
        >
          {icon}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[10px] font-medium uppercase tracking-[0.1em] text-ffie-muted">
            {label}
          </span>
          <span className="block truncate text-xs font-medium text-ffie-ink">
            {summary}
          </span>
        </span>
        <span className="text-ffie-muted" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ffie-line/60"
          >
            <div className="flex flex-wrap gap-1.5 p-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function FilterOption({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      data-cursor-lens
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-2.5 py-1 text-[11px] font-medium transition ${
        active
          ? "border-ffie-accent bg-ffie-accent-soft text-ffie-accent"
          : "border-ffie-line bg-ffie-surface text-ffie-muted hover:border-ffie-accent/30 hover:text-ffie-ink"
      }`}
    >
      {label}
    </button>
  );
}

type ExploreFilterConsoleProps = {
  country: FutureCountry | "all";
  scenario: FutureQuadrant | "all";
  sector: PersonaSector | "all";
  role: string | "all";
  showRole: boolean;
  onCountryChange: (value: FutureCountry | "all") => void;
  onScenarioChange: (value: FutureQuadrant | "all") => void;
  onSectorChange: (value: PersonaSector | "all") => void;
  onRoleChange: (value: string | "all") => void;
};

export function ExploreFilterConsole({
  country,
  scenario,
  sector,
  role,
  showRole,
  onCountryChange,
  onScenarioChange,
  onSectorChange,
  onRoleChange,
}: ExploreFilterConsoleProps) {
  const countrySummary =
    country === "all" ? "All countries" : country;
  const scenarioSummary =
    scenario === "all"
      ? "All scenarios"
      : QUADRANT_LABELS[scenario].replace(" Future", "");
  const sectorSummary = sector === "all" ? "All sectors" : sector;
  const roleSummary = role === "all" ? "All roles" : role;

  return (
    <aside
      className="rounded-xl border border-ffie-line bg-ffie-accent-soft/25 p-4"
      aria-label="Explore filters"
    >
      <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.12em] text-ffie-muted">
        <SpeculativeTooltip term="intersectionalLenses">
          {EXPLORE_COPY.filtersLabel}
        </SpeculativeTooltip>
      </p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <FilterModule icon="⌖" label="Country" summary={countrySummary}>
          <FilterOption
            label="All"
            active={country === "all"}
            onClick={() => onCountryChange("all")}
          />
          <FilterOption
            label="Brazil"
            active={country === "Brazil"}
            onClick={() => onCountryChange("Brazil")}
          />
          <FilterOption
            label="Portugal"
            active={country === "Portugal"}
            onClick={() => onCountryChange("Portugal")}
          />
        </FilterModule>

        <FilterModule icon="◫" label="Scenario" summary={scenarioSummary}>
          <FilterOption
            label="All"
            active={scenario === "all"}
            onClick={() => onScenarioChange("all")}
          />
          {(Object.entries(QUADRANT_LABELS) as [FutureQuadrant, string][]).map(
            ([key, label]) => (
              <FilterOption
                key={key}
                label={label.replace(" Future", "")}
                active={scenario === key}
                onClick={() => onScenarioChange(key)}
              />
            ),
          )}
        </FilterModule>

        <FilterModule icon="▣" label="Sector" summary={sectorSummary}>
          <FilterOption
            label="All"
            active={sector === "all"}
            onClick={() => onSectorChange("all")}
          />
          {PERSONA_SECTOR_OPTIONS.map((option) => (
            <FilterOption
              key={option}
              label={option}
              active={sector === option}
              onClick={() => onSectorChange(option)}
            />
          ))}
        </FilterModule>

        {showRole && (
          <FilterModule icon="◎" label="Role" summary={roleSummary}>
            <FilterOption
              label="All"
              active={role === "all"}
              onClick={() => onRoleChange("all")}
            />
            {ROLE_OPTIONS.map((option) => (
              <FilterOption
                key={option}
                label={option}
                active={role === option}
                onClick={() => onRoleChange(option)}
              />
            ))}
          </FilterModule>
        )}
      </div>
    </aside>
  );
}
