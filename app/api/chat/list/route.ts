import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/server/db/client";
import { conversations } from "@/server/db/schema/conversations";
import { desc, eq } from "drizzle-orm";

export const GET = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const chats = await db
    .select({
      id: conversations.id,
      name: conversations.name,
      public: conversations.public,
      model: conversations.model,
    })
    .from(conversations)
    .where(eq(conversations.userId, user.id))
    .orderBy(desc(conversations.createdAt));

  return new Response(JSON.stringify(chats));
};
