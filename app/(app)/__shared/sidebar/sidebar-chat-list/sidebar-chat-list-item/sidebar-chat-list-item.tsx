"use client";

import { Dropdown, IconButton } from "@/components";
import { Conversation } from "@/server/db/schema/conversations";
import { cn } from "@/utils/cn";
import { MODELS, PROVIDER_ICON } from "@/utils/constants";
import {
  ArrowTopRightOnSquareIcon,
  EllipsisHorizontalIcon,
} from "@heroicons/react/16/solid";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ShareDialog } from "../../../share-dialog/share-dialog";
import { useToggle } from "usehooks-ts";
import { motion } from "framer-motion";
import { SidebarChatListItemContent } from "./sidebar-chat-list-item-content";

interface SidebarChatListProps {
  chat: Conversation;
}

export const SidebarChatListItem = ({ chat }: SidebarChatListProps) => {
  const [isShareDialogOpen, toggleShareDialog] = useToggle();
  const params = useParams();

  const modelProvider = MODELS[chat.model].provider;
  const modelIcon = PROVIDER_ICON[modelProvider];
  const isActive = params?.id === String(chat.id);

  return (
    <motion.div
      animate={{
        opacity: 1,
      }}
      initial={{
        opacity: 0,
      }}
      exit={{
        opacity: 0,
      }}
      layout
      className="group relative"
    >
      <ShareDialog
        open={isShareDialogOpen}
        onOpenChange={() => {
          toggleShareDialog();
        }}
        conversation={{ id: chat.id, isPublic: chat.public }}
      />
      <Link
        className="hover:bg-interactive-hover-secondary focus:bg-interactive-hover-secondary relative flex h-[70px] flex-col justify-center gap-2 overflow-hidden border-b border-primary px-4 outline-none transition-colors"
        href={"/chat/" + chat.id}
      >
        <span
          data-active={isActive || undefined}
          className="absolute left-0 top-0 h-full w-1 bg-[theme(borderColor.accent)] opacity-0 transition-opacity data-[active]:opacity-100"
        />
        <p className="truncate text-sm font-medium">{chat.name}</p>
        <div className="flex items-center gap-1.5 opacity-40">
          <img alt="Provider icon" src={modelIcon} width={14} height={14} />
          <p className="text-xs font-medium">{chat.model}</p>
        </div>
      </Link>
      <div className="absolute bottom-3 right-3 flex gap-2">
        <Dropdown.Root>
          <Dropdown.Trigger asChild>
            <IconButton
              size="xs"
              className="opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100 data-[state=open]:opacity-100"
            >
              <EllipsisHorizontalIcon />
            </IconButton>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <SidebarChatListItemContent
              chat={chat}
              toggleShareDialog={toggleShareDialog}
            />
          </Dropdown.Content>
        </Dropdown.Root>

        <IconButton
          size="xs"
          onClick={() => {
            toggleShareDialog();
          }}
          className={cn(
            "opacity-0 transition-all group-focus-within:opacity-100 group-hover:opacity-100",
            {
              "!text-accent-primary opacity-100": chat.public,
            },
          )}
        >
          <ArrowTopRightOnSquareIcon />
        </IconButton>
      </div>
    </motion.div>
  );
};
