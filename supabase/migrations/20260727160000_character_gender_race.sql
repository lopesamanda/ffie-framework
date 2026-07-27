-- Add character gender and race/ethnicity to submissions
alter table submissions
  add column if not exists character_gender text,
  add column if not exists character_race_ethnicity text;
