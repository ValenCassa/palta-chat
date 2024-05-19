"use client";

import { forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";

export const iconButtonVariants = tv({
  variants: {
    variant: {
      ghost:
        "bg-transparent text-button-ghost hover:bg-interactive-hover hover:text-interactive-hover data-[state=open]:bg-interactive-hover [&_svg]:text-inherit",
    },
    size: {
      xs: "size-[18px] rounded [&_svg]:size-4",
      sm: "size-6 rounded-md [&_svg]:size-[18px]",
      md: "size-7 rounded-md [&_svg]:size-4",
    },
  },
  defaultVariants: {
    variant: "ghost",
    size: "md",
  },
  base: "inline-grid place-content-center outline-none transition-all focus:ring disabled:pointer-events-none disabled:opacity-50",
});

type IconButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof iconButtonVariants>;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (props, ref) => {
    const { children, className, ...rest } = props;

    return (
      <button
        ref={ref}
        className={iconButtonVariants({ ...props, className })}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

IconButton.displayName = "IconButton";
