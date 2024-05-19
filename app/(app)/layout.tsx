import { cookies } from "next/headers";
import { Sidebar } from "./__shared/sidebar/sidebar";
import { HistoryProvider } from "@/components/history-provider";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default async function AppLayout({ children }: AppLayoutProps) {
  const isSidebarOpen = cookies().get("sidebar-state")?.value === "open";

  return (
    <HistoryProvider>
      <div className="flex h-full w-full overflow-hidden">
        <Sidebar isOpen={isSidebarOpen} />
        {children}
      </div>
    </HistoryProvider>
  );
}
