import { createClient } from "@libsql/client";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) throw new Error("TURSO_DATABASE_URL e TURSO_AUTH_TOKEN são obrigatórios");

const client = createClient({ url, authToken });
await client.execute(`CREATE TABLE IF NOT EXISTS transactions (
  id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  description TEXT NOT NULL,
  category TEXT DEFAULT 'Outros' NOT NULL,
  account TEXT NOT NULL,
  type TEXT NOT NULL,
  recurrence TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  start_date TEXT NOT NULL,
  installment_count INTEGER DEFAULT 1 NOT NULL,
  paid INTEGER DEFAULT 0 NOT NULL,
  paid_at TEXT,
  created_at TEXT NOT NULL
)`);
const columns = await client.execute("PRAGMA table_info(transactions)");
const names = new Set(columns.rows.map((row) => String(row.name)));
if (!names.has("paid")) await client.execute("ALTER TABLE transactions ADD paid INTEGER DEFAULT 0 NOT NULL");
if (!names.has("paid_at")) await client.execute("ALTER TABLE transactions ADD paid_at TEXT");
console.log("Turso schema ready");
