"use server";

import { db } from "@/server/db/client";

import { conversations } from "@/server/db/schema/conversations";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

interface DeleteChatArgs {
  chatId: number;
}
export const deleteChat = async ({ chatId }: DeleteChatArgs) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }

  await db
    .delete(conversations)
    .where(
      and(eq(conversations.id, chatId), eq(conversations.userId, user.id)),
    );

  revalidatePath("/");
};
