import { db } from "@/server/db/client";
import { cn } from "@/utils/cn";
import { CircleStackIcon } from "@heroicons/react/16/solid";
import { eq } from "drizzle-orm";

import { sidebarFooterActionClassNames } from "./sidebar-footer";
import { currentUser } from "@clerk/nextjs/server";
import { users } from "@/server/db/schema/users";
import { formatCurrency } from "@/utils/format-currency";
import { ALERT_STYLE, Alert } from "@/components";

const getProfile = async () => {
  const user = await currentUser();

  if (!user) {
    throw new Error("You must be signed in to use this feature");
  }

  const data = await db.select().from(users).where(eq(users.id, user.id));
  if (!data.length) {
    throw new Error("Profile not found");
  }

  const profile = data[0];

  return profile;
};

export const SidebarCredits = async () => {
  const profile = await getProfile();

  const credits = profile.credits;

  const alertType = ():
    | { variant: keyof typeof ALERT_STYLE; label: string }
    | undefined => {
    if (credits < 0.5) {
      return {
        variant: "danger",
        label: "You've run out of credits",
      };
    }

    if (credits < 2) {
      return {
        variant: "warning",
        label: "You're running out of credits",
      };
    }
  };

  const _alertType = alertType();

  return (
    <div className="space-y-3">
      {_alertType ? (
        <Alert
          className="w-full"
          variant={_alertType.variant}
          label={_alertType.label}
        />
      ) : null}
      <button
        className={cn(
          sidebarFooterActionClassNames,
          { "text-accent-primary hover:text-accent-primary": !_alertType },
          {
            "text-warning-primary hover:text-warning-primary":
              _alertType?.variant === "warning",
          },
          {
            "text-danger-primary hover:text-danger-primary":
              _alertType?.variant === "danger",
          },
        )}
      >
        <CircleStackIcon />
        {formatCurrency(credits)} credits remaning
      </button>
    </div>
  );
};
