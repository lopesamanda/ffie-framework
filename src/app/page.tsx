import Link from "next/link";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <section className="max-w-3xl">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-ffie-accent">
          Feminist Foresight in Innovation Ecosystems
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-ffie-ink md:text-5xl">
          Imaginar ecossistemas de IA a partir de cuidado coletivo, não de
          extração.
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ffie-muted">
          O FFIE é um framework de pesquisa-ação para futuros feministas em
          ecossistemas de inovação. A unidade replicável do método — validada
          em workshops no Brasil e em Portugal — é simples e poderosa:{" "}
          <strong className="font-medium text-ffie-ink">
            persona + artefato diegético, posicionado na Matriz Feminista
            Crítica 2×2
          </strong>
          .
        </p>
      </section>

      <section className="mt-14 grid gap-6 md:grid-cols-2">
        <Link
          href="/crie-o-seu-futuro"
          className="group rounded-2xl border border-ffie-line bg-ffie-surface p-8 transition hover:border-ffie-accent/40 hover:shadow-md"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ffie-muted">
            Jornada individual
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight group-hover:text-ffie-accent">
            Crie o seu Futuro
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
            Construa uma persona 2036, materialize um artefato diegético e
            posicione-o na matriz. Em breve.
          </p>
        </Link>

        <Link
          href="/atlas"
          className="group rounded-2xl border border-ffie-accent/20 bg-ffie-accent-soft p-8 transition hover:border-ffie-accent/40 hover:shadow-md"
        >
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-ffie-accent">
            Feature central
          </p>
          <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ffie-accent">
            Atlas de Futuros
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ffie-muted">
            Explore os 8 protótipos diegéticos da tese — Valentina, Leide,
            Pietra, Helena, Erika, Tainá, Sofia e John Bell — na matriz viva.
          </p>
        </Link>
      </section>
    </div>
  );
}
