"use client";

import { AnimatePresence, Avatar } from "@/components";
import { Conversation } from "@/server/db/schema/conversations";
import { cn } from "@/utils/cn";
import { MODELS, PROVIDER_CHAT_ICON } from "@/utils/constants";
import { motion } from "framer-motion";
import Markdown from "react-markdown";

interface ConversationMessagesProps {
  conversation: Conversation;
  userThumbnail: string | null;
}

export const ConversationMessages = ({
  conversation: { messages, model },
  userThumbnail,
}: ConversationMessagesProps) => {
  const modelData = MODELS[model];
  const modelProvider = modelData.provider;
  const providerIcon = PROVIDER_CHAT_ICON[modelProvider];

  return (
    <AnimatePresence mode="wait">
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
              src={isAssistant ? providerIcon : userThumbnail || ""}
              className={
                "absolute left-0 top-0 -translate-x-12 opacity-0 transition-opacity min-[934px]:opacity-100"
              }
            />
            <Markdown data-markdown>{message.content}</Markdown>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};
