-- Enable UUID generation extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  subscription_tier TEXT NOT NULL DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'pro', 'agency'))
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users (email);

-- 2. AUDITS TABLE
CREATE TABLE IF NOT EXISTS public.audits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  business_name TEXT NOT NULL,
  place_id TEXT NOT NULL,
  city TEXT NOT NULL,
  website_url TEXT,
  health_score INTEGER NOT NULL CHECK (health_score >= 0 AND health_score <= 100),
  raw_audit_data JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audits_user_id ON public.audits (user_id);
CREATE INDEX IF NOT EXISTS idx_audits_place_id ON public.audits (place_id);
CREATE INDEX IF NOT EXISTS idx_audits_created_at ON public.audits (created_at DESC);

-- 3. LEADS TABLE
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  audit_id UUID NOT NULL REFERENCES public.audits(id) ON DELETE CASCADE,
  business_email TEXT NOT NULL,
  phone TEXT,
  claimed_status BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_audit_id ON public.leads (audit_id);
CREATE INDEX IF NOT EXISTS idx_leads_business_email ON public.leads (business_email);

-- ROW LEVEL SECURITY (RLS)
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audits ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Users can read their own profile
CREATE POLICY "Users can view own record"
  ON public.users
  FOR SELECT
  USING (auth.uid() = id);

-- Public and authenticated users can view audits by ID
CREATE POLICY "Anyone can read audits"
  ON public.audits
  FOR SELECT
  USING (true);
  