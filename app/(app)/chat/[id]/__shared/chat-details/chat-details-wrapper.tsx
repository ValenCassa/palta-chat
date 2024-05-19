"use client";

import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { AnimatePresence, motion } from "framer-motion";
import { useChatDetails } from "./chat-details-context";

interface ChatDetailsWrapperProps {
  children: React.ReactNode;
}

export const ChatDetailsWrapper = ({ children }: ChatDetailsWrapperProps) => {
  const { isOpen, setIsOpen } = useChatDetails();

  return (
    <RadixCollapsible.Root open={isOpen} onOpenChange={setIsOpen}>
      <AnimatePresence>
        {isOpen ? (
          <RadixCollapsible.Content forceMount asChild>
            <motion.nav
              variants={{
                open: { x: 0, width: 320 },
                closed: { x: 320, width: 0 },
              }}
              initial={"closed"}
              animate={"open"}
              exit={"closed"}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="mr-3 flex h-full w-[320px] flex-col overflow-hidden border-l border-primary bg-surface-tertiary"
            >
              {children}
            </motion.nav>
          </RadixCollapsible.Content>
        ) : null}
      </AnimatePresence>
    </RadixCollapsible.Root>
  );
};
