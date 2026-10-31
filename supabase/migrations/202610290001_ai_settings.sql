-- Apply once as project owner. AI credentials never enter the content publishing workspace.
begin;
create table if not exists public.soltree_ai_settings (
  key text primary key check (key = 'main'),
  revision bigint not null check (revision between 1 and 9007199254740991),
  payload jsonb not null check (
    jsonb_typeof(payload) = 'object'
    and payload ?& array['iv', 'tag', 'ciphertext']
    and (payload - array['iv', 'tag', 'ciphertext']) = '{}'::jsonb
    and octet_length(payload::text) <= 8192
  )
);
alter table public.soltree_ai_settings enable row level security;
revoke all on table public.soltree_ai_settings from public, anon, authenticated, service_role;
grant select, insert, update on table public.soltree_ai_settings to service_role;
comment on table public.soltree_ai_settings is 'AES-256-GCM encrypted AI settings. Only authorized server handlers may access this table.';
commit;
