import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  },
  server: {
    DB_URL: z.string().min(1),
    FIREWORKS_API_KEY: z.string().min(1),
    WEBHOOK_SECRET: z.string().min(1),
    TURSO_DATABASE_URL: z.string().min(1),
    TURSO_AUTH_TOKEN: z.string().min(1),
    GROQ_API_KEY: z.string().min(1),
  },
  runtimeEnv: {
    DB_URL: process.env.DB_URL,
    FIREWORKS_API_KEY: process.env.FIREWORKS_API_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    WEBHOOK_SECRET: process.env.WEBHOOK_SECRET,
    TURSO_DATABASE_URL: process.env.TURSO_DATABASE_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
    GROQ_API_KEY: process.env.GROQ_API_KEY,
  },
});
