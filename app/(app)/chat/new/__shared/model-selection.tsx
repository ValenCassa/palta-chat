"use client";

import { ModelSelectionContent, Select } from "@/components";
import { useDefaultModel } from "@/hooks/use-default-model";
import { Models } from "@/server/db/schema/conversations";
import { MODELS, PROVIDER_ICON } from "@/utils/constants";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const ModelSelection = () => {
  const [activeId, setActiveId] = useState<Models[number] | null>(null);
  const [defaultModel, setDefaultModel] = useDefaultModel();
  const pathname = usePathname();
  const isNew = pathname === "/chat/new";

  const modelInfo = MODELS[defaultModel || ""];
  const modelProviderIcon = PROVIDER_ICON[modelInfo.provider];

  return (
    <Select.Root
      activeId={activeId}
      onActiveIdChange={(id) => setActiveId(id as Models[number] | null)}
      value={defaultModel}
      onValueChange={(selectedModel) => {
        setActiveId(null);
        setDefaultModel(selectedModel as typeof defaultModel);
      }}
    >
      <Select.Trigger disabled={!isNew}>
        <div className="flex items-center gap-1.5">
          <img
            alt={modelInfo.provider}
            src={modelProviderIcon}
            className="size-3.5"
          />
          <span>{defaultModel}</span>
        </div>
      </Select.Trigger>
      <ModelSelectionContent activeModel={activeId} />
    </Select.Root>
  );
};
