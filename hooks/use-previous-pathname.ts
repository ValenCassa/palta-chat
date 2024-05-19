import { useContext } from "react";
import { HistoryContext } from "@/components/history-provider";

export const usePreviousPathname = () => {
  const pathname = useContext(HistoryContext);

  if (pathname === null) {
    throw new Error(
      "usePreviousPathname must be used within a HistoryProvider",
    );
  }

  return pathname;
};
