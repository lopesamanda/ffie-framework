-- Oracle Draw collective synthesis sentence ("Your draw, in one sentence")
alter table submissions
  add column if not exists draw_synthesis text;
