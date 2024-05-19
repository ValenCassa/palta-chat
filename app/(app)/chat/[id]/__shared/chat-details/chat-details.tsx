import { getChat } from "../../../__shared/actions/get-chat";
import { ChatDetailsWrapper } from "./chat-details-wrapper";
import * as ChatDetailsSection from "./chat-details-section";
import { formatRelative } from "date-fns";
import { MODELS } from "@/utils/constants";
import { formatCurrency } from "@/utils/format-currency";

interface ChatDetailsProps {
  conversation: Awaited<ReturnType<typeof getChat>>;
}

const upperCaseFirst = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const ChatDetails = ({ conversation }: ChatDetailsProps) => {
  // uppercase first letter
  const createdAtValue = upperCaseFirst(
    formatRelative(new Date(conversation.createdAt), new Date()),
  );
  const updatedAtValue = upperCaseFirst(
    formatRelative(new Date(conversation.updatedAt), new Date()),
  );

  const modelInfo = MODELS[conversation.model];
  const totalCost =
    (conversation.usage.input / 1000000) * modelInfo.pricing.input +
    (conversation.usage.output / 1000000) * modelInfo.pricing.output;
  return (
    <ChatDetailsWrapper>
      <div className="flex h-[44px] items-center px-3">
        <p className="text-[14.5px] font-medium leading-none text-secondary">
          {conversation.name}
        </p>
      </div>
      <ChatDetailsSection.Root className="border-y">
        <ChatDetailsSection.Item>
          <ChatDetailsSection.Label>Created</ChatDetailsSection.Label>
          <ChatDetailsSection.Value>{createdAtValue}</ChatDetailsSection.Value>
        </ChatDetailsSection.Item>
        <ChatDetailsSection.Item>
          <ChatDetailsSection.Label>Updated</ChatDetailsSection.Label>
          <ChatDetailsSection.Value>{updatedAtValue}</ChatDetailsSection.Value>
        </ChatDetailsSection.Item>
      </ChatDetailsSection.Root>

      <ChatDetailsSection.Root>
        <ChatDetailsSection.Item>
          <ChatDetailsSection.Label>Model</ChatDetailsSection.Label>
          <ChatDetailsSection.Value className="font-medium">
            {conversation.model}
          </ChatDetailsSection.Value>
        </ChatDetailsSection.Item>
        <ChatDetailsSection.Item>
          <ChatDetailsSection.Label>Context</ChatDetailsSection.Label>
          <ChatDetailsSection.Value>
            {Intl.NumberFormat("en-US").format(modelInfo.context)}
          </ChatDetailsSection.Value>
        </ChatDetailsSection.Item>
        <ChatDetailsSection.Item>
          <ChatDetailsSection.Label>Input pricing</ChatDetailsSection.Label>
          <ChatDetailsSection.Value>
            {formatCurrency(modelInfo.pricing.input)} / million tokens
          </ChatDetailsSection.Value>
        </ChatDetailsSection.Item>
        <ChatDetailsSection.Item>
          <ChatDetailsSection.Label>Output pricing</ChatDetailsSection.Label>
          <ChatDetailsSection.Value>
            {formatCurrency(modelInfo.pricing.output)} / million tokens
          </ChatDetailsSection.Value>
        </ChatDetailsSection.Item>
      </ChatDetailsSection.Root>

      <ChatDetailsSection.Root>
        <ChatDetailsSection.Item>
          <ChatDetailsSection.Label>Tokens used</ChatDetailsSection.Label>
          <ChatDetailsSection.Value>
            {conversation.usage.input + conversation.usage.output}
          </ChatDetailsSection.Value>
        </ChatDetailsSection.Item>
        <ChatDetailsSection.Item>
          <ChatDetailsSection.Label>Total cost</ChatDetailsSection.Label>
          <ChatDetailsSection.Value>
            {" "}
            {formatCurrency(totalCost, 4)}
          </ChatDetailsSection.Value>
        </ChatDetailsSection.Item>
      </ChatDetailsSection.Root>
    </ChatDetailsWrapper>
  );
};
