-- Artifact type enum for submissions (includes agent)
alter table submissions
  add column if not exists artifact_type text;

alter table submissions
  drop constraint if exists submissions_artifact_type_check;

alter table submissions
  add constraint submissions_artifact_type_check
  check (
    artifact_type is null
    or artifact_type in (
      'object',
      'app',
      'service',
      'policy',
      'narrative',
      'agent'
    )
  );
