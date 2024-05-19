import { ReactNode, forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";
import { ExclamationTriangleIcon } from "@heroicons/react/16/solid";

export const alertVariants = tv({
  variants: {
    variant: {
      warning:
        "text-warning-primary after:bg-[linear-gradient(147.71deg,_rgba(255,_255,_255,_0)_-12.55%,_rgba(255,_192,_117,_0.1)_82.35%)] hover:after:bg-[linear-gradient(147.71deg,_rgba(255,_255,_255,_0)_-12.55%,_rgba(255,_192,_117,_0.15)_82.35%)]",
      danger:
        "text-danger-primary after:bg-[linear-gradient(147.71deg,_rgba(255,_255,_255,_0)_-12.55%,_rgba(201,_49,_49,_0.04)_82.35%)] hover:after:bg-[linear-gradient(147.71deg,_rgba(255,_255,_255,_0)_-12.55%,_rgba(201,_49,_49,_0.08)_82.35%)]",
    },
  },
  defaultVariants: {
    variant: "warning",
  },
  base: "shadow-button-secondary relative space-y-1 overflow-hidden rounded-md bg-button-secondary px-2 py-1.5 after:pointer-events-none after:absolute after:inset-0",
});

interface AlertStyle {
  icon: ReactNode;
  label: string;
}
export const ALERT_STYLE: Record<
  NonNullable<VariantProps<typeof alertVariants>["variant"]>,
  AlertStyle
> = {
  warning: {
    icon: <ExclamationTriangleIcon className="size-[13px]" />,
    label: "Warning",
  },
  danger: {
    icon: <ExclamationTriangleIcon className="size-[13px]" />,
    label: "Danger",
  },
};

interface AlertProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof alertVariants> {
  label: string;
}

export const Alert = forwardRef<HTMLButtonElement, AlertProps>((props, ref) => {
  const { className, variant = "warning", label, ...rest } = props;

  const { icon, label: alertLabel } = ALERT_STYLE[variant];

  return (
    <button
      className={alertVariants({ variant, className })}
      ref={ref}
      {...rest}
    >
      <div className="flex items-center gap-1">
        {icon}
        <span className="pt-px text-xs font-medium">{alertLabel}</span>
      </div>
      <p className="text-left text-sm font-medium text-primary">{label}</p>
    </button>
  );
});
