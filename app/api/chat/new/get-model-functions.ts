"server-only";

import { Models } from "@/server/db/schema/conversations";
import { env } from "@/utils/env";
import { createOpenAI, openai } from "@ai-sdk/openai";

const fireworks = createOpenAI({
  apiKey: env.FIREWORKS_API_KEY,
  baseURL: "https://api.fireworks.ai/inference/v1",
});

const groq = createOpenAI({
  apiKey: env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export const getModelFunction = (model: Models[number]) => {
  switch (model) {
    case "gpt-3.5-turbo":
    case "gpt-4":
    case "gpt-4-turbo":
    case "gpt-4o":
      return openai(model);
    case "meta-llama-3-70b-instruct":
      return fireworks("accounts/fireworks/models/llama-v3-70b-instruct");

    case "mixtral-8x22b-instruct":
    case "mixtral-8x7b-instruct":
      return fireworks(`accounts/fireworks/models/${model}`);

    case "gemma-7b-it-groq":
    case "llama3-70b-8192-groq":
    case "llama3-8b-8192-groq":
    case "mixtral-8x7b-32768-groq":
      // remove -groq
      const _model = model.replace(/-groq$/, "");
      return groq(_model);
    default:
      throw Error(`Model ${model} is not supported`);
  }
};
