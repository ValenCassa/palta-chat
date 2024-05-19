import { cn } from "@/utils/cn";
import { ChatActions } from "./chat-actions/chat-actions";
import { ChatOptions } from "./chat-options";
import { Conversation } from "@/server/db/schema/conversations";
import { MODELS, PROVIDER_ICON } from "@/utils/constants";

interface ChatHeaderProps {
  conversation: Conversation;
}

export const ChatHeader = ({ conversation }: ChatHeaderProps) => {
  const { model, name } = conversation;
  const modelInfo = MODELS[model];
  const modelProviderIcon = PROVIDER_ICON[modelInfo.provider];
  return (
    <div className="fixed left-0 z-10 flex h-[44px] w-full items-center justify-between bg-white/90 px-3 backdrop-blur-md transition-all sm:group-data-[sidebar-closed]/main:pl-11">
      <div className="flex gap-2">
        <div
          className={cn(
            "shadow-button-secondary text-xsPlus flex h-7 items-center gap-1.5 rounded-md bg-button-secondary px-1.5 font-medium",
          )}
        >
          <img
            alt={modelInfo.provider}
            src={modelProviderIcon}
            width={14}
            height={14}
          />

          {model}
        </div>
        <ChatOptions conversation={conversation} />
        <p
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold",
          )}
        >
          {name}
        </p>
      </div>

      <ChatActions conversation={conversation} />
    </div>
  );
};
