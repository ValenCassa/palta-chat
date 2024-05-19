import { cn } from "@/utils/cn";

interface ChatDetailsSectionRootProps
  extends React.ComponentPropsWithoutRef<"div"> {}

const ChatDetailsSectionRoot = ({
  className,
  ...props
}: ChatDetailsSectionRootProps) => {
  return (
    <div
      className={cn(
        "space-y-2 border-b border-primary px-3 py-2 *:whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
};

interface ChatDetailsSectionItemProps
  extends React.ComponentPropsWithoutRef<"div"> {}
const ChatDetailsSectionItem = ({
  className,
  ...props
}: ChatDetailsSectionItemProps) => {
  return (
    <div className={cn("flex items-center justify-between gap-2")} {...props} />
  );
};

interface ChatDetailsSectionLabelProps
  extends React.ComponentPropsWithoutRef<"p"> {}
const ChatDetailsSectionLabel = ({
  className,
  ...props
}: ChatDetailsSectionLabelProps) => {
  return (
    <p
      className={cn(
        "flex items-center gap-1 text-sm text-secondary",
        className,
      )}
      {...props}
    />
  );
};

interface ChatDetailsSectionValueProps
  extends React.ComponentPropsWithoutRef<"p"> {}
const ChatDetailsSectionValue = ({
  className,
  ...props
}: ChatDetailsSectionValueProps) => {
  return <p className={cn("text-sm text-primary", className)} {...props} />;
};

export {
  ChatDetailsSectionRoot as Root,
  ChatDetailsSectionItem as Item,
  ChatDetailsSectionLabel as Label,
  ChatDetailsSectionValue as Value,
};

export type {
  ChatDetailsSectionRootProps as RootProps,
  ChatDetailsSectionItemProps as ItemProps,
  ChatDetailsSectionLabelProps as LabelProps,
  ChatDetailsSectionValueProps as ValueProps,
};
