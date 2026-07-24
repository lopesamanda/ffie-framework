# Supabase (Future Commons submissions)

```bash
cp .env.example .env.local
```

Set:

- `NEXT_PUBLIC_SUPABASE_URL` — project URL
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (server only, never expose to client)

Run `supabase/schema.sql` in the Supabase SQL editor.

Create a Storage bucket named `submissions` (public read optional for published images).

Submissions from Create a Future arrive with `status = pending` until approved via `/admin` (next increment).
