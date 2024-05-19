"use client";

import { Dropdown } from "@/components";
import { Conversation } from "@/server/db/schema/conversations";
import { deleteChat } from "@/utils/actions/delete-chat";
import { duplicateChat } from "@/utils/actions/duplicate-chat";
import { cn } from "@/utils/cn";
import {
  ArrowTopRightOnSquareIcon,
  CheckIcon,
} from "@heroicons/react/16/solid";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { useToggle } from "usehooks-ts";

interface SidebarChatListItemContentProps {
  chat: Conversation;
  toggleShareDialog: () => void;
}

export const SidebarChatListItemContent = ({
  chat,
  toggleShareDialog,
}: SidebarChatListItemContentProps) => {
  const { mutate } = useSWRConfig();
  const params = useParams();
  const router = useRouter();
  const [isDeleteConfirm, toggleDeleteConfirm] = useToggle();
  return (
    <>
      <Dropdown.Group>
        <Dropdown.Item
          onClick={async () => {
            //@ts-ignore
            mutate("/api/chat/list", async (prev: Conversation[]) => {
              let toastId = toast.loading("Duplicating chat...");
              const newChat = await duplicateChat(chat.id);

              toast.dismiss(toastId);
              toast.success("Chat duplicated successfully");
              return [newChat, ...prev];
            });
          }}
          className="gap-1.5"
        >
          <DocumentDuplicateIcon className="size-3.5" />
          <span>Duplicate</span>
        </Dropdown.Item>

        <Dropdown.Item
          onClick={() => {
            toggleShareDialog();
          }}
          className={"gap-1.5"}
        >
          <ArrowTopRightOnSquareIcon className="size-3.5" />
          <span>Share</span>
        </Dropdown.Item>
      </Dropdown.Group>
      <Dropdown.Separator />
      <Dropdown.Group>
        <Dropdown.Item
          onClick={(e) => {
            if (!isDeleteConfirm) {
              e.preventDefault();
              toggleDeleteConfirm();
            }

            if (isDeleteConfirm) {
              //@ts-ignore
              mutate(
                "/api/chat/list",
                (prev: Conversation[]) => {
                  deleteChat({ chatId: chat.id });
                  return prev.filter((c) => c.id !== chat.id);
                },
                {
                  optimisticData: (prev: Conversation[]) => {
                    return prev.filter((c) => c.id !== chat.id);
                  },
                  revalidate: false,
                },
              );

              toast.success("Chat deleted successfully");

              if (params?.id === String(chat.id)) {
                router.push("/chat/new");
              }
            }
          }}
          className={cn("gap-1.5", {
            "text-danger-primary hover:text-danger-primary hover:bg-red-50":
              isDeleteConfirm,
          })}
        >
          {isDeleteConfirm ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <TrashIcon className="size-3.5" />
          )}

          <span>{isDeleteConfirm ? "Confirm" : "Delete"}</span>
        </Dropdown.Item>
      </Dropdown.Group>
    </>
  );
};
