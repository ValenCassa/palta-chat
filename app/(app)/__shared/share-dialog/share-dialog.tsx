"use client";

import { Dialog, DialogDesktop } from "@/components";
import { ShareDialogContent } from "./share-dialog-content";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

export interface ShareDialogProps extends Dialog.RootProps {
  conversation: {
    id: number;
    isPublic: boolean;
  };
  children?: React.ReactNode;
}

export const ShareDialog = ({
  conversation,
  children,
  open,
  onOpenChange,
  defaultOpen,
}: ShareDialogProps) => {
  const [isOpen, setIsOpen] = useControllableState({
    prop: open,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogDesktop.Content className="w-full max-w-[400px]">
        <DialogDesktop.Title>Share</DialogDesktop.Title>
        <ShareDialogContent conversation={conversation} />
      </DialogDesktop.Content>
    </Dialog.Root>
  );
};
