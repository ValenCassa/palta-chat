"use client";

import { AnimatePresence, SimpleMotionContainer } from "@/components";
import { SidebarChatListItem } from "./sidebar-chat-list-item/sidebar-chat-list-item";
import { useChatList } from "./sidebar-chat-list-item/use-chat-list";

export const SidebarChatList = () => {
  const { data: chats = [] } = useChatList();

  return (
    <AnimatePresence>
      <SimpleMotionContainer className="overflow-auto">
        {chats.map((chat) => {
          return <SidebarChatListItem key={chat.id} chat={chat} />;
        })}
      </SimpleMotionContainer>
    </AnimatePresence>
  );
};
