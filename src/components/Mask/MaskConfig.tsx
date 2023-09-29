import { useState } from "react";
import { Mask, useAppConfig } from "src/store";
import { Updater } from "src/types/Mask";
import { List, ListItem, Popover, showConfirm } from "src/ui";
import { ModelConfigList } from "../Settings/ModelConfig";
import { ContextPrompts } from "./ContextPrompts";
import { MaskAvatar } from "./MaskAvatar";

interface Props {
  mask: Mask;
  updateMask: Updater<Mask>;
  extraListItems?: JSX.Element;
  readonly?: boolean;
  shouldSyncFromGlobal?: boolean;
}

export function MaskConfig({
  mask,
  readonly,
  updateMask,
  extraListItems,
  shouldSyncFromGlobal,
}: Props) {
  const [showPicker, setShowPicker] = useState(false);
  const globalConfig = useAppConfig();

  return (
    <>
      <ContextPrompts
        context={mask.context}
        updateContext={(updater) => {
          const context = mask.context.slice();
          updater(context);
          updateMask((mask) => (mask.context = context));
        }}
      />

      <List>
        <ListItem title="Bot Avatar">
          <Popover
            content={
              <div className="h-10 w-32 text-center bg-white border-light rounded-lg p-2">
                coming soon
              </div>
            }
            open={showPicker}
            onClose={() => setShowPicker(false)}
          >
            <div
              onClick={() => setShowPicker(true)}
              style={{ cursor: "pointer" }}
            >
              <MaskAvatar mask={mask} size={40} />
            </div>
          </Popover>
        </ListItem>
        <ListItem title="Bot Name">
          <input
            type="text"
            value={mask.name}
            onInput={(e) =>
              updateMask((mask) => {
                mask.name = e.currentTarget.value;
              })
            }
          ></input>
        </ListItem>
        <ListItem
          title="Hide Context Prompts"
          subTitle="Do not show in-context prompts in chat"
        >
          <input
            type="checkbox"
            checked={mask.hideContext}
            onChange={(e) => {
              updateMask((mask) => {
                mask.hideContext = e.currentTarget.checked;
              });
            }}
          ></input>
        </ListItem>

        {shouldSyncFromGlobal ? (
          <ListItem
            title="Use Global Config"
            subTitle="Use global config in this chat"
          >
            <input
              type="checkbox"
              checked={mask.syncGlobalConfig}
              onChange={async (e) => {
                const checked = e.currentTarget.checked;
                if (
                  checked &&
                  (await showConfirm(
                    "Confirm to override custom config with global config?",
                  ))
                ) {
                  updateMask((mask) => {
                    mask.syncGlobalConfig = checked;
                    mask.modelConfig = { ...globalConfig.modelConfig };
                  });
                } else if (!checked) {
                  updateMask((mask) => {
                    mask.syncGlobalConfig = checked;
                  });
                }
              }}
            ></input>
          </ListItem>
        ) : null}
      </List>

      <ModelConfigList
        modelConfig={mask.modelConfig}
        updateModelConfig={(updater) => {
          if (readonly) return;

          updateMask((mask) => {
            const modelConfig = { ...mask.modelConfig };
            updater(modelConfig);
            mask.modelConfig = modelConfig;
          });
        }}
      />
      {extraListItems && <List>{extraListItems}</List>}
    </>
  );
}
