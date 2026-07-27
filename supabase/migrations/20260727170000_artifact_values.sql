-- Artifact embedded values (multi-select, 2–4 items)
alter table submissions
  add column if not exists artifact_values text[] not null default '{}';
