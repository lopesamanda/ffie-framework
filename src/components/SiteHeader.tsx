import Link from "next/link";
import { SiteNavLink } from "@/components/SiteNavLink";

const navItems = [
  { href: "/explore", label: "Explore" },
  { href: "/create", label: "Create" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-ffie-line bg-ffie-surface/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-lg font-semibold tracking-tight text-ffie-ink transition-colors group-hover:text-ffie-accent">
            FFIE
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-ffie-muted">
            Feminist Foresight
          </span>
        </Link>

        <nav className="flex items-center gap-6">
          {navItems.map((item) => (
            <SiteNavLink key={item.href} href={item.href} label={item.label} />
          ))}
        </nav>
      </div>
    </header>
  );
}
