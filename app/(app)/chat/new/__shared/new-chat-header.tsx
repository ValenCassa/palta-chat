import { Button, IconButton } from "@/components";
import { ModelSelection } from "./model-selection";
import {
  EllipsisHorizontalIcon,
  InformationCircleIcon,
} from "@heroicons/react/16/solid";
import { cn } from "@/utils/cn";

export default function NewChatHeader() {
  return (
    <div className="fixed left-0 z-10 flex h-[44px] w-full items-center justify-between bg-white/90 px-3 backdrop-blur-md transition-all sm:group-data-[sidebar-closed]/main:pl-11">
      <div className="flex gap-2">
        <ModelSelection />
        <IconButton disabled>
          <EllipsisHorizontalIcon />
        </IconButton>
        <p
          className={cn(
            "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-semibold text-tertiary",
          )}
        >
          New chat
        </p>
      </div>
      <div className="flex gap-3">
        <Button.Root disabled>
          <Button.Text>Share</Button.Text>
        </Button.Root>
        <IconButton disabled variant="ghost">
          <InformationCircleIcon />
        </IconButton>
      </div>
    </div>
  );
}
