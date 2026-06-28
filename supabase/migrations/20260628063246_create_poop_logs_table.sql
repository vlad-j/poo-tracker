/*
# Create poop_logs table (single-tenant, no auth)

1. New Tables
- `poop_logs`
- `id` (uuid, primary key)
- `timestamp` (timestamptz, when it happened)
- `duration_minutes` (integer, how long on the throne)
- `mood` (text, how they felt after: amazing, good, okay, bad, terrible)
- `notes` (text, optional confessions/details)
- `created_at` (timestamptz, when the entry was logged)

2. Security
- Enable RLS on `poop_logs`.
- Allow anon + authenticated CRUD because the data is intentionally shared/public (single-tenant, no sign-in).
*/

CREATE TABLE IF NOT EXISTS poop_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz NOT NULL DEFAULT now(),
  duration_minutes integer NOT NULL DEFAULT 5,
  mood text NOT NULL DEFAULT 'okay',
  notes text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE poop_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_poop_logs" ON poop_logs;
CREATE POLICY "anon_select_poop_logs" ON poop_logs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_poop_logs" ON poop_logs;
CREATE POLICY "anon_insert_poop_logs" ON poop_logs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_poop_logs" ON poop_logs;
CREATE POLICY "anon_update_poop_logs" ON poop_logs FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_poop_logs" ON poop_logs;
CREATE POLICY "anon_delete_poop_logs" ON poop_logs FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_poop_logs_timestamp ON poop_logs(timestamp DESC);
