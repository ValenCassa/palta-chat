"use server";

import { db } from "@/server/db/client";
import { conversations } from "@/server/db/schema/conversations";
import { currentUser } from "@clerk/nextjs/server";

import { and, eq } from "drizzle-orm";

interface ShareConversationArgs {
  conversationId: number;
  isPublic: boolean;
}
export const shareConversation = async ({
  conversationId,
  isPublic,
}: ShareConversationArgs) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }

  await db
    .update(conversations)
    .set({
      public: isPublic,
    })
    .where(
      and(
        eq(conversations.id, conversationId),
        eq(conversations.userId, user?.id!),
      ),
    );
};
