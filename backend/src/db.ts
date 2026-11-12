// Postgres client (Supabase). Importing 'dotenv/config' here — not relying on
// server.ts's dotenv.config() — because ESM evaluates this module body before
// the server module body, and the client needs DATABASE_URL at that moment.
import 'dotenv/config';
import postgres, { Sql } from 'postgres';

const rawUrl = (process.env.DATABASE_URL || '').trim();
export const isDatabaseConfigured = Boolean(rawUrl && !rawUrl.includes('[YOUR-PASSWORD]'));

// prepare: false is required on Supabase's transaction pooler (port 6543),
// which doesn't support prepared statements — keep it even after switching
// to a direct/session connection; the cost is negligible at this scale.
export const sql: Sql | null = isDatabaseConfigured
  ? postgres(rawUrl, {
      prepare: false,
      connect_timeout: 8,
      idle_timeout: 20,
      max: 10,
    })
  : null;

export default sql as Sql;
