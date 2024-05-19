import { SidebarChatList } from "./sidebar-chat-list/sidebar-chat-list";
import { SidebarWrapper } from "./sidebar-wrapper";
import { SidebarFooter } from "./sidebar-footer/sidebar-footer";

interface SidebarProps {
  isOpen: boolean;
}

export const Sidebar = ({ isOpen }: SidebarProps) => {
  return (
    <SidebarWrapper isOpen={isOpen}>
      <SidebarChatList />
      <SidebarFooter />
    </SidebarWrapper>
  );
};
