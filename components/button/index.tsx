import { cn } from "@/utils/cn";
import { ComponentPropsWithoutRef, forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";

export const buttonVariants = tv({
  variants: {
    variant: {
      primary:
        "shadow-button-primary bg-button-primary bg-olive-900 font-semibold text-button-primary transition-shadow hover:brightness-110",
      secondary:
        "shadow-button-secondary bg-button-secondary font-medium text-button-secondary transition-all hover:bg-button-secondary-hover",
      accent:
        "shadow-button-accent bg-blue-500 bg-button-accent font-semibold text-button-accent transition-shadow before:inset-0 hover:brightness-110",
    },
    rounded: {
      true: "rounded-full",
      false: "rounded-md",
    },
    size: {
      md: "h-[26px] px-2",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "accent",
    rounded: false,
  },
  base: "inline-flex items-center justify-center gap-0.5 text-sm outline-none focus:ring disabled:opacity-50 [&_svg]:size-3.5",
});

/* ------------- Button.Root ------------- */

type ButtonRootProps = ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants>;

const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(
  (props, ref) => {
    const { className, variant, rounded, size, ...rest } = props;

    return (
      <button
        type="button"
        ref={ref}
        className={buttonVariants({ variant, rounded, size, className })}
        {...rest}
      />
    );
  },
);

ButtonRoot.displayName = "ButtonRoot";

/* ------------- Button.Text ------------- */
type ButtonTextProps = ComponentPropsWithoutRef<"span">;
const ButtonText = forwardRef<HTMLSpanElement, ButtonTextProps>(
  (props, ref) => {
    const { className, ...rest } = props;
    return <span className={cn("px-1", className)} ref={ref} {...rest} />;
  },
);

ButtonText.displayName = "ButtonText";

export type { ButtonRootProps as RootProps, ButtonTextProps as TextProps };

export { ButtonRoot as Root, ButtonText as Text };
