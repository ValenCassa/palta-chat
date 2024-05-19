import { IconButton } from "@/components";
import { PlusIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { SidebarNewChatSelect } from "./sidebar-new-chat-select";
import Link from "next/link";

export const SidebarNewChat = () => {
  return (
    <div className="relative">
      <Link
        href="/chat/new"
        className="hover:bg-interactive-hover-secondary focus-visible:bg-interactive-hover-secondary flex h-[46px] w-full items-center justify-between border-b border-primary pl-3 pr-2.5 text-secondary outline-none transition-colors hover:text-interactive-hover"
      >
        <div className="flex items-center gap-2 text-sm">
          <PlusIcon className="h-5 w-5" />
          <span className="font-medium">New Chat</span>
        </div>
      </Link>
      <SidebarNewChatSelect>
        <IconButton
          size="sm"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-weak"
        >
          <ChevronUpDownIcon className="!size-4" />
        </IconButton>
      </SidebarNewChatSelect>
    </div>
  );
};
