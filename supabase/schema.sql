-- BoxManager — Schéma base de données
-- À exécuter dans Supabase > SQL Editor

-- ─── demo_requests ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.demo_requests (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name         text NOT NULL,
  email        text NOT NULL,
  company      text,
  boxes_count  text,
  message      text,
  created_at   timestamptz DEFAULT now()
);

-- ─── subscriptions ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id                       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email                    text NOT NULL,
  plan                     text NOT NULL CHECK (plan IN ('essentiel', 'pro')),
  stripe_customer_id       text,
  stripe_subscription_id   text UNIQUE,
  status                   text NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
  created_at               timestamptz DEFAULT now(),
  updated_at               timestamptz DEFAULT now()
);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE public.demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
