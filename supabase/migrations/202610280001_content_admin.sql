-- Apply this entire migration once in the Supabase SQL editor as the project owner.
-- No application request executes this migration. Keep SUPABASE_SERVICE_ROLE_KEY on the server.
-- The main row and its retained backups may contain private internal knowledge; no public policies are created.

begin;

create table if not exists public.soltree_admin_workspace (
  key text primary key check (key = 'main'),
  revision bigint not null default 1 check (revision between 1 and 9007199254740991),
  document jsonb not null,
  updated_at timestamptz not null default now(),
  constraint soltree_admin_document_shape check (
    jsonb_typeof(document) = 'object'
    and document ?& array['version', 'files', 'publication', 'sourceManifest']
    and (document - array['version', 'files', 'media', 'publication', 'sourceManifest']) = '{}'::jsonb
    and document->'version' = '1'::jsonb
    and jsonb_typeof(document->'files') = 'object'
    and jsonb_typeof(document->'sourceManifest') = 'object'
    and (not (document ? 'media') or jsonb_typeof(document->'media') = 'object')
    and jsonb_typeof(document->'publication') in ('object', 'null')
  ),
  constraint soltree_admin_document_size check (octet_length(document::text) <= 15728640)
);

create table if not exists public.soltree_admin_workspace_backups (
  id bigint generated always as identity primary key,
  workspace_key text not null check (workspace_key = 'main'),
  revision bigint not null check (revision >= 1),
  document jsonb not null,
  archived_at timestamptz not null default now(),
  unique (workspace_key, revision)
);

alter table public.soltree_admin_workspace enable row level security;
alter table public.soltree_admin_workspace_backups enable row level security;
revoke all on table public.soltree_admin_workspace from public, anon, authenticated, service_role;
revoke all on table public.soltree_admin_workspace_backups from public, anon, authenticated, service_role;
revoke all on sequence public.soltree_admin_workspace_backups_id_seq from public, anon, authenticated, service_role;
-- Initialization can only insert a missing main row. All subsequent writes go through the CAS RPC.
grant select, insert on table public.soltree_admin_workspace to service_role;
grant select on table public.soltree_admin_workspace_backups to service_role;

create or replace function public.soltree_admin_save(expected_revision bigint, next_document jsonb)
returns table (revision bigint, document jsonb)
language plpgsql
security definer
set search_path = ''
as $$
declare
  previous_revision bigint;
  previous_document jsonb;
  saved_revision bigint;
  saved_document jsonb;
begin
  -- This row lock is database-wide and survives concurrent serverless instances.
  select workspace.revision, workspace.document
    into previous_revision, previous_document
    from public.soltree_admin_workspace as workspace
    where workspace.key = 'main'
    for update;

  if not found or expected_revision is null or previous_revision <> expected_revision then
    raise exception using errcode = '40001', message = 'Workspace revision conflict';
  end if;

  insert into public.soltree_admin_workspace_backups (workspace_key, revision, document)
    values ('main', previous_revision, previous_document);

  update public.soltree_admin_workspace as workspace
    set revision = workspace.revision + 1,
        document = next_document,
        updated_at = now()
    where workspace.key = 'main' and workspace.revision = expected_revision
    returning workspace.revision, workspace.document into saved_revision, saved_document;

  if not found then
    raise exception using errcode = '40001', message = 'Workspace revision conflict';
  end if;

  -- Backup insertion, content replacement and retention cleanup commit or roll back together.
  delete from public.soltree_admin_workspace_backups
    where id in (
      select backup.id from public.soltree_admin_workspace_backups as backup
      where backup.workspace_key = 'main'
      order by backup.revision desc offset 20
    );

  return query select saved_revision, saved_document;
end;
$$;

revoke all on function public.soltree_admin_save(bigint, jsonb) from public, anon, authenticated;
grant execute on function public.soltree_admin_save(bigint, jsonb) to service_role;

comment on table public.soltree_admin_workspace is 'Private content admin workspace. Only trusted server code uses the service role; user authorization belongs in the admin API.';
comment on table public.soltree_admin_workspace_backups is 'Private previous workspace revisions; the CAS transaction retains the latest 20 backups.';
comment on function public.soltree_admin_save(bigint, jsonb) is 'Atomic main-row compare-and-swap with a previous-document backup. SQLSTATE 40001 means the caller must reload.';

commit;
