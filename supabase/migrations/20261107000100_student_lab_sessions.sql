-- Apply after the commerce foundation migration.
create table if not exists public.student_lab_sessions (
 token_hash text primary key check (token_hash ~ '^[a-f0-9]{64}$'),
 user_id uuid not null references auth.users(id) on delete cascade,
 expires_at timestamptz not null,
 created_at timestamptz not null default now()
);
alter table public.student_lab_sessions enable row level security;
revoke all on public.student_lab_sessions from anon, authenticated;
create index if not exists student_lab_expiry on public.student_lab_sessions(expires_at);
-- Only the server service-role can issue or read lab sessions.
-- Provision students through Supabase Auth, create their student_profiles row,
-- and grant an active, dated 'academy' entitlement after enrolment verification.
-- Never grant students permission to insert/update their own entitlements.
