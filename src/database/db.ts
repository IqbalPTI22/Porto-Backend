// Initializes PostgreSQL connection and Drizzle client for the whole app.
import "dotenv/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is required. Check your .env file.");
}

const sql = postgres(process.env.DATABASE_URL, {
  prepare: false,
});

export const db = drizzle(sql);
