"use client";

import { Dropdown, IconButton } from "@/components";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import { ChatOptionsContent } from "./chat-options/chat-options-content";
import { Conversation } from "@/server/db/schema/conversations";

interface ChatOptionsProps {
  conversation: Conversation;
}

export const ChatOptions = ({ conversation }: ChatOptionsProps) => {
  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <IconButton>
          <EllipsisHorizontalIcon />
        </IconButton>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <ChatOptionsContent conversation={conversation} />
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
