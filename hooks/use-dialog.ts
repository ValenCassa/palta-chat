import { ModalContext } from "@/components/dialog-manager";
import { useContext } from "react";

export const useDialog = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useDialog must be used within a DialogManager");
  }
  return context;
};
