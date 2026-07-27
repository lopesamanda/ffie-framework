# FFIE

Digital instrument for **Feminist Foresight in Innovation Ecosystems** — doctoral research in Design.

## Stack

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Supabase (planned)

## Documentation

All product specs live in [`docs/`](./docs/README.md). Start with:

- [`docs/FFIE_product_brief.md`](./docs/FFIE_product_brief.md) — master brief (v3)
- [`docs/ffie_information_architecture.md`](./docs/ffie_information_architecture.md) — sitemap & nav

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Routes

| Route | Description |
|-------|-------------|
| `/` | Home (wordmark link — not in nav) |
| `/explore` | Research Findings + Future Commons (Map/Grid) |
| `/explore/[futureId]` | Future detail (shareable permalink) |
| `/create` | Create a Future journey (WIP) |
| `/about` | Framework, research, glossary |
| `/admin` | Moderation (WIP) |

Legacy redirects: `/atlas` → `/explore`, `/crie-o-seu-futuro` → `/create`, etc.

## Data

- `src/data/research-findings-seed.ts` — 8 thesis prototypes (story-first shape)
- `src/types/future.ts` — shared types per `docs/ffie_atlas_seed.md`
