"use client";

import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { forwardRef, useEffect, useRef } from "react";
import { IconButton } from "../icon-button";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { Button } from "..";
import { useDBUser } from "@/hooks/use-db-user";

interface ChatInputProps
  extends Omit<
    React.ComponentPropsWithoutRef<"textarea">,
    "value" | "onChange" | "defaultValue"
  > {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onSend?: (message: string, file?: File) => void;
  isSending?: boolean;

  supportsFileUpload?: boolean;
  file?: File;
  onFileUpload?: (file: File) => void;
}

export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  (props, ref) => {
    ref = useRef<HTMLTextAreaElement>(null);
    const { data } = useDBUser();
    const {
      value: valueProp,
      onChange,
      defaultValue,
      onSend,
      isSending,
      supportsFileUpload,
      file: fileProp,
      onFileUpload,
      ...rest
    } = props;

    const [file, setFile] = useControllableState({
      prop: fileProp,
      defaultProp: undefined,
      onChange: onFileUpload,
    });
    const [value = "", setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange,
    });

    const isDisabled = !value || isSending || !data?.credits;

    useEffect(() => {
      const handleSave = (e: KeyboardEvent) => {
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && !isDisabled) {
          e.preventDefault();
          onSend?.(value, file);
        }
      };
      if (ref.current) {
        ref.current.addEventListener("keydown", handleSave);
      }

      return () => {
        if (ref.current) {
          ref.current.removeEventListener("keydown", handleSave);
        }
      };
    }, [value]);

    return (
      <div className="fixed bottom-0 left-0 w-full px-3">
        <div className="shadow-chat-input @[840px]:mb-4 mx-auto mb-3 h-[166px] w-full max-w-[840px] overflow-hidden rounded-lg bg-white/90 backdrop-blur-md transition-all">
          <textarea
            autoFocus
            id="input"
            name="prompt"
            value={value}
            rows={4}
            onChange={(e) => setValue(e.target.value)}
            ref={ref}
            placeholder="Type your message here"
            className="w-full resize-none bg-transparent p-4 text-sm font-medium outline-none placeholder:text-tertiary"
            {...rest}
          />
          <div className="flex h-12 items-center justify-end p-2">
            <div className="flex items-center gap-2">
              {supportsFileUpload ? (
                <>
                  <IconButton
                    onClick={() => {
                      const input = document.querySelector(
                        "input[data-chat-file]",
                      ) as HTMLInputElement;
                      if (input) {
                        input.click();
                      }
                    }}
                    variant="ghost"
                  >
                    <PaperClipIcon />
                  </IconButton>
                  <input
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setFile(file);
                      }
                    }}
                    hidden
                    type="file"
                    data-chat-file
                  />
                  <hr className="mr-2 h-3.5 w-px bg-[theme(borderColor.primary)]" />
                </>
              ) : null}
              <Button.Root
                type="submit"
                disabled={isDisabled}
                className="px-1 text-[13px]"
                variant="primary"
                onClick={() => onSend?.(value)}
              >
                <Button.Text className="pt-px">Send</Button.Text>
                <span className="inline-grid size-4 place-content-center rounded border border-extras-code bg-extras-code text-[11px] font-bold text-inverted-primary">
                  ⌘
                </span>
                <span className="inline-grid size-4 place-content-center rounded border border-extras-code bg-extras-code pt-0.5 text-[11px] font-bold text-inverted-primary">
                  ↵
                </span>
              </Button.Root>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

ChatInput.displayName = "ChatInput";
