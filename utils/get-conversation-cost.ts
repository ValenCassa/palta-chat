import { Models } from "@/server/db/schema/conversations";
import { MODELS } from "./constants";

interface GetConversationCostArgs {
  model: Models[number];
  inputTokens: number;
  outputTokens: number;
}

export const getConversationCost = ({
  model,
  inputTokens,
  outputTokens,
}: GetConversationCostArgs) => {
  const { pricing } = MODELS[model];

  const inputCost = (inputTokens / 1000000) * pricing.input;
  const outputCost = (outputTokens / 1000000) * pricing.output;

  const totalCost = inputCost + outputCost;

  return {
    inputCost,
    outputCost,
    totalCost,
  };
};
