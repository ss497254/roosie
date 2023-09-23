import { useState } from "react";
import { Mask, ModelConfig, useAppConfig } from "src/store";
import { Updater } from "src/types/Mask";
import { List, ListItem, Popover, showConfirm } from "src/ui";
import { ModelConfigList } from "../Settings/ModelConfig";
import { ContextPrompts } from "./ContextPrompts";

import AddIcon from "src/icons/add.svg";
import CopyIcon from "src/icons/copy.svg";
import DeleteIcon from "src/icons/delete.svg";
import DownloadIcon from "src/icons/download.svg";
import DragIcon from "src/icons/drag.svg";
import EditIcon from "src/icons/edit.svg";
import EyeIcon from "src/icons/eye.svg";
import UploadIcon from "src/icons/upload.svg";
import { MaskAvatar } from "./MaskAvatar";

export function MaskConfig(props: {
  mask: Mask;
  updateMask: Updater<Mask>;
  extraListItems?: JSX.Element;
  readonly?: boolean;
  shouldSyncFromGlobal?: boolean;
}) {
  const [showPicker, setShowPicker] = useState(false);

  const updateConfig = (updater: (config: ModelConfig) => void) => {
    if (props.readonly) return;

    const config = { ...props.mask.modelConfig };
    updater(config);
    props.updateMask((mask) => {
      mask.modelConfig = config;
      // if user changed current session mask, it will disable auto sync
      mask.syncGlobalConfig = false;
    });
  };

  const globalConfig = useAppConfig();

  return (
    <>
      <ContextPrompts
        context={props.mask.context}
        updateContext={(updater) => {
          const context = props.mask.context.slice();
          updater(context);
          props.updateMask((mask) => (mask.context = context));
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
              <MaskAvatar mask={props.mask} />
            </div>
          </Popover>
        </ListItem>
        <ListItem title="Bot Name">
          <input
            type="text"
            value={props.mask.name}
            onInput={(e) =>
              props.updateMask((mask) => {
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
            checked={props.mask.hideContext}
            onChange={(e) => {
              props.updateMask((mask) => {
                mask.hideContext = e.currentTarget.checked;
              });
            }}
          ></input>
        </ListItem>

        {props.shouldSyncFromGlobal ? (
          <ListItem
            title="Use Global Config"
            subTitle="Use global config in this chat"
          >
            <input
              type="checkbox"
              checked={props.mask.syncGlobalConfig}
              onChange={async (e) => {
                const checked = e.currentTarget.checked;
                if (
                  checked &&
                  (await showConfirm(
                    "Confirm to override custom config with global config?",
                  ))
                ) {
                  props.updateMask((mask) => {
                    mask.syncGlobalConfig = checked;
                    mask.modelConfig = { ...globalConfig.modelConfig };
                  });
                } else if (!checked) {
                  props.updateMask((mask) => {
                    mask.syncGlobalConfig = checked;
                  });
                }
              }}
            ></input>
          </ListItem>
        ) : null}
      </List>

      <List>
        <ModelConfigList
          modelConfig={{ ...props.mask.modelConfig }}
          updateConfig={updateConfig}
        />
        {props.extraListItems}
      </List>
    </>
  );
}
