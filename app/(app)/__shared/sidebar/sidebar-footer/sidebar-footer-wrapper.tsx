"use client";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import * as RadixCollapsible from "@radix-ui/react-collapsible";

interface SidebarFooterWrapperProps {
  children: React.ReactNode;
}

export const SidebarFooterWrapper = ({
  children,
}: SidebarFooterWrapperProps) => {
  return (
    <RadixCollapsible.Root defaultOpen className="group mt-auto w-full">
      <RadixCollapsible.Trigger className="hover:bg-interactive-hover-secondary grid h-6 w-full place-content-center border-t border-primary text-secondary transition-colors hover:text-interactive-hover">
        <ChevronDownIcon className="block size-5 transition-transform group-data-[state=closed]:rotate-180" />
      </RadixCollapsible.Trigger>
      <RadixCollapsible.Content className="data-[state=open]:animate-collapsible-down data-[state=closed]:animate-collapsible-up space-y-1.5 overflow-hidden p-2.5 transition-all">
        {children}
      </RadixCollapsible.Content>
    </RadixCollapsible.Root>
  );
};
