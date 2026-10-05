// Postgres client (Supabase). Importing 'dotenv/config' here — not relying on
// server.ts's dotenv.config() — because ESM evaluates this module body before
// the server module body, and the client needs DATABASE_URL at that moment.
import 'dotenv/config';
import postgres from 'postgres';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set — add the Supabase connection string to backend/.env');
}

const sql = postgres(connectionString);

export default sql;
