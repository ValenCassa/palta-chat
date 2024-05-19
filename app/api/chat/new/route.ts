import { db } from "@/server/db/client";
import {
  Message,
  Models,
  conversations,
} from "@/server/db/schema/conversations";
import { InsertUsage } from "@/server/db/schema/usage";
import { openai } from "@ai-sdk/openai";
import {
  JSONValue,
  StreamData,
  StreamingTextResponse,
  generateText,
  streamText,
} from "ai";
import { usage as usageTable } from "@/server/db/schema/usage";
import { getModelFunction } from "./get-model-functions";
import { eq } from "drizzle-orm";
import { getConversationCost } from "@/utils/get-conversation-cost";
import { currentUser } from "@clerk/nextjs/server";
import { users } from "@/server/db/schema/users";

export async function POST(req: Request) {
  const { messages, model } = await req.json();
  const user = await currentUser();

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }

  // Get the user's profile
  const profileQuery = await db
    .select()
    .from(users)
    .where(eq(users.id, user.id));
  if (!profileQuery.length) {
    return new Response("Profile not found", { status: 404 });
  }
  const profile = profileQuery[0];

  // Get the remaining credits. If they are less than 0.5, return an error
  if (profile.credits < 0.5) {
    return new Response("Insufficient credits", { status: 402 });
  }

  const result = await streamText({
    model: getModelFunction(model),
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

  const returningData = new StreamData();

  const stream = result.toAIStream({
    onFinal: async (completion) => {
      // Get the user message and generate a chat name based on it
      const userMessage = messages[0];
      const { text: name, usage: nameUsage } = await generateText({
        model: openai("gpt-4-turbo"),
        system:
          "You are an AI assistant specialized in generating unique and contextually relevant chat names based on the user's input. When a user asks a question or makes a statement, create a catchy and precise chat name that encapsulates the main idea or theme of their input. Focus on specific keywords and context to ensure the names are relevant and engaging. Avoid generic or overly broad names. Do not include quotes.",
        prompt: userMessage.content,
      });

      // Insert the conversation and usage data into the database
      const _messages: Message[] = [
        ...messages,
        {
          role: "assistant",
          content: completion,
        },
      ];
      const chatResponse = await db
        .insert(conversations)
        .values({
          name,
          messages: _messages,
          model,
          userId: user.id,
        })
        .returning();

      const resultUsage = await result.usage;
      console.log(resultUsage);

      const _usage: InsertUsage = {
        input: resultUsage.promptTokens + nameUsage.promptTokens,
        output: resultUsage.completionTokens + nameUsage.completionTokens,
        userId: user.id,
        chatId: chatResponse[0].id,
      };

      const usageResponse = await db
        .insert(usageTable)
        .values(_usage)
        .returning();

      // Append the final conversation data to the stream
      const conversation = {
        conversation: chatResponse[0],
        usage: usageResponse[0],
      };

      returningData.append(conversation as unknown as JSONValue);

      // Get the price for the usage and update the user's credits
      const { totalCost } = getConversationCost({
        model: model as Models[number],
        inputTokens: _usage.input,
        outputTokens: _usage.output,
      });

      await db.update(users).set({
        credits: profile.credits - totalCost,
      });

      // Close the stream
      returningData.close();
    },
  });

  return new StreamingTextResponse(stream, {}, returningData);
}
