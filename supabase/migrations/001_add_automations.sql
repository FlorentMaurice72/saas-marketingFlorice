-- Migration: add automations table
-- Run this in Supabase → SQL Editor

create type if not exists automation_status       as enum ('draft', 'active', 'paused');
create type if not exists automation_trigger_type as enum ('contact_created', 'campaign_opened', 'campaign_clicked', 'tag_added', 'time_delay');

create table if not exists public.automations (
  id                uuid                     primary key default uuid_generate_v4(),
  user_id           uuid                     not null references public.users(id) on delete cascade,
  name              text                     not null,
  status            automation_status        not null default 'draft',
  trigger_type      automation_trigger_type  not null,
  trigger_config    jsonb                    not null default '{}',
  steps             jsonb                    not null default '[]',
  contacts_enrolled integer                  not null default 0,
  created_at        timestamptz              not null default now(),
  updated_at        timestamptz              not null default now()
);

create trigger automations_updated_at
  before update on public.automations
  for each row execute procedure public.set_updated_at();

create index if not exists idx_automations_user_id
  on public.automations (user_id, created_at desc);

alter table public.automations enable row level security;
