"use client";

import { Models } from "@/server/db/schema/conversations";
import { useAtom } from "jotai";
import { atomWithStorage, createJSONStorage } from "jotai/utils";

const storage = createJSONStorage<Models[number]>(() =>
  process.browser ? window.localStorage : (null as unknown as Storage),
);
const modelAtom = atomWithStorage<Models[number]>(
  "default-model",
  "gpt-4o",
  storage,
);

export const useDefaultModel = () => {
  const [defaultModel, setDefaultModel] = useAtom(modelAtom);

  return [defaultModel, setDefaultModel] as const;
};
