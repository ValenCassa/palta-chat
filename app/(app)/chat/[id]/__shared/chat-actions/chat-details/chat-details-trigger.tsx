"use client";

import { IconButton } from "@/components";
import { useChatDetails } from "../../chat-details/chat-details-context";
import { InformationCircleIcon } from "@heroicons/react/16/solid";

export const ChatDetailsTrigger = () => {
  const { isOpen, setIsOpen } = useChatDetails();
  return (
    <IconButton
      data-state={isOpen ? "open" : "closed"}
      className="data-[state=open]:bg-accent-secondary data-[state=open]:text-accent-primary"
      onClick={() => setIsOpen(!isOpen)}
    >
      <InformationCircleIcon />
    </IconButton>
  );
};
