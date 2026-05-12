-- Stores deployment events from Vercel webhook.
-- Used by /api/site-editor/deploy-status to tell admin UI whether
-- a build is done, succeeded, or errored.
--
-- Run this once in Supabase SQL editor.

CREATE TABLE IF NOT EXISTS vercel_deploy_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  received_at TIMESTAMPTZ DEFAULT NOW(),
  event_type TEXT NOT NULL,                       -- deployment.created/succeeded/ready/error/canceled
  state TEXT,                                     -- READY | ERROR | BUILDING | CANCELED | QUEUED
  deployment_id TEXT,
  deployment_url TEXT,
  commit_sha TEXT,
  branch TEXT,
  target TEXT,                                    -- production | preview
  project_name TEXT,
  raw_payload JSONB
);

CREATE INDEX IF NOT EXISTS idx_vercel_deploy_events_commit_sha
  ON vercel_deploy_events(commit_sha);

CREATE INDEX IF NOT EXISTS idx_vercel_deploy_events_received_at
  ON vercel_deploy_events(received_at DESC);

ALTER TABLE vercel_deploy_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on vercel_deploy_events"
  ON vercel_deploy_events
  FOR ALL
  USING (true)
  WITH CHECK (true);
