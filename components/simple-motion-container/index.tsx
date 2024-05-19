"use client";

import { LayoutGroup, motion } from "framer-motion";
import { ComponentPropsWithoutRef, forwardRef } from "react";

const MotionDiv = motion("div");
export type SimpleMotionContainerProps = ComponentPropsWithoutRef<
  typeof MotionDiv
> & {
  className?: string;
  children: React.ReactNode;
};

export const SimpleMotionContainer = forwardRef<
  HTMLDivElement,
  SimpleMotionContainerProps
>((props, ref) => {
  const { children, ...rest } = props;
  return (
    <MotionDiv
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      ref={ref}
      {...rest}
    >
      <LayoutGroup>{children}</LayoutGroup>
    </MotionDiv>
  );
});

SimpleMotionContainer.displayName = "SimpleMotionContainer";
