"use client";

import { Message } from "@/server/db/schema/conversations";
import { useEffect, useRef } from "react";

interface ChatConversationContainerProps {
  messages: Message[];
  children: React.ReactNode;
}

export const ChatConversationContainer = ({
  messages,
  children,
}: ChatConversationContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    containerRef.current?.scrollTo({
      top: containerRef.current.scrollHeight,
      behavior: "smooth",
    });

    // last message length changed
  }, [messages[messages.length - 1]?.content.length]);

  return (
    <div
      ref={containerRef}
      className="flex min-h-screen w-full flex-col overflow-auto px-3"
      data-conversation-container
    >
      <div className="relative mx-auto table h-full w-full max-w-[840px] pb-[200px]">
        <div className="flex h-full flex-col gap-4 pt-[calc(44px+theme(spacing.8))]">
          {children}
        </div>
      </div>
    </div>
  );
};
