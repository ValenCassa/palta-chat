import { cn } from "@/utils/cn";
import {
  ChatBubbleLeftRightIcon,
  ChatBubbleOvalLeftIcon,
  CircleStackIcon,
  NewspaperIcon,
  WalletIcon,
} from "@heroicons/react/16/solid";
import { SidebarCredits } from "./sidebar-credits";
import { SidebarFooterWrapper } from "./sidebar-footer-wrapper";

export const sidebarFooterActionClassNames = cn(
  "flex h-6 items-center gap-1 text-sm font-medium text-tertiary transition-colors hover:text-secondary [&_svg]:size-4",
);

export const SidebarFooter = () => {
  return (
    <SidebarFooterWrapper>
      <SidebarCredits />
      <div className="space-y-1.5">
        <a href="#" className={sidebarFooterActionClassNames}>
          <WalletIcon />
          Billing
        </a>
        <a href="#" className={sidebarFooterActionClassNames}>
          <NewspaperIcon />
          What&apos;s new
        </a>
        <a href="#" className={sidebarFooterActionClassNames}>
          <ChatBubbleLeftRightIcon />
          Request a feature
        </a>
        <a href="#" className={sidebarFooterActionClassNames}>
          <ChatBubbleOvalLeftIcon />
          Help
        </a>
      </div>
    </SidebarFooterWrapper>
  );
};
