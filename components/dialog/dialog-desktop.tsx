"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { forwardRef } from "react";
import { tv } from "tailwind-variants";
import { XMarkIcon } from "@heroicons/react/20/solid";

import { IconButton } from "..";
import { useMediaQuery } from "@/hooks/use-media-query";

/* ---------- DialogDesktopRoot ---------- */
type DialogDesktopRootProps = RadixDialog.DialogProps;
const DialogDesktopRoot = RadixDialog.Root;

/* ---------- DialogDesktopTrigger ---------- */
type DialogDesktopTriggerProps = RadixDialog.DialogTriggerProps;
const DialogDesktopTrigger = RadixDialog.Trigger;

/* ---------- DialogDesktopContent ---------- */
const dialogDesktopContentVariants = tv({
  slots: {
    overlay:
      "bg-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0",
    content:
      "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] bg-popover fixed left-1/2 top-1/2 flex max-h-[calc(100%_-_64px)] max-w-[calc(100%_-_64px)] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[10px] shadow-[0px_16px_76px_-7px_rgba(0,_0,_0,_0.1),_0px_6px_16px_-2px_rgba(0,_0,_0,_0.08)]",
  },
});

const { overlay, content } = dialogDesktopContentVariants();

type DialogDesktopContentProps = RadixDialog.DialogContentProps;
const DialogDesktopContent = forwardRef<
  HTMLDivElement,
  DialogDesktopContentProps
>((props, ref) => {
  const isMobile = useMediaQuery("(max-width: 640px)");
  if (isMobile) return null;

  const { className, children, ...rest } = props;
  return (
    <RadixDialog.Portal>
      <RadixDialog.Overlay className={overlay()} />
      <RadixDialog.Content
        className={content({ className })}
        ref={ref}
        {...rest}
      >
        {children}
      </RadixDialog.Content>
    </RadixDialog.Portal>
  );
});

DialogDesktopContent.displayName = "DialogDesktopContent";

/* ---------- DialogDesktopTitle ---------- */
const dialogDesktopTitleVariants = tv({
  slots: {
    title: "text-base font-semibold",
    base: "flex h-[52px] items-center justify-between p-4",
  },
});

const { title, base } = dialogDesktopTitleVariants();

type DialogDesktopTitleProps = RadixDialog.DialogTitleProps;
const DialogDesktopTitle = forwardRef<HTMLDivElement, DialogDesktopTitleProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;
    return (
      <div className={base({ className })} ref={ref} {...rest}>
        <RadixDialog.Title className={title()}>{children}</RadixDialog.Title>
        <RadixDialog.Close className="text-secondary transition-colors hover:text-interactive-hover">
          <XMarkIcon className="size-5" />
        </RadixDialog.Close>
      </div>
    );
  },
);

DialogDesktopTitle.displayName = "DialogDesktopTitle";

/* ---------- DialogDesktopClose ---------- */
type DialogDesktopCloseProps = RadixDialog.DialogCloseProps;
const DialogDesktopClose = RadixDialog.Close;

/* ---------- Exports ---------- */
export {
  DialogDesktopRoot as Root,
  DialogDesktopTrigger as Trigger,
  DialogDesktopContent as Content,
  DialogDesktopTitle as Title,
  DialogDesktopClose as Close,
};

export type {
  DialogDesktopRootProps as RootProps,
  DialogDesktopTriggerProps as TriggerProps,
  DialogDesktopContentProps as ContentProps,
  DialogDesktopTitleProps as TitleProps,
  DialogDesktopCloseProps as CloseProps,
};
