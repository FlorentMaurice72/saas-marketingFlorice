-- ─────────────────────────────────────────────────────────────────────────────
-- FlowMarketing — Supabase schema
-- Run this in Supabase → SQL Editor to initialise the database.
-- ─────────────────────────────────────────────────────────────────────────────

-- ── Extensions ────────────────────────────────────────────────────────────────

create extension if not exists "uuid-ossp";

-- ── Enums ─────────────────────────────────────────────────────────────────────

create type campaign_type   as enum ('email', 'ads', 'social');
create type campaign_status as enum ('draft', 'published');

-- ── users ─────────────────────────────────────────────────────────────────────
-- Mirrors the in-memory store in lib/auth/users.ts.
-- Populated on first sign-in when switching from in-memory → DB auth.

create table if not exists public.users (
  id             uuid primary key default uuid_generate_v4(),
  email          text not null unique,
  name           text,
  hashed_password text,
  plan           text not null default 'free',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_updated_at
  before update on public.users
  for each row execute procedure public.set_updated_at();

-- ── campaigns ─────────────────────────────────────────────────────────────────

create table if not exists public.campaigns (
  id         uuid primary key default uuid_generate_v4(),
  user_id    uuid not null references public.users(id) on delete cascade,
  name       text not null,
  type       campaign_type   not null default 'email',
  status     campaign_status not null default 'draft',
  content    text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger campaigns_updated_at
  before update on public.campaigns
  for each row execute procedure public.set_updated_at();

-- ── Indexes ───────────────────────────────────────────────────────────────────

-- Fast lookup of all campaigns for a user (used in getUserCampaigns)
create index if not exists idx_campaigns_user_id
  on public.campaigns (user_id, created_at desc);

-- ── Row Level Security ────────────────────────────────────────────────────────
-- RLS is enabled on both tables.
-- When using Supabase Auth (future): policies use auth.uid().
-- Currently the application enforces isolation via service-role + user_id filter.

alter table public.users     enable row level security;
alter table public.campaigns enable row level security;

-- users: service-role bypass (current) — no anon/user policies needed yet
-- campaigns: service-role bypass (current)

-- ── Future policies (uncomment when switching to Supabase Auth) ───────────────

-- Users can read their own profile
-- create policy "users: self read"
--   on public.users for select
--   using (auth.uid() = id);

-- Users can update their own profile
-- create policy "users: self update"
--   on public.users for update
--   using (auth.uid() = id);

-- Users can only see their own campaigns
-- create policy "campaigns: owner select"
--   on public.campaigns for select
--   using (auth.uid() = user_id);

-- Users can only insert campaigns for themselves
-- create policy "campaigns: owner insert"
--   on public.campaigns for insert
--   with check (auth.uid() = user_id);

-- Users can only update their own campaigns
-- create policy "campaigns: owner update"
--   on public.campaigns for update
--   using (auth.uid() = user_id);

-- Users can only delete their own campaigns
-- create policy "campaigns: owner delete"
--   on public.campaigns for delete
--   using (auth.uid() = user_id);
