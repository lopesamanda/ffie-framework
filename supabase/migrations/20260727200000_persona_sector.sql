alter table submissions
  add column if not exists persona_sector text;

alter table submissions
  add column if not exists draw_synthesis_tensions text;
