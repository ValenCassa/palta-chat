"use client";

import { cn } from "@/utils/cn";
import * as RadixSelect from "@radix-ui/react-select";
import {
  Combobox,
  ComboboxItem,
  ComboboxList,
  ComboboxListProps,
  ComboboxProps,
  ComboboxProvider,
  ComboboxProviderProps,
} from "@ariakit/react";
import { createContext, forwardRef, startTransition, useContext } from "react";
import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";

/* ------------- Context ------------- */
interface SelectContextValue {
  autocompleteValue: string;
  setAutocompleteValue: (value: string) => void;
  value: string | undefined;
  setValue: (value: string) => void;
}
const SelectContext = createContext<SelectContextValue | null>(null);
const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error("useSelectContext must be used within a SelectProvider");
  }
  return context;
};

/* ------------- Select.Root ------------- */
interface SelectRootProps extends RadixSelect.SelectProps {
  autocompleteValue?: string;
  onAutocompleteValueChange?: (value: string) => void;
  defaultAutocompleteValue?: string;
  activeId?: string | null | undefined;
  defaultActiveId?: string | null | undefined;
  onActiveIdChange?: (activeId: string | null | undefined) => void;
}
const SelectRoot = ({
  children,
  autocompleteValue: autocompleteValueProp,
  defaultAutocompleteValue,
  onAutocompleteValueChange,
  open: openProp,
  onOpenChange,
  defaultOpen,
  activeId: activeIdProp,
  defaultActiveId,
  onActiveIdChange,
  value: valueProp,
  defaultValue,
  onValueChange,
  ...props
}: SelectRootProps) => {
  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue,
    onChange: onValueChange,
  });
  const [open, setOpen] = useControllableState({
    prop: openProp,
    defaultProp: defaultOpen,
    onChange: onOpenChange,
  });
  const [activeId, setActiveId] = useControllableState({
    prop: activeIdProp,
    defaultProp: defaultActiveId,
    onChange: onActiveIdChange,
  });
  const [autocompleteValue = "", setAutocompleteValue] = useControllableState({
    prop: autocompleteValueProp,
    defaultProp: defaultAutocompleteValue,
    onChange: onAutocompleteValueChange,
  });

  return (
    <SelectContext.Provider
      value={{ autocompleteValue, setAutocompleteValue, value, setValue }}
    >
      <RadixSelect.Root
        value={value}
        onValueChange={setValue}
        open={open}
        onOpenChange={(open) => {
          setActiveId(null);
          setOpen(open);
        }}
        {...props}
      >
        <ComboboxProvider
          open={open}
          setOpen={setOpen}
          resetValueOnHide
          includesBaseElement={false}
          setValue={(val) => {
            startTransition(() => {
              setAutocompleteValue(val);
            });
          }}
          activeId={activeId}
          setActiveId={setActiveId}
        >
          {children}
        </ComboboxProvider>
      </RadixSelect.Root>
    </SelectContext.Provider>
  );
};

/* ------------- Select.Trigger ------------- */
interface SelectTriggerProps extends RadixSelect.SelectTriggerProps {}
const SelectTrigger = forwardRef<HTMLButtonElement, SelectTriggerProps>(
  (props, ref) => {
    const { className, children, ...rest } = props;

    return (
      <RadixSelect.Trigger
        className={cn(
          "shadow-button-secondary text-xsPlus flex h-7 items-center gap-2.5 rounded-md bg-button-secondary px-1.5 font-medium outline-none transition-all hover:bg-button-secondary-hover focus:ring",
        )}
        ref={ref}
        {...rest}
        asChild
      >
        <button>
          {children}
          {props.disabled ? null : (
            <RadixSelect.Icon>
              <ChevronUpDownIcon className="size-4 text-tertiary" />
            </RadixSelect.Icon>
          )}
        </button>
      </RadixSelect.Trigger>
    );
  },
);

SelectTrigger.displayName = "SelectTrigger";

/* ------------- Select.Trigger ------------- */
interface SelectValueProps extends RadixSelect.SelectValueProps {}
const SelectValue = RadixSelect.Value;

/* ------------- Select.Content ------------- */
interface SelectContentProps extends RadixSelect.SelectContentProps {}
const SelectContent = forwardRef<HTMLDivElement, SelectContentProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <RadixSelect.Portal>
        <RadixSelect.Content
          ref={ref}
          sideOffset={5}
          position="popper"
          align="start"
          className={cn(
            "bg-popover shadow-popover flex max-h-[300px] min-w-[220px] flex-col overflow-hidden rounded-[10px]",
            "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
            className,
          )}
          {...rest}
        />
      </RadixSelect.Portal>
    );
  },
);

SelectContent.displayName = "SelectContent";

/* ------------- Select.Combobox ------------- */
interface SelectComboboxProps extends React.ComponentProps<"div"> {
  comboboxProps?: ComboboxProps;
}
const SelectCombobox = forwardRef<HTMLDivElement, SelectComboboxProps>(
  (props, ref) => {
    const { className, comboboxProps, ...rest } = props;

    return (
      <div
        className={cn(
          "flex items-center gap-1.5 border-b border-primary bg-surface-secondary px-3 py-2.5",
          className,
        )}
        {...rest}
        ref={ref}
      >
        <span>
          <MagnifyingGlassIcon className="size-4 text-weak" />
        </span>
        <Combobox
          autoSelect
          className="h-full w-full bg-transparent text-sm font-medium outline-none placeholder:text-weak"
          onBlurCapture={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          {...comboboxProps}
        />
      </div>
    );
  },
);

SelectCombobox.displayName = "SelectCombobox";

/* ------------- Select.ComboboxList ------------- */
interface SelectComboboxListProps extends ComboboxListProps {}
const SelectComboboxList = forwardRef<HTMLDivElement, SelectComboboxListProps>(
  (props, ref) => {
    return <ComboboxList alwaysVisible ref={ref} {...props} />;
  },
);

SelectComboboxList.displayName = "SelectComboboxList";

/* ------------- Select.Group ------------- */
interface SelectGroupProps extends RadixSelect.SelectGroupProps {}
const SelectGroup = forwardRef<HTMLDivElement, SelectGroupProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <RadixSelect.Group ref={ref} className={cn("p-1", className)} {...rest} />
    );
  },
);

SelectGroup.displayName = "SelectGroup";

/* ------------- Select.Item ------------- */
interface SelectItemProps extends RadixSelect.SelectItemProps {}
const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>((props, ref) => {
  const { autocompleteValue, value } = useSelectContext();
  const { className, textValue = "", children, ...rest } = props;

  const isSelectedValue = value === rest.value;
  const isAutocompleteMatch = textValue
    .toLowerCase()
    .includes(autocompleteValue.toLowerCase());

  if (autocompleteValue && !isAutocompleteMatch && !isSelectedValue) {
    return null;
  }

  return (
    <RadixSelect.Item
      asChild
      ref={ref}
      className={cn(
        "data-[state=checked]:bg-interactive-checked flex h-7 cursor-pointer select-none items-center rounded-md px-1.5 text-sm font-medium text-secondary outline-none transition-colors hover:bg-interactive-hover hover:text-interactive-hover data-[active-item]:bg-interactive-hover data-[active-item]:text-interactive-hover",
        className,
      )}
      {...rest}
    >
      <ComboboxItem>{children}</ComboboxItem>
    </RadixSelect.Item>
  );
});

SelectItem.displayName = "SelectItem";

/* ------------- Select.Viewport ------------- */
interface SelectViewportProps extends RadixSelect.SelectViewportProps {}
const SelectViewport = RadixSelect.Viewport;

/* ------------- Select.ItemText ------------- */
interface SelectItemTextProps extends RadixSelect.SelectItemTextProps {}
const SelectItemText = RadixSelect.ItemText;

/* ------------- Select.Separator ------------- */
interface SelectSeparatorProps extends RadixSelect.SelectSeparatorProps {}
const SelectSeparator = forwardRef<HTMLDivElement, SelectSeparatorProps>(
  (props, ref) => {
    const { className, ...rest } = props;

    return (
      <RadixSelect.Separator
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

SelectSeparator.displayName = "SelectSeparator";

export type {
  SelectRootProps as RootProps,
  SelectTriggerProps as TriggerProps,
  SelectValueProps as ValueProps,
  SelectContentProps as ContentProps,
  SelectComboboxProps as ComboboxProps,
  SelectComboboxListProps as ComboboxListProps,
  SelectGroupProps as GroupProps,
  SelectItemProps as ItemProps,
  SelectItemTextProps as ItemTextProps,
  SelectSeparatorProps as SeparatorProps,
  SelectViewportProps as ViewportProps,
};

export {
  SelectRoot as Root,
  SelectTrigger as Trigger,
  SelectValue as Value,
  SelectContent as Content,
  SelectCombobox as Combobox,
  SelectComboboxList as ComboboxList,
  SelectGroup as Group,
  SelectItem as Item,
  SelectItemText as ItemText,
  SelectSeparator as Separator,
  SelectViewport as Viewport,
};
