"use server";

import { db } from "@/server/db/client";
import { conversations } from "@/server/db/schema/conversations";
import { usage } from "@/server/db/schema/usage";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export const duplicateChat = async (chatId: number) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Get the chat from the database
  const chats = await db
    .select()
    .from(conversations)
    .where(
      and(eq(conversations.id, chatId), eq(conversations.userId, user.id)),
    );

  const chat = chats[0];

  if (!chat) {
    return notFound();
  }

  // Create a new chat
  const newChat = await db
    .insert(conversations)
    .values({
      name: chat.name,
      userId: user.id,
      model: chat.model,
      messages: chat.messages,
    })
    .returning();

  await db.insert(usage).values({
    chatId: newChat[0].id,
    input: 0,
    output: 0,
    userId: user.id,
  });

  return newChat[0];
};
