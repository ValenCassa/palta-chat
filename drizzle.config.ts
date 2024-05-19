//@ts-ignore

import "dotenv/config";
import { Config, defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./server/db/schema/*",
  schemaFilter: ["**/*.ts"],
  dialect: "sqlite",
  out: "./server/db/migrations",
  driver: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  strict: true,
  verbose: true,
}) satisfies Config;
