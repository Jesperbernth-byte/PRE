-- Run this once in Supabase SQL editor if you want the form-submitted
-- email and source values persisted alongside the existing chat leads.
--
-- Both columns are optional from the API's perspective — submit-lead.js
-- only includes them if the values are non-empty, so older databases
-- without these columns will continue to work for the chat path.

-- The live table is `leads` (not pre_leads) per api/submit-lead.js.
-- Adjust the table name below if your installation uses a different one.

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS email TEXT;

-- `source` already exists in migration-leads.sql with default 'website_chat'.
-- If your live table is missing it, uncomment:
-- ALTER TABLE leads
--   ADD COLUMN IF NOT EXISTS source VARCHAR(50) DEFAULT 'form';

-- `conversation_log` already exists in migration-leads.sql. If missing:
-- ALTER TABLE leads
--   ADD COLUMN IF NOT EXISTS conversation_log TEXT;
