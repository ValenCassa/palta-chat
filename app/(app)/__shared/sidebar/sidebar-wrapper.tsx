"use client";

import { SidebarHeader } from "./sidebar-header/sidebar-header";
import { SidebarNewChat } from "./sidebar-new-chat/sidebar-new-chat";
import { AnimatePresence, IconButton } from "@/components";

import * as RadixCollapsible from "@radix-ui/react-collapsible";
import { motion } from "framer-motion";
import { useState } from "react";
import { setCookie } from "cookies-next";
import { flushSync } from "react-dom";

interface SidebarProps {
  isOpen: boolean;
  children: React.ReactNode;
}

const MotionIconButton = motion(IconButton);

export const SidebarWrapper = ({ isOpen, children }: SidebarProps) => {
  const [open, setOpen] = useState(isOpen);
  return (
    <RadixCollapsible.Root
      open={open}
      onOpenChange={(open) => {
        const mainElement = document.querySelector("main");
        const newState = open ? "open" : "closed";

        if (!mainElement) return;

        if (newState === "closed") {
          flushSync(() => {
            mainElement.dataset.sidebarClosed = "";
          });
        }

        if (newState === "open") {
          flushSync(() => {
            delete mainElement.dataset.sidebarClosed;
          });
        }

        setOpen(open);
        setCookie("sidebar-state", newState);
      }}
      className="relative"
    >
      <RadixCollapsible.Trigger asChild>
        <MotionIconButton
          initial={false}
          animate={{ x: open ? 225 : 10 }}
          transition={{ duration: 0.03, ease: "easeInOut" }}
          className="group absolute z-10 mt-2.5 hover:!bg-interactive-hover data-[state=open]:bg-[unset]"
          size="sm"
        >
          <svg
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-transform group-data-[state=closed]:rotate-180"
          >
            <path
              d="M13.875 2.625H4.125C2.88236 2.625 1.875 3.63236 1.875 4.875V13.125C1.875 14.3676 2.88236 15.375 4.125 15.375H13.875C15.1176 15.375 16.125 14.3676 16.125 13.125V4.875C16.125 3.63236 15.1176 2.625 13.875 2.625Z"
              stroke="currentColor"
              strokeWidth="1.275"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M7.875 3V15"
              stroke="currentColor"
              strokeWidth="1.275"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.625 5.25H4.125"
              stroke="currentColor"
              strokeWidth="1.275"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.625 7.5H4.125"
              stroke="currentColor"
              strokeWidth="1.275"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5.625 9.75H4.125"
              stroke="currentColor"
              strokeWidth="1.275"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </MotionIconButton>
      </RadixCollapsible.Trigger>

      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <RadixCollapsible.Content forceMount asChild>
            <motion.nav
              variants={{
                open: { x: 0, width: 260 },
                closed: { x: -260, width: 0 },
              }}
              initial={"closed"}
              animate={"open"}
              exit={"closed"}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="flex h-full w-[260px] flex-col overflow-hidden border-r border-primary bg-surface-tertiary"
            >
              <SidebarHeader />
              <div className="w-full border-b border-primary">
                <p className="text-xsPlus inline-grid h-8 w-full place-content-center border-b-2 border-secondary px-2 text-center font-medium leading-6">
                  Chats
                </p>
              </div>
              <SidebarNewChat />
              {children}
            </motion.nav>
          </RadixCollapsible.Content>
        ) : null}
      </AnimatePresence>
    </RadixCollapsible.Root>
  );
};
