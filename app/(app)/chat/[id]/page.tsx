import { MODELS } from "@/utils/constants";
import { getChat } from "../__shared/actions/get-chat";
import { ChatHeader } from "./__shared/chat-header";
import { ChatConversation } from "./__shared/chat-conversation";
import { ChatDetailsProvider } from "./__shared/chat-details/chat-details-context";
import { ChatDetails } from "./__shared/chat-details/chat-details";

interface ChatIdPageProps {
  params: {
    id: number;
  };
}

export default async function ChatIdPage({ params }: ChatIdPageProps) {
  const chat = await getChat({
    chatId: params.id,
  });

  const supportsFileUpload = MODELS[chat.model].supportsFileUpload!;
  return (
    <ChatDetailsProvider>
      <div className="@container relative isolate flex h-full w-full min-w-[340px] flex-col overflow-hidden">
        <ChatHeader conversation={chat} />
        <ChatConversation
          supportsFileUpload={supportsFileUpload}
          initialMessages={chat.messages}
          model={chat.model}
        />
      </div>
      <ChatDetails conversation={chat} />
    </ChatDetailsProvider>
  );
}
