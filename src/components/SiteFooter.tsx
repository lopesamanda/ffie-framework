import { FFIE_OPEN_ACCESS_STATEMENT } from "@/data/about-publications";

export function SiteFooter() {
  return (
    <footer className="border-t border-ffie-line bg-ffie-surface">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-sm text-ffie-muted md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p>
            Feminist Foresight in Innovation Ecosystems · doctoral research in
            Design · IADE, Universidade Europeia
          </p>
          <p className="text-xs text-ffie-muted/90">{FFIE_OPEN_ACCESS_STATEMENT}</p>
        </div>
        <p className="text-xs uppercase tracking-[0.15em]">2036 · Brazil & Portugal</p>
      </div>
    </footer>
  );
}
