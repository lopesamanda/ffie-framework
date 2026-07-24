import Link from "next/link";

const navItems = [
  { href: "/atlas", label: "Atlas de Futuros" },
  { href: "/crie-o-seu-futuro", label: "Crie o seu Futuro" },
  { href: "/framework", label: "O Framework" },
  { href: "/sobre", label: "Sobre" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-ffie-line bg-ffie-surface/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="group flex flex-col leading-none">
          <span className="text-xs font-medium uppercase tracking-[0.2em] text-ffie-muted">
            Feminist Foresight
          </span>
          <span className="text-lg font-semibold tracking-tight text-ffie-ink group-hover:text-ffie-accent">
            FFIE Framework
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ffie-muted transition-colors hover:text-ffie-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
