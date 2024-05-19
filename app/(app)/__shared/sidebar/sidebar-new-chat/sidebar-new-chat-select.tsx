"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { ModelSelectionContent, Select } from "@/components";
import { useState } from "react";
import { useDefaultModel } from "@/hooks/use-default-model";
import { Models } from "@/server/db/schema/conversations";
import { useRouter } from "next/navigation";

interface SidebarNewChatSelectProps {
  children: React.ReactNode;
}

export const SidebarNewChatSelect = ({
  children,
}: SidebarNewChatSelectProps) => {
  const router = useRouter();
  const [activeId, setActiveId] = useState<Models[number] | null>(null);
  const [_, setDefaultModel] = useDefaultModel();
  return (
    <Select.Root
      activeId={activeId}
      onActiveIdChange={(id) => setActiveId(id as Models[number] | null)}
      onValueChange={(selectedModel) => {
        setActiveId(null);
        setDefaultModel(selectedModel as Models[number]);
        router.push("/chat/new");
      }}
    >
      <RadixSelect.Trigger asChild>{children}</RadixSelect.Trigger>
      <ModelSelectionContent activeModel={activeId} />
    </Select.Root>
  );
};
