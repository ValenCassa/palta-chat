import { db } from "@/server/db/client";
import { conversations } from "@/server/db/schema/conversations";
import { users } from "@/server/db/schema/users";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ConversationMessages } from "./__shared/conversation-messages";

interface PublicChatRouteProps {
  params: {
    id: number;
  };
}

export default async function PublicChatRoute({
  params,
}: PublicChatRouteProps) {
  const data = await db
    .select()
    .from(conversations)
    .where(eq(conversations.id, params.id))
    .innerJoin(users, eq(conversations.userId, users.id));
  const chat = data[0];

  if (!chat) {
    return notFound();
  }

  const { conversations: conversation, users: user } = chat;

  return (
    <div>
      <div className="relative w-full border-b border-primary bg-surface-secondary p-2">
        <a
          href="https://palta.chat"
          className="shadow-button-secondary inline-flex h-8 items-center gap-1 rounded-md bg-button-secondary px-2 text-sm font-medium text-button-secondary transition-colors hover:bg-button-secondary-hover"
        >
          <span className="hidden sm:block">Chat shared through </span>
          <span className="flex items-center">
            <svg
              width="21"
              height="24"
              viewBox="0 0 21 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_206_1760)">
                <mask
                  id="mask0_206_1760"
                  style={{
                    maskType: "luminance",
                  }}
                  maskUnits="userSpaceOnUse"
                  x="2"
                  y="0"
                  width="16"
                  height="21"
                >
                  <path
                    d="M17.4544 0.263916H2.91992V20.8884H17.4544V0.263916Z"
                    fill="white"
                  />
                </mask>
                <g mask="url(#mask0_206_1760)">
                  <path
                    d="M10.5664 2.23067L10.5568 2.69322C10.55 3.01347 10.8439 3.25752 11.1604 3.19452L12.9042 2.84736C13.0223 2.82385 13.128 2.75919 13.2023 2.66508L13.6435 2.10574C13.8153 1.888 13.7766 1.57329 13.5572 1.40283L13.0922 1.04151C12.9417 0.924602 12.7376 0.902097 12.5649 0.983383L10.8546 1.78865C10.682 1.86993 10.5704 2.04105 10.5664 2.23067Z"
                    fill="#2FC217"
                  />
                  <path
                    d="M10.4254 3.78092L10.2025 2.45331C10.0843 1.74986 9.52887 1.19862 8.82009 1.08137L7.48242 0.860107"
                    stroke="#5D2E02"
                    stroke-width="1.00901"
                  />
                  <path
                    d="M7.9043 11.8877C7.9043 13.2675 8.25464 14.5908 8.87827 15.5666C9.5019 16.5423 10.3477 17.0904 11.2297 17.0904C12.1116 17.0904 12.9575 16.5423 13.581 15.5666C14.2046 14.5908 14.5551 13.2675 14.5551 11.8877H11.2297H7.9043Z"
                    fill="black"
                  />
                  <path
                    d="M16.0854 13.6163C16.0854 18.4557 13.9088 20.7097 10.9804 20.6501C7.89422 20.5873 4.59309 18.3747 3.38443 14.8558C2.60199 12.5777 3.65174 10.1822 4.91068 8.12516C6.60012 5.36468 7.86502 3.43583 10.8603 3.12524C15.1061 3.12524 16.0854 8.77697 16.0854 13.6163Z"
                    fill="#FF3838"
                  />
                  <path
                    d="M14.5841 11.8878C14.5841 11.1447 14.2298 10.4322 13.599 9.90675C12.9683 9.38135 12.1128 9.08618 11.2208 9.08618C10.3288 9.08618 9.47329 9.38135 8.84253 9.90675C8.21178 10.4322 7.85742 11.1447 7.85742 11.8878H11.2208H14.5841Z"
                    fill="#DC4FFF"
                  />
                  <path
                    d="M7.85742 11.8877C7.85742 13.2631 8.21178 14.5821 8.84253 15.5547C9.47329 16.5273 10.3288 17.0736 11.2208 17.0736C12.1128 17.0736 12.9683 16.5273 13.599 15.5547C14.2298 14.5821 14.5841 13.2631 14.5841 11.8877H11.2208H7.85742Z"
                    fill="black"
                  />
                  <path
                    d="M16.8464 10.6145C17.2255 11.46 17.476 12.3729 17.3702 13.2923C16.8912 17.4639 14.3128 20.6501 11.2039 20.6501C8.07146 20.6501 5.47755 17.4154 5.02697 13.1972C4.93517 12.3378 5.15234 11.4828 5.49271 10.6874C7.29867 6.46732 8.0482 3.12524 11.2039 3.12524C14.3276 3.12524 15.0444 6.59525 16.8464 10.6145Z"
                    fill="#D9D9D9"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M5.11694 11.8281C5.0173 12.2776 4.97778 12.7368 5.02697 13.1972C5.47755 17.4155 8.07146 20.6502 11.2039 20.6502C14.3128 20.6502 16.8912 17.464 17.3704 13.2923C17.4269 12.7993 17.3812 12.3081 17.2681 11.8281H5.11694Z"
                    fill="#23C4F7"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M17.2945 11.9473C17.1982 11.4909 17.0388 11.044 16.8462 10.6145C16.5154 9.87654 16.2211 9.15712 15.9419 8.47428C14.6999 5.43802 13.7539 3.12524 11.2037 3.12524C8.5469 3.12524 7.5956 5.49414 6.28351 8.76149C6.03713 9.37503 5.77803 10.0202 5.49252 10.6874C5.31843 11.0942 5.17657 11.5167 5.0918 11.9473H17.2945Z"
                    fill="#FFCA11"
                  />
                  <path
                    d="M14.5685 11.9474C14.5685 11.2044 14.2142 10.4322 13.5834 9.90675C12.9527 9.38135 12.0972 9.08618 11.2052 9.08618C10.3131 9.08618 9.45765 9.38135 8.8269 9.90675C8.19615 10.4322 7.8418 11.2044 7.8418 11.9474H11.2052H14.5685Z"
                    fill="#DC4FFF"
                  />
                  <path
                    d="M7.8418 11.947C7.8418 13.3224 8.19615 14.5818 8.8269 15.5544C9.45765 16.527 10.3131 17.0733 11.2052 17.0733C12.0972 17.0733 12.9527 16.527 13.5834 15.5544C14.2142 14.5818 14.5685 13.3224 14.5685 11.947H11.1968H7.8418Z"
                    fill="black"
                  />
                </g>
              </g>
              <defs>
                <clipPath id="clip0_206_1760">
                  <rect
                    width="20.328"
                    height="20.328"
                    fill="white"
                    transform="translate(0 0.335938)"
                  />
                </clipPath>
              </defs>
            </svg>
            Palta
          </span>
        </a>
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold">
          {conversation.name}
        </p>
      </div>
      <div className="h-full w-full overflow-auto px-3 py-8">
        <div
          className="mx-auto h-full w-full max-w-[840px] space-y-4"
          data-conversation-container
        >
          <ConversationMessages
            conversation={conversation}
            userThumbnail={user.profileThumbnail}
          />
        </div>
      </div>
    </div>
  );
}
