import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  credits: integer("credits").default(0).notNull(),
  email: text("email").notNull(),
  createdAt: text("created_at").$defaultFn(() => sql`(CURRENT_TIMESTAMP)`),
  profileThumbnail: text("profile_thumbnail"),
});

export type User = typeof users.$inferSelect;
