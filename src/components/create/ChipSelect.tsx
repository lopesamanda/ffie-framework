"use client";

type ChipOption = {
  id: string;
  label: string;
};

type ChipSelectProps = {
  label: string;
  options: ChipOption[] | readonly string[];
  value: string | null;
  onChange: (value: string) => void;
  multi?: false;
};

type ChipMultiSelectProps = {
  label: string;
  options: readonly string[];
  value: string[];
  onChange: (value: string[]) => void;
  max?: number;
  multi: true;
};

function normalizeOptions(
  options: ChipOption[] | readonly string[],
): ChipOption[] {
  if (options.length === 0) return [];
  if (typeof options[0] === "string") {
    return (options as readonly string[]).map((label) => ({
      id: label,
      label,
    }));
  }
  return options as ChipOption[];
}

function chipClass(selected: boolean) {
  return `rounded-full border px-3 py-1.5 text-xs font-medium transition ${
    selected
      ? "border-ffie-ink bg-ffie-ink text-ffie-bg shadow-sm"
      : "border-ffie-line bg-ffie-bg text-ffie-muted hover:border-ffie-accent/40 hover:text-ffie-ink"
  }`;
}

export function ChipSelect(
  props: ChipSelectProps | ChipMultiSelectProps,
) {
  const normalized = normalizeOptions(props.options);

  if (props.multi) {
    const { label, value, onChange, max = 3 } = props;
    return (
      <fieldset className="space-y-3">
        <legend className="text-sm font-medium text-ffie-ink">{label}</legend>
        <div className="flex flex-wrap gap-2" role="group" aria-label={label}>
          {normalized.map((option) => {
            const selected = value.includes(option.id);
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                disabled={!selected && value.length >= max}
                onClick={() => {
                  if (selected) {
                    onChange(value.filter((item) => item !== option.id));
                  } else if (value.length < max) {
                    onChange([...value, option.id]);
                  }
                }}
                className={chipClass(selected)}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </fieldset>
    );
  }

  const { label, value, onChange } = props;
  return (
    <fieldset className="space-y-3">
      <legend className="text-sm font-medium text-ffie-ink">{label}</legend>
      <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
        {normalized.map((option) => {
          const selected = value === option.id;
          return (
            <button
              key={option.id}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(option.id)}
              className={chipClass(selected)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

export function ChipField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-dashed border-ffie-accent/25 bg-ffie-accent-soft/20 px-4 py-4">
      {label && (
        <p className="text-sm font-medium text-ffie-ink">{label}</p>
      )}
      {children}
    </div>
  );
}
