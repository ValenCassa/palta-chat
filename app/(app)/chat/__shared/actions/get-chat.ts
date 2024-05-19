"use server";

import { db } from "@/server/db/client";
import { conversations } from "@/server/db/schema/conversations";
import { Usage, usage } from "@/server/db/schema/usage";
import { currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

interface GetChat {
  chatId: number;
}
export const getChat = unstable_cache(async ({ chatId }: GetChat) => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }

  const chats = await db
    .select()
    .from(conversations)
    .where(and(eq(conversations.id, chatId), eq(conversations.userId, user.id)))
    .innerJoin(usage, eq(conversations.id, usage.chatId));

  if (!chats.length) {
    return notFound();
  }

  const _usage = chats.reduce<Pick<Usage, "input" | "output">>(
    (acc, curr) => {
      return {
        input: acc.input + curr.usage.input,
        output: acc.output + curr.usage.output,
      };
    },
    {
      input: 0,
      output: 0,
    },
  );

  const chat = { ...chats[0].conversations, usage: _usage };

  return chat;
});
