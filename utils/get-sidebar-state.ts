"server-only";

import { cookies } from "next/headers";

export const getSidebarState = () => {
  return cookies().get("sidebar-state")?.value || "open";
};
