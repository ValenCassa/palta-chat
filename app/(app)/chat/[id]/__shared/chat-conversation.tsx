"use client";
import { AnimatePresence, Avatar, ChatInput } from "@/components";
import { motion } from "framer-motion";

import { Message, models } from "@/server/db/schema/conversations";
import { cn } from "@/utils/cn";
import { MODELS, PROVIDER_CHAT_ICON } from "@/utils/constants";
import { useChat } from "ai/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import Markdown from "react-markdown";
import { usePreviousPathname } from "@/hooks/use-previous-pathname";
import { useUser } from "@clerk/nextjs";
import { ChatConversationContainer } from "../../__shared/chat-conversation-container";

interface ChatConversationProps {
  supportsFileUpload: boolean;
  initialMessages: Message[];
  model: (typeof models)[number];
}

export const ChatConversation = ({
  supportsFileUpload,
  initialMessages,
  model,
}: ChatConversationProps) => {
  const previousPathname = usePreviousPathname();
  const router = useRouter();

  const { user } = useUser();
  const avatar = user?.imageUrl;

  const params = useParams();
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  const { messages, input, setInput, append } = useChat({
    id: params.id as string,
    api: `/api/chat/${params.id}`,
    //@ts-ignore
    initialMessages,
    onFinish: () => {
      router.refresh();
    },
    onResponse: () => {
      setIsLoadingFirst(false);
    },
  });

  const modelData = MODELS[model];
  const modelProvider = modelData.provider;
  const providerIcon = PROVIDER_CHAT_ICON[modelProvider];

  return (
    <>
      <ChatConversationContainer messages={messages as Message[]}>
        <AnimatePresence
          initial={!previousPathname.includes("new")}
          mode="wait"
        >
          {messages.map((message, idx) => {
            const isAssistant = message.role === "assistant";

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn("relative w-full rounded px-3 py-3 text-sm", {
                  "bg-surface-secondary": isAssistant,
                  "border border-primary": !isAssistant,
                })}
                key={idx}
              >
                <Avatar
                  alt={isAssistant ? "Assistant" : "You"}
                  src={isAssistant ? providerIcon : avatar}
                  className={
                    "@[934px]:opacity-100 absolute left-0 top-0 -translate-x-12 opacity-0 transition-opacity"
                  }
                />
                <Markdown data-markdown>{message.content}</Markdown>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <AnimatePresence>
          {isLoadingFirst ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={
                "relative w-full rounded bg-surface-secondary px-3 py-3 text-sm"
              }
              key={"loading"}
            >
              <Avatar
                alt={"Assistant"}
                src={providerIcon}
                className={
                  "@[934px]:opacity-100 absolute left-0 top-0 -translate-x-12 opacity-0 transition-opacity"
                }
              />
              <p>Thinking...</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </ChatConversationContainer>

      <ChatInput
        value={input}
        onChange={setInput}
        supportsFileUpload={supportsFileUpload}
        onSend={(message) => {
          setInput("");
          setIsLoadingFirst(true);
          append({
            role: "user",
            content: message,
          });
        }}
      />
    </>
  );
};
