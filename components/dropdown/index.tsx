"use client";

import { cn } from "@/utils/cn";
import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import { forwardRef } from "react";

/* ------------- Dropdown.Root ------------- */
interface DropdownRootProps extends RadixDropdown.DropdownMenuProps {}
const DropdownRoot = RadixDropdown.Root;

/* ------------- Dropdown.Trigger ------------- */
interface DropdownTriggerProps extends RadixDropdown.DropdownMenuTriggerProps {}
const DropdownTrigger = RadixDropdown.Trigger;

/* ------------- Dropdown.Content ------------- */
interface DropdownContentProps extends RadixDropdown.DropdownMenuContentProps {}
const DropdownContent = forwardRef<HTMLDivElement, DropdownContentProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <RadixDropdown.Portal>
        <RadixDropdown.Content
          ref={ref}
          sideOffset={5}
          align="start"
          className={cn(
            "bg-popover shadow-popover max-h-[300px] min-w-[220px] overflow-auto rounded-[10px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...rest}
        />
      </RadixDropdown.Portal>
    );
  },
);

DropdownContent.displayName = "DropdownContent";

/* ------------- Dropdown.Group ------------- */
interface DropdownGroupProps extends RadixDropdown.DropdownMenuGroupProps {}
const DropdownGroup = forwardRef<HTMLDivElement, DropdownGroupProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <RadixDropdown.Group
        ref={ref}
        className={cn("overflow-hidden p-1", className)}
        {...rest}
      />
    );
  },
);

DropdownGroup.displayName = "DropdownGroup";

/* ------------- Dropdown.Item ------------- */
interface DropdownItemProps extends RadixDropdown.DropdownMenuItemProps {}
const DropdownItem = forwardRef<HTMLDivElement, DropdownItemProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <RadixDropdown.Item
        ref={ref}
        className={cn(
          "flex h-7 cursor-pointer select-none items-center rounded-md px-1.5 text-sm font-medium text-secondary outline-none transition-colors hover:bg-interactive-hover hover:text-interactive-hover",
          className,
        )}
        {...rest}
      />
    );
  },
);

DropdownItem.displayName = "DropdownItem";

/* ------------- Dropdown.Separator ------------- */
interface DropdownSeparatorProps
  extends RadixDropdown.DropdownMenuSeparatorProps {}
const DropdownSeparator = forwardRef<HTMLDivElement, DropdownSeparatorProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <RadixDropdown.Separator
        ref={ref}
        className={cn(
          "h-px w-full border-b border-dashed border-primary",
          className,
        )}
        {...rest}
      />
    );
  },
);

DropdownSeparator.displayName = "DropdownSeparator";

export type {
  DropdownRootProps as RootProps,
  DropdownTriggerProps as TriggerProps,
  DropdownContentProps as ContentProps,
  DropdownGroupProps as GroupProps,
  DropdownItemProps as ItemProps,
  DropdownSeparatorProps as SeparatorProps,
};

export {
  DropdownRoot as Root,
  DropdownTrigger as Trigger,
  DropdownContent as Content,
  DropdownGroup as Group,
  DropdownItem as Item,
  DropdownSeparator as Separator,
};
