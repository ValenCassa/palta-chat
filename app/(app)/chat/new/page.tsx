"use client";

import { AnimatePresence, Avatar, ChatInput } from "@/components";
import { useDefaultModel } from "@/hooks/use-default-model";
import { MODELS, PROVIDER_CHAT_ICON } from "@/utils/constants";
import NewChatHeader from "./__shared/new-chat-header";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import Markdown from "react-markdown";
import { cn } from "@/utils/cn";
import { useUser } from "@clerk/nextjs";
import { useSWRConfig } from "swr";
import { Conversation, Message } from "@/server/db/schema/conversations";
import { ChatConversationContainer } from "../__shared/chat-conversation-container";
import { toast } from "sonner";

export default function NewPage() {
  const { mutate } = useSWRConfig();
  const [defaultModel] = useDefaultModel();
  const router = useRouter();
  const { user } = useUser();
  const avatar = user?.imageUrl;
  const [isLoadingFirst, setIsLoadingFirst] = useState(false);
  let toastRef = useRef<string | number>(null).current;

  const { messages, input, setInput, append, data, isLoading } = useChat({
    api: "/api/chat/new",
    onResponse: () => {
      setIsLoadingFirst(false);
    },
    body: {
      model: defaultModel,
    },
  });

  const typedData = data as [{ conversation: Conversation }] | undefined;

  useEffect(() => {
    if (typedData?.length) {
      (async () => {
        //@ts-ignore
        mutate("/api/chat/list", (prev: Conversation[]) => {
          return [
            {
              id: typedData[0].conversation.id,
              name: typedData[0].conversation.name,
              model: typedData[0].conversation.model,
              public: typedData[0].conversation.public,
            },
            ...prev,
          ];
        });

        toast.dismiss(toastRef!);
        toast.success("Chat created successfully");

        router.push(`/chat/${typedData[0].conversation.id}`);
        router.refresh();
      })();
    }
  }, [data?.length]);

  const modelData = MODELS[defaultModel];
  const modelProvider = modelData.provider;
  const providerIcon = PROVIDER_CHAT_ICON[modelProvider];
  const supportsFileUpload = modelData.supportsFileUpload;

  return (
    <div className="@container relative isolate flex h-full w-full min-w-[340px] flex-col overflow-hidden">
      <NewChatHeader />
      <ChatConversationContainer messages={messages as Message[]}>
        <AnimatePresence mode="wait">
          {messages.length ? (
            <>
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
            </>
          ) : (
            <div className="relative grid h-full w-full place-content-center">
              <p className="-mt-[44px] text-sm font-medium text-secondary">
                Type your first message
              </p>
            </div>
          )}
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
        isSending={isLoading || !!messages.length}
        onSend={(message) => {
          setInput("");
          setIsLoadingFirst(true);
          toastRef = toast.loading("Creating chat...");
          append({
            role: "user",
            content: message,
          });
        }}
      />
    </div>
  );
}
