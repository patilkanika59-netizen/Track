-- Rhythm: daily routine tracker schema
-- Run this in the Supabase SQL editor (Project -> SQL Editor -> New query).

create extension if not exists "uuid-ossp";

-- Habits/routines a user has defined
create table if not exists public.routines (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text,
  time_of_day text default 'anytime' check (time_of_day in ('morning', 'afternoon', 'evening', 'anytime')),
  created_at timestamptz default now()
);

-- One row per routine per day it was completed
create table if not exists public.routine_logs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid not null references auth.users(id) on delete cascade,
  routine_id uuid not null references public.routines(id) on delete cascade,
  date date not null default current_date,
  completed boolean default true,
  created_at timestamptz default now(),
  unique (routine_id, date)
);

alter table public.routines enable row level security;
alter table public.routine_logs enable row level security;

-- Users can only see and modify their own routines
create policy "Users manage their own routines"
  on public.routines for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Users can only see and modify their own logs
create policy "Users manage their own routine logs"
  on public.routine_logs for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create index if not exists routines_user_id_idx on public.routines(user_id);
create index if not exists routine_logs_user_date_idx on public.routine_logs(user_id, date);
