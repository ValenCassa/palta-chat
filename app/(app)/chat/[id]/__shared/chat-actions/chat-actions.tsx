import { Button, Dialog } from "@/components";
import { ChatDetailsTrigger } from "./chat-details/chat-details-trigger";
import { ShareDialog } from "@/app/(app)/__shared/share-dialog/share-dialog";
import { Conversation } from "@/server/db/schema/conversations";

interface ChatActionsProps {
  conversation: Conversation;
}

export const ChatActions = ({ conversation }: ChatActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      <ShareDialog
        conversation={{
          id: conversation.id,
          isPublic: conversation.public,
        }}
      >
        <Dialog.Trigger>
          <Button.Root>
            <Button.Text>Share</Button.Text>
          </Button.Root>
        </Dialog.Trigger>
      </ShareDialog>
      <ChatDetailsTrigger />
    </div>
  );
};
