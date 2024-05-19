import { CoreMessage } from "ai";
import { blob, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";
import { users } from "./users";

export interface Message {
  role: CoreMessage["role"];
  content: string;
}
export interface Usage {
  input: number;
  output: number;
}

export const models = [
  "gpt-3.5-turbo",
  "gpt-4",
  "gpt-4-turbo",
  "gpt-4o",

  "meta-llama-3-70b-instruct",

  "mixtral-8x7b-instruct",
  "mixtral-8x22b-instruct",

  "llama3-70b-8192-groq",
  "llama3-8b-8192-groq",
  "gemma-7b-it-groq",
  "mixtral-8x7b-32768-groq",
] as const;

export type Models = typeof models;

export const conversations = sqliteTable("conversations", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  name: text("name").notNull(),
  model: text("model", { enum: models }).notNull(),
  public: integer("public", { mode: "boolean" }).default(false).notNull(),
  messages: blob("messages", { mode: "json" }).$type<Message[]>().notNull(),
  createdAt: text("created_at")
    .$defaultFn(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
  updatedAt: text("updated_at")
    .$defaultFn(() => sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
