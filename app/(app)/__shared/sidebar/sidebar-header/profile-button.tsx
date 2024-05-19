"use client";

import { Dropdown } from "@/components";
import { useClerk, useUser } from "@clerk/nextjs";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/16/solid";
import * as RadixAvatar from "@radix-ui/react-avatar";

export const ProfileButton = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const avatar = user?.imageUrl;
  const userName = user?.firstName;

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <button className="size-6 overflow-hidden rounded-full border border-primary outline-none transition-shadow hover:ring hover:ring-olive-950/5 focus:ring [&_span]:size-full">
          <RadixAvatar.Root>
            <RadixAvatar.Image className="h-full w-full" src={avatar} />
            <RadixAvatar.Fallback className="block bg-olive-200 pt-1 text-xs font-semibold text-secondary">
              {userName?.charAt(0).toUpperCase()}
            </RadixAvatar.Fallback>
          </RadixAvatar.Root>
        </button>
      </Dropdown.Trigger>
      <Dropdown.Content>
        <Dropdown.Group>
          <Dropdown.Item
            onClick={() => {
              signOut();
            }}
            className="gap-1.5"
          >
            <ArrowRightEndOnRectangleIcon className="size-3.5" />
            Log out
          </Dropdown.Item>
        </Dropdown.Group>
      </Dropdown.Content>
    </Dropdown.Root>
  );
};
