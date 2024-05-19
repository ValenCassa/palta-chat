import {
  integer,
  real,
  sqliteTable,
  text,
  unique,
} from "drizzle-orm/sqlite-core";
import { conversations } from "./conversations";
import { users } from "./users";
import { sql } from "drizzle-orm";

export const usage = sqliteTable(
  "usage",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .references(() => users.id)
      .notNull(),
    chatId: integer("chat_id").references(() => conversations.id, {
      onDelete: "set null",
    }),
    input: real("input").notNull(),
    output: real("output").notNull(),
    date: text("date").$defaultFn(() => sql`(CURRENT_TIMESTAMP)`),
  },
  (table) => ({
    unq: unique().on(table.chatId, table.date),
  }),
);

export type Usage = typeof usage.$inferSelect;
export type InsertUsage = typeof usage.$inferInsert;
