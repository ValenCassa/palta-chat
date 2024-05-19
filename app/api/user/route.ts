import { db } from "@/server/db/client";
import { users } from "@/server/db/schema/users";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const GET = async () => {
  const user = await currentUser();

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }

  const data = await db.select().from(users).where(eq(users.id, user.id));

  if (!data[0]) {
    return new Response("User not found", { status: 404 });
  }

  return new Response(JSON.stringify(data[0]), {
    headers: {
      "content-type": "application/json",
    },
  });
};
