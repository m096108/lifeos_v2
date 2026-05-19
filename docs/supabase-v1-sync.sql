-- LifeOS · v1 sync table
-- Single JSONB blob per user. Run this once in your Supabase SQL editor.
-- Designed to coexist with the relational schema in supabase.sql — we'll
-- migrate from this blob to the proper tables in a future phase.

create table if not exists user_state (
  user_id     uuid primary key references auth.users on delete cascade,
  state       jsonb not null default '{}',
  updated_at  timestamptz default now()
);

alter table user_state enable row level security;
drop policy if exists "own state" on user_state;
create policy "own state" on user_state
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
