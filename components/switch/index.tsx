"use client";

import { cn } from "@/utils/cn";
import * as RadixSwitch from "@radix-ui/react-switch";
import { forwardRef } from "react";
import { motion } from "framer-motion";
import { useControllableState } from "@radix-ui/react-use-controllable-state";

const MotionSwitchThumb = motion(RadixSwitch.Thumb);

interface SwitchProps extends RadixSwitch.SwitchProps {}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  (props, ref) => {
    const { className, checked, onCheckedChange, defaultChecked, ...rest } =
      props;
    const [value, setValue] = useControllableState({
      prop: checked,
      defaultProp: defaultChecked,
      onChange: onCheckedChange,
    });

    return (
      <RadixSwitch.Root
        ref={ref}
        checked={value}
        onCheckedChange={setValue}
        className={cn(
          "data-[state=checked]:bg-accent-primary relative h-5 w-8 rounded-full bg-olive-200 px-0.5 outline-none transition-colors duration-100",
        )}
        {...rest}
      >
        <MotionSwitchThumb
          initial={{
            x: value ? "100%" : 0,
          }}
          animate={{
            x: value ? "100%" : 0,
          }}
          transition={{
            duration: 0.1,
            ease: "easeInOut",
          }}
          className="block size-3.5 translate-x-0.5 rounded-full bg-white  shadow-[0px_0px_0px_0.5px_rgba(3,_7,_18,_0.02),_0px_5px_4px_rgba(3,_7,_18,_0.02),_0px_3px_3px_rgba(3,_7,_18,_0.04),_0px_1px_2px_rgba(3,_7,_18,_0.12),_0px_0px_1px_rgba(3,_7,_18,_0.08),_inset_0px_0px_2px_1px_#FFFFFF,_inset_0px_1px_0px_#FFFFFF]"
        />
      </RadixSwitch.Root>
    );
  },
);

Switch.displayName = "Switch";
