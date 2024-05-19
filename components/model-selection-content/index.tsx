"use client";

import { MODELS, PROVIDER_ICON } from "@/utils/constants";
import { Select } from "..";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { Models } from "@/server/db/schema/conversations";
import { useDefaultModel } from "@/hooks/use-default-model";
import { formatCurrency } from "@/utils/format-currency";

interface ModelSelectionContentProps {
  activeModel: Models[number] | null;
}

export const ModelSelectionContent = ({
  activeModel,
}: ModelSelectionContentProps) => {
  const [defaultModel] = useDefaultModel();

  return (
    <RadixTooltip.Provider>
      <RadixTooltip.Root open={!!activeModel} onOpenChange={() => {}}>
        <Select.Content className="min-w-[290px]">
          <RadixTooltip.Trigger asChild>
            <Select.Viewport className="max-h-[300px] scroll-p-[44px] overflow-hidden">
              <Select.Combobox
                className="sticky top-0 z-10"
                comboboxProps={{
                  placeholder: "Search models",
                }}
              />
              <Select.Group>
                <Select.ComboboxList className="flex flex-col space-y-0.5">
                  {Object.entries(MODELS).map(([model, info]) => {
                    const providerIcon = PROVIDER_ICON[info.provider];

                    const isDefaultModel = defaultModel === model;

                    return (
                      <Select.Item
                        id={model}
                        value={model}
                        className="flex items-center justify-between"
                        textValue={model}
                        key={model}
                      >
                        <div className="flex items-center gap-1.5">
                          <img
                            alt={info.provider}
                            src={providerIcon}
                            className="size-3.5"
                          />
                          <Select.ItemText className="text-sm">
                            {model}
                          </Select.ItemText>
                        </div>
                        {isDefaultModel ? (
                          <span className="bg-accent-secondary inline-grid h-[18px] place-content-center rounded-full px-1.5 text-[11px] font-semibold text-accent-primary">
                            Default
                          </span>
                        ) : null}
                      </Select.Item>
                    );
                  })}
                </Select.ComboboxList>
              </Select.Group>
            </Select.Viewport>
          </RadixTooltip.Trigger>
        </Select.Content>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            tabIndex={-1}
            className="bg-popover shadow-popover w-[350px] space-y-3 rounded-lg p-3 outline-none"
            side="right"
            align="start"
            sideOffset={8}
          >
            {(() => {
              if (!activeModel) return null;
              const model = MODELS[activeModel];
              const modelProviderIcon = PROVIDER_ICON[model.provider];
              return (
                <>
                  <div className="flex items-center gap-1.5">
                    <img
                      alt={model.provider}
                      src={modelProviderIcon}
                      className="size-3.5"
                    />
                    <div className="flex items-center gap-1 text-sm font-medium">
                      <p className="text-secondary">{model.provider}</p>
                      <span className="text-secondary">/</span>
                      <p>{activeModel}</p>
                    </div>
                  </div>
                  <div className="text-xsPlus w-full rounded-md bg-surface-secondary">
                    <div className="flex h-8 w-full items-center justify-between border-b border-primary p-2">
                      <p className="text-secondary">Context</p>
                      <p>{Intl.NumberFormat("en-US").format(model.context)}</p>
                    </div>
                    <div className="flex h-8 w-full items-center justify-between border-b border-primary p-2">
                      <p className="text-secondary">Input pricing</p>
                      <p>
                        {formatCurrency(model.pricing.input)} / million tokens
                      </p>
                    </div>
                    <div className="flex h-8 w-full items-center justify-between p-2">
                      <p className="text-secondary">Output pricing</p>
                      <p>
                        {formatCurrency(model.pricing.output)} / million tokens
                      </p>
                    </div>
                  </div>
                </>
              );
            })()}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  );
};
