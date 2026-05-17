-- LifeOS · Supabase schema
-- Run this in your Supabase SQL editor. Designed for single-user-per-account
-- (no sharing yet); every row is scoped by `user_id = auth.uid()` via RLS.
-- ---------------------------------------------------------------------------

-- Enable required extension for gen_random_uuid()
create extension if not exists "pgcrypto";

-- =========================================================================
-- TABLES
-- =========================================================================

-- Profile / user prefs
create table if not exists profile (
  user_id        uuid primary key references auth.users on delete cascade,
  name           text default '',
  age            int default 22,
  sex            text default 'female',     -- 'female' | 'male'
  ab_event       text default 'plank',      -- 'plank' | 'crunches' (PFT)
  last_brief     date,
  last_close     date,
  created_at     timestamptz default now()
);

-- Tag primitive used across the app (trips, tasks, inspo, books, etc.)
create table if not exists tags (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  name           text not null,
  color          text default '#4458E0',
  created_at     timestamptz default now()
);

-- Task contexts (home/out/work/anywhere) — user-editable lists
create table if not exists task_contexts (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  name           text not null,
  position       int default 0,
  unique (user_id, name)
);

-- Tasks (standalone OR attached to a project)
create table if not exists tasks (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  title          text not null,
  context        text,                       -- references task_contexts.name
  priority       int  default 2,             -- 1 critical, 2 normal, 3 low
  due_date       date,
  status         text default 'todo',        -- 'todo' | 'done'
  completed_at   date,
  project_id     uuid references projects(id) on delete cascade,
  pin_today      boolean default false,      -- show on Today even if project task
  recurrence     text,                       -- null | daily | weekly | biweekly | monthly
  created_at     timestamptz default now()
);

create table if not exists projects (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  title          text not null,
  notes          text default '',
  status         text default 'active',
  updated_at     date default current_date,
  created_at     timestamptz default now()
);

-- Trips
create table if not exists trips (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  destination    text not null,
  start_date     date,
  end_date       date,
  activity_ideas text default '',
  outfit_ideas   text default '',
  tag_id         uuid references tags(id) on delete set null,
  created_at     timestamptz default now()
);

-- Trip checklists (planning + packing items)
create table if not exists trip_checklist (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  trip_id        uuid not null references trips(id) on delete cascade,
  title          text not null,
  kind           text default 'packing',     -- 'planning' | 'packing'
  completed      boolean default false,
  position       int default 0
);

-- Workout categories (Run, Strength, etc.) — user-managed
create table if not exists workout_categories (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  name           text not null,
  color          text default '#4458E0'
);

create table if not exists workouts (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  date           date not null,
  category_id    uuid references workout_categories(id) on delete set null,
  duration_minutes int default 0,
  notes          text default ''
);

-- Marine fitness test logs
create table if not exists pft_entries (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  date           date not null,
  pullups        int,
  plank_s        int,
  run_s          int
);

create table if not exists cft_entries (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  date           date not null,
  mtc_s          int,
  acl            int,
  manuf_s        int
);

-- Style — wishlist, outfit ideas
create table if not exists style_items (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  kind           text not null,              -- 'outfit_idea' | 'want_to_buy'
  title          text not null,
  notes          text default '',
  price          numeric,
  photo_url      text,                       -- store in Supabase Storage
  done           boolean default false,
  created_at     timestamptz default now()
);

-- Inspo photos — taggable to trip + tag list
create table if not exists inspo (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  photo_url      text not null,              -- Storage object URL
  trip_id        uuid references trips(id) on delete set null,
  created_at     timestamptz default now()
);

-- Junction table — inspo ↔ tags (categories) (many-to-many)
create table if not exists inspo_tags (
  inspo_id       uuid references inspo(id) on delete cascade,
  tag_id         uuid references tags(id) on delete cascade,
  primary key (inspo_id, tag_id)
);

-- Books
create table if not exists books (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  title          text not null,
  author         text,
  status         text default 'to_read',     -- 'to_read' | 'reading' | 'read'
  rating         int,                         -- 1..5
  notes          text default '',
  position       int default 0,
  categories     text[] default '{}',
  created_at     timestamptz default now()
);

-- Reference (passport, FF#s, etc.) — JSON for flexibility
create table if not exists reference (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid not null references auth.users on delete cascade,
  category       text not null,              -- 'documents' | 'memberships' | 'emergency' | 'other'
  label          text not null,
  fields         jsonb default '[]',         -- [{k,v,sensitive}]
  created_at     timestamptz default now()
);

-- =========================================================================
-- ROW-LEVEL SECURITY  (every table: user can only see/edit their own rows)
-- =========================================================================
do $$
declare t text;
begin
  for t in select unnest(array[
    'profile','tags','task_contexts','tasks','projects','trips','trip_checklist',
    'workout_categories','workouts','pft_entries','cft_entries','style_items',
    'inspo','inspo_tags','books','reference'
  ])
  loop
    execute format('alter table %I enable row level security;', t);
    execute format('drop policy if exists "own rows" on %I;', t);
  end loop;
end$$;

-- profile keyed by user_id (not id)
create policy "own rows" on profile
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- All other user-scoped tables follow the same pattern
do $$
declare t text;
begin
  for t in select unnest(array[
    'tags','task_contexts','tasks','projects','trips','trip_checklist',
    'workout_categories','workouts','pft_entries','cft_entries','style_items',
    'inspo','books','reference'
  ])
  loop
    execute format($f$create policy "own rows" on %I for all using (user_id = auth.uid()) with check (user_id = auth.uid());$f$, t);
  end loop;
end$$;

-- inspo_tags is a join; check via parent
create policy "own rows" on inspo_tags
  for all using (exists (select 1 from inspo i where i.id = inspo_tags.inspo_id and i.user_id = auth.uid()))
  with check  (exists (select 1 from inspo i where i.id = inspo_tags.inspo_id and i.user_id = auth.uid()));

-- =========================================================================
-- INDEXES
-- =========================================================================
create index if not exists idx_tasks_user_status   on tasks(user_id, status);
create index if not exists idx_tasks_due           on tasks(user_id, due_date);
create index if not exists idx_workouts_user_date  on workouts(user_id, date desc);
create index if not exists idx_inspo_trip          on inspo(trip_id);
create index if not exists idx_trip_checklist_trip on trip_checklist(trip_id);

-- =========================================================================
-- STORAGE
-- =========================================================================
-- Create one bucket per asset type in the Supabase UI:
--   "inspo"  · public read, authenticated write
--   "style"  · public read, authenticated write
-- Store photo_url as the full public URL or the path; resolve client-side.
