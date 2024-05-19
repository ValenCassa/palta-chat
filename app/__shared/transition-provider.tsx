import { cn } from "@/utils/cn";
import { getSidebarState } from "@/utils/get-sidebar-state";
import { cookies } from "next/headers";

export const Main = (props: { children: React.ReactNode }) => {
  const isSidebarClosed = getSidebarState() === "closed";
  return (
    <main
      data-sidebar-closed={isSidebarClosed || undefined}
      className={cn(
        "group/main flex h-dvh w-dvw flex-col overflow-hidden text-primary",
      )}
    >
      {props.children}
    </main>
  );
};
