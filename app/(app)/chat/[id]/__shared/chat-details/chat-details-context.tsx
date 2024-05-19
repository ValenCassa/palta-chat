"use client";

import { createContext, useContext, useState } from "react";

interface ChatDetailsContextStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const ChatDetailsContext = createContext<ChatDetailsContextStore | null>(
  null,
);

interface ChatDetailsProviderProps {
  children: React.ReactNode;
}
export const ChatDetailsProvider = ({ children }: ChatDetailsProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ChatDetailsContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ChatDetailsContext.Provider>
  );
};

export const useChatDetails = () => {
  const context = useContext(ChatDetailsContext);
  if (!context) {
    throw new Error("useChatDetails must be used within a ChatDetailsProvider");
  }
  return context;
};
