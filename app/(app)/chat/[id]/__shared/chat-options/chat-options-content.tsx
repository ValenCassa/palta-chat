"use client";

import { Dropdown } from "@/components";
import { Conversation } from "@/server/db/schema/conversations";
import { deleteChat } from "@/utils/actions/delete-chat";
import { duplicateChat } from "@/utils/actions/duplicate-chat";
import { cn } from "@/utils/cn";
import { CheckIcon } from "@heroicons/react/16/solid";
import { DocumentDuplicateIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSWRConfig } from "swr";
import { useToggle } from "usehooks-ts";

interface ChatOptionsContentProps {
  conversation: Conversation;
}

export const ChatOptionsContent = ({
  conversation,
}: ChatOptionsContentProps) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isDeleteConfirm, toggleDeleteConfirm] = useToggle();

  return (
    <>
      <Dropdown.Group>
        <Dropdown.Item
          onClick={async () => {
            // Duplicate the chat
            //@ts-ignore
            mutate("/api/chat/list", async (prev: Conversation[]) => {
              const newChat = await duplicateChat(conversation.id);
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
                  deleteChat({ chatId: conversation.id });
                  return prev.filter((c) => c.id !== conversation.id);
                },
                {
                  optimisticData: (prev: Conversation[]) => {
                    return prev.filter((c) => c.id !== conversation.id);
                  },
                  revalidate: false,
                },
              );

              toast.success("Chat deleted successfully");
              deleteChat({ chatId: conversation.id });

              router.push("/chat/new");
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
