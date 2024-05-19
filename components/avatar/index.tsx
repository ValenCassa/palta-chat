"use client";

import { cn } from "@/utils/cn";
import { PhotoIcon } from "@heroicons/react/16/solid";
import * as RadixAvatar from "@radix-ui/react-avatar";
import { forwardRef } from "react";

export interface AvatarProps extends RadixAvatar.AvatarProps {
  src?: string;
  alt?: string;
}
export const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  (props, ref) => {
    const { className, alt, src, ...rest } = props;

    return (
      <RadixAvatar.Root
        {...rest}
        className={cn(
          "relative size-[34px] overflow-hidden rounded-md border border-primary p-1",
          className,
        )}
      >
        <RadixAvatar.Image
          alt={alt}
          src={src}
          ref={ref}
          className={
            "block h-full w-full rounded border border-primary object-contain"
          }
        />
        <RadixAvatar.Fallback className="inline-grid h-full w-full place-content-center rounded bg-olive-200">
          <PhotoIcon className="size-4 text-secondary" />
        </RadixAvatar.Fallback>
      </RadixAvatar.Root>
    );
  },
);

Avatar.displayName = "Avatar";
