import { db } from "@/server/db/client";
import { conversations } from "@/server/db/schema/conversations";
import { usage } from "@/server/db/schema/usage";

import { StreamingTextResponse, streamText } from "ai";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { startOfDay } from "date-fns";
import { getConversationCost } from "@/utils/get-conversation-cost";
import { getModelFunction } from "../new/get-model-functions";
import { currentUser } from "@clerk/nextjs/server";
import { users } from "@/server/db/schema/users";

const startOfDayDate = startOfDay(new Date()).toLocaleDateString();

export async function POST(
  req: Request,
  { params: { id } }: { params: { id: number } },
) {
  const { messages } = await req.json();
  const user = await currentUser();

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const userId = user.id;

  // Get the user's profile
  const profileQuery = await db
    .select()
    .from(users)
    .where(eq(users.id, userId));

  if (!profileQuery.length) {
    return new Response("Profile not found", { status: 404 });
  }
  const profile = profileQuery[0];

  // Get the remaining credits. If they are less than 0.5, return an error
  if (profile?.credits < 0.5) {
    return new Response("Insufficient credits", { status: 402 });
  }

  const conversationQuery = await db
    .select()
    .from(conversations)
    .where(and(eq(conversations.id, id), eq(conversations.userId, userId!)));

  if (!conversationQuery.length) {
    return new Response("Conversation not found", { status: 404 });
  }

  const conversationModel = conversationQuery[0].model;
  try {
    const result = await streamText({
      model: getModelFunction(conversationModel),
      maxTokens: 512,
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI assistant. Please follow the instructions provided to you carefully",
        },
        ...messages,
      ],
    });

    const stream = result.toAIStream({
      onFinal: async (completion) => {
        // Append the completion to the messages
        const finalMessages = [
          ...messages,
          { role: "assistant", content: completion },
        ];

        // Get the usage from the result
        const usageResult = await result.usage;
        // Get the usage for the day
        const usageQuery = await db
          .select()
          .from(usage)
          .where(and(eq(usage.chatId, id), eq(usage.date, startOfDayDate)));
        const dailyUsage = usageQuery[0];

        // Add the usage to the daily usage
        const inputUsageResult = isNaN(usageResult.promptTokens)
          ? 0
          : usageResult.promptTokens;
        const outputUsageResult = isNaN(usageResult.completionTokens)
          ? 0
          : usageResult.completionTokens;

        const newInputUsage = inputUsageResult + (dailyUsage?.input || 0);
        const newOutputUsage = outputUsageResult + (dailyUsage?.output || 0);

        // Store both the conversation and the usage in the db
        try {
          await db
            .update(conversations)
            .set({
              messages: finalMessages,
            })
            .where(eq(conversations.id, id));

          await db
            .insert(usage)
            .values({
              userId,
              chatId: id,
              input: inputUsageResult,
              output: outputUsageResult,
              date: startOfDayDate,
            })
            .onConflictDoUpdate({
              target: [usage.date, usage.chatId],
              set: {
                input: newInputUsage,
                output: newOutputUsage,
              },
            });

          // Get the price for the usage and update the user's credits
          const { totalCost } = getConversationCost({
            model: conversationModel,
            inputTokens: inputUsageResult,
            outputTokens: outputUsageResult,
          });

          await db.update(users).set({
            credits: profile.credits - totalCost,
          });

          revalidatePath(`/chat/${id}`);
        } catch (error) {
          console.error(error);
        }
      },
    });

    return new StreamingTextResponse(stream);
  } catch (error) {
    return new Response(JSON.stringify(error), { status: 400 });
  }
}
