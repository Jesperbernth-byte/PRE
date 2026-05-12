-- Rate limit log til /api/submit-lead. Bruges af lib/rateLimit.js
-- til at sikre at en enkelt IP ikke kan spamme henvendelsesformularen.
--
-- Run this once i Supabase SQL editor.

CREATE TABLE IF NOT EXISTS submit_rate_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_submit_rate_log_ip_created
  ON submit_rate_log(ip, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_submit_rate_log_created
  ON submit_rate_log(created_at);

ALTER TABLE submit_rate_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access on submit_rate_log"
  ON submit_rate_log
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Valgfri cleanup-funktion: kør evt. som cron hver uge for at
-- slette gamle logs (vi har kun brug for de seneste timer):
--
-- SELECT cron.schedule('purge_submit_rate_log', '0 3 * * 0',
--   $$ DELETE FROM submit_rate_log WHERE created_at < NOW() - INTERVAL '7 days' $$);
