-- FFIE Future Commons submissions (run in Supabase SQL editor)

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  session_id text not null,
  status text not null default 'pending'
    check (status in ('pending', 'published', 'rejected')),
  title text not null,
  narrative text not null,
  reflection_question text,
  location text not null,
  year int not null default 2036,
  character_name text not null,
  character_age int,
  character_role text not null,
  character_ai_function text,
  character_desire text not null,
  character_fear text not null,
  character_values text[] not null default '{}',
  artifact_name text not null,
  artifact_public_promise text not null,
  artifact_hidden_function text not null,
  tension text not null,
  quadrant text not null,
  power_position text not null default 'marginalized',
  position_x double precision not null,
  position_y double precision not null,
  placement_justification text not null,
  card_provenance jsonb not null default '[]',
  reflection_text text,
  image_url text,
  created_at timestamptz not null default now()
);

create index if not exists submissions_status_idx on submissions (status);
create index if not exists submissions_created_at_idx on submissions (created_at desc);

-- Storage bucket: create "submissions" as public read in Supabase dashboard,
-- or run storage policies appropriate to your deployment.
