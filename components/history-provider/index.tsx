"use client";

import { usePrevious } from "@/hooks/use-previous";
import { usePathname } from "next/navigation";
import { createContext } from "react";

export const HistoryContext = createContext<string>("");

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const pathname = usePathname();
  const previousPathname = usePrevious(pathname);

  return (
    <HistoryContext.Provider value={previousPathname || ""}>
      {children}
    </HistoryContext.Provider>
  );
};
