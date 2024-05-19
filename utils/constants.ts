import { Models } from "@/server/db/schema/conversations";

export type Provider = "OpenAI" | "Meta" | "Mistral" | "Groq";

export interface ModelPricing {
  input: number;
  output: number;
}
export interface Model {
  provider: Provider;
  context: number;
  supportsFileUpload?: boolean;
  pricing: ModelPricing;
}

export const MODELS: Record<Models[number], Model> = {
  // OpenAI
  "gpt-3.5-turbo": {
    provider: "OpenAI",
    context: 16000,
    pricing: {
      input: 0.35,
      output: 1.875,
    },
  },
  "gpt-4": {
    context: 25000,
    pricing: {
      input: 37.5,
      output: 75,
    },
    provider: "OpenAI",
  },
  "gpt-4-turbo": {
    context: 128000,
    pricing: {
      input: 12.5,
      output: 37.5,
    },
    provider: "OpenAI",
    supportsFileUpload: true,
  },
  "gpt-4o": {
    context: 128000,
    pricing: {
      input: 6.25,
      output: 18.75,
    },
    provider: "OpenAI",
    supportsFileUpload: true,
  },

  // Fireworks AI
  "meta-llama-3-70b-instruct": {
    context: 8000,
    pricing: {
      input: 1.125,
      output: 1.125,
    },
    provider: "Meta",
  },
  "mixtral-8x22b-instruct": {
    context: 8192,
    pricing: {
      input: 1.125,
      output: 1.125,
    },
    provider: "Mistral",
  },
  "mixtral-8x7b-instruct": {
    context: 4096,
    pricing: {
      input: 0.625,
      output: 0.625,
    },
    provider: "Mistral",
  },

  // Groq
  "llama3-70b-8192-groq": {
    context: 8192,
    pricing: {
      input: 1.125,
      output: 1.125,
    },
    provider: "Groq",
  },
  "llama3-8b-8192-groq": {
    context: 8192,
    pricing: {
      input: 0.625,
      output: 0.625,
    },
    provider: "Groq",
  },
  "gemma-7b-it-groq": {
    context: 8192,
    pricing: {
      input: 0.625,
      output: 0.625,
    },
    provider: "Groq",
  },
  "mixtral-8x7b-32768-groq": {
    context: 32768,
    pricing: {
      input: 1.125,
      output: 1.125,
    },
    provider: "Groq",
  },
};

export const PROVIDER_ICON: Record<Provider, string> = {
  OpenAI: "/providers/openai.svg",
  Meta: "/providers/meta.svg",
  Mistral: "/providers/mistral.svg",
  Groq: "/providers/groq.png",
};

export const PROVIDER_CHAT_ICON: Record<Provider, string> = {
  OpenAI: "/providers/openai-chat.png",
  Meta: "/providers/meta-chat.png",
  Mistral: "/providers/mistral-chat.png",
  Groq: "/providers/groq-chat.png",
};
