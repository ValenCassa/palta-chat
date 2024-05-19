"use client";

import { AnimatePresence, Button, Switch } from "@/components";
import { EyeIcon, LinkIcon, LockClosedIcon } from "@heroicons/react/16/solid";
import { ShareDialogProps } from "./share-dialog";
import { startTransition, useOptimistic } from "react";
import { shareConversation } from "./share-conversation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useSWRConfig } from "swr";
import { Conversation } from "@/server/db/schema/conversations";
import { toast } from "sonner";

export const ShareDialogContent = ({
  conversation,
}: Omit<ShareDialogProps, "children">) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const [isPublic, setIsPublic] = useOptimistic(conversation.isPublic);

  const publicLink = window.location.origin + "/public/" + conversation.id;
  return (
    <div>
      <div className="px-4 pb-4">
        <div className="flex items-center justify-between gap-2">
          <label
            htmlFor="public"
            className="text-sm font-medium text-secondary"
          >
            Enable public link
          </label>
          <Switch
            checked={isPublic}
            onCheckedChange={async (checked) => {
              startTransition(() => {
                //@ts-ignore
                mutate(
                  "/api/chat/list",
                  (prev: Conversation[]) => {
                    return prev.map((c) => {
                      if (c.id === conversation.id) {
                        return {
                          ...c,
                          public: checked,
                        };
                      }
                      return c;
                    });
                  },
                  {
                    revalidate: false,
                  },
                );
                setIsPublic(checked);
                shareConversation({
                  conversationId: conversation.id,
                  isPublic: checked,
                });

                router.refresh();
              });
            }}
            id="public"
          />
        </div>
        <AnimatePresence initial={false}>
          {isPublic ? (
            <motion.div
              className="flex items-end gap-2"
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: 42,
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              transition={{
                duration: 0.1,
                ease: "easeInOut",
              }}
            >
              <Button.Root
                onClick={() => {
                  toast.success("Public link copied to clipboard");
                  window.navigator.clipboard.writeText(publicLink);
                }}
                className="w-full"
                variant="accent"
              >
                <LinkIcon />
                <Button.Text>Copy public link</Button.Text>
              </Button.Root>
              <Button.Root
                onClick={() => {
                  window.open(publicLink, "_blank");
                }}
                className="w-full"
                variant="secondary"
              >
                <EyeIcon />
                <Button.Text>View</Button.Text>
              </Button.Root>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
      <div className="flex items-center justify-center gap-3 border-t border-secondary bg-surface-secondary p-4">
        <p className="text-sm font-medium text-secondary">For you only</p>
        <Button.Root
          onClick={() => {
            toast.success("Private link copied to clipboard");
            window.navigator.clipboard.writeText(
              window.location.origin + "/chat/" + conversation.id,
            );
          }}
          rounded
          variant="secondary"
        >
          <LockClosedIcon />
          <Button.Text>Copy private link</Button.Text>
        </Button.Root>
      </div>
    </div>
  );
};
