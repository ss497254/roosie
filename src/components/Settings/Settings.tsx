import Router from "next/router";
import { useEffect, useState } from "react";
import { Path } from "src/constant";
import {
  SubmitKey,
  useAccessStore,
  useAppConfig,
  useUpdateStore,
} from "src/store";
import { SearchService, usePromptStore } from "src/store/prompt";
import { List, ListItem, Popover, Select } from "src/ui";
import { IconButton } from "../button";
import { Avatar, AvatarPicker } from "../emoji";
import { ErrorBoundary } from "../error";
import { InputRange } from "../input-range";
import { ModelConfigList } from "../model-config";
import { DangerItems } from "./DangerItems";
import { SyncItems } from "./SyncItem";
import { UserPromptModal } from "./UserPromptModal";

import CloseIcon from "src/icons/close.svg";
import EditIcon from "src/icons/edit.svg";
import MaxIcon from "src/icons/max.svg";
import MinIcon from "src/icons/min.svg";
import ResetIcon from "src/icons/reload.svg";
import { getWSClient } from "src/lib/ws-client-store";

export function Settings() {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const config = useAppConfig();
  const updateConfig = useAppConfig((state) => state.update);
  const wsClient = getWSClient();
  const status = wsClient.getStore()((state) => state.status);

  const updateStore = useUpdateStore();

  const usage = {
    used: updateStore.used,
    subscription: updateStore.subscription,
  };
  const [loadingUsage, setLoadingUsage] = useState(false);
  function checkUsage(force = false) {
    if (accessStore.hideBalanceQuery) {
      return;
    }

    setLoadingUsage(true);
    updateStore.updateUsage(force).finally(() => {
      setLoadingUsage(false);
    });
  }

  const accessStore = useAccessStore();

  const promptStore = usePromptStore();
  const builtinCount = SearchService.count.builtin;
  const customCount = promptStore.getUserPrompts().length ?? 0;
  const [shouldShowPromptModal, setShowPromptModal] = useState(false);

  useEffect(() => {
    // checkUsage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        Router.push(Path.Home);
      }
    };
    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary>
      <div className="window-header" data-tauri-drag-region>
        <div className="window-header-title">
          <div className="window-header-main-title">Settings</div>
          <div className="window-header-sub-title">All settings</div>
        </div>
        <div className="window-actions">
          <div className="window-action-button"></div>
          <div className="window-action-button"></div>
          <div className="window-action-button">
            <IconButton
              icon={<CloseIcon />}
              onClick={() => Router.push(Path.Home)}
              bordered
            />
          </div>
        </div>
      </div>
      <div className="p-5 overflow-auto">
        <List>
          <ListItem title="Avatar">
            <Popover
              onClose={() => setShowEmojiPicker(false)}
              content={
                <AvatarPicker
                  onEmojiClick={(avatar: string) => {
                    updateConfig((config) => (config.avatar = avatar));
                    setShowEmojiPicker(false);
                  }}
                />
              }
              open={showEmojiPicker}
            >
              <button onClick={() => setShowEmojiPicker(true)}>
                <Avatar avatar={config.avatar} size={40} />
              </button>
            </Popover>
          </ListItem>

          <ListItem title="Send Key">
            <Select
              value={config.submitKey}
              onChange={(e) => {
                updateConfig(
                  (config) =>
                    (config.submitKey = e.target.value as any as SubmitKey),
                );
              }}
            >
              {Object.values(SubmitKey).map((v) => (
                <option value={v} key={v}>
                  {v}
                </option>
              ))}
            </Select>
          </ListItem>

          <ListItem title="Full screen">
            <IconButton
              icon={config.tightBorder ? <MinIcon /> : <MaxIcon />}
              bordered
              onClick={() => {
                config.update(
                  (config) => (config.tightBorder = !config.tightBorder),
                );
              }}
            />
          </ListItem>

          <ListItem title="App color" subTitle="Changes your app primary color">
            <input
              type="color"
              onChange={(e) => {
                document.body.style.setProperty("--primary", e.target.value);
              }}
            />
          </ListItem>

          <ListItem
            title="Font Size"
            subTitle="Adjust font size of chat content"
          >
            <InputRange
              title={`${config.fontSize ?? 14}px`}
              value={config.fontSize}
              min="12"
              max="18"
              step="1"
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.fontSize = Number.parseInt(e.currentTarget.value)),
                )
              }
            />
          </ListItem>

          <ListItem
            title="Adjust font size of chat content"
            subTitle="Adjust font size of chat content"
          >
            <input
              type="checkbox"
              checked={config.enableAutoGenerateTitle}
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.enableAutoGenerateTitle = e.currentTarget.checked),
                )
              }
            ></input>
          </ListItem>

          <ListItem
            title="Send preview bubble"
            subTitle="Preview markdown in bubble"
          >
            <input
              type="checkbox"
              checked={config.sendPreviewBubble}
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.sendPreviewBubble = e.currentTarget.checked),
                )
              }
            ></input>
          </ListItem>
        </List>

        <List>
          <ListItem
            title="Mask Splash Screen"
            subTitle="Show a mask splash screen before starting new chat"
          >
            <input
              type="checkbox"
              checked={!config.dontShowMaskSplashScreen}
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.dontShowMaskSplashScreen =
                      !e.currentTarget.checked),
                )
              }
            ></input>
          </ListItem>

          <ListItem
            title="Hide Builtin Masks"
            subTitle="Hide builtin masks in mask list"
          >
            <input
              type="checkbox"
              checked={config.hideBuiltinMasks}
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.hideBuiltinMasks = e.currentTarget.checked),
                )
              }
            ></input>
          </ListItem>
        </List>

        <List>
          <ListItem
            title="Disable auto-completion"
            subTitle="Input / to trigger auto-completion"
          >
            <input
              type="checkbox"
              checked={config.disablePromptHint}
              onChange={(e) =>
                updateConfig(
                  (config) =>
                    (config.disablePromptHint = e.currentTarget.checked),
                )
              }
            ></input>
          </ListItem>

          <ListItem
            title="Prompt List"
            subTitle={`${builtinCount} built-in, ${customCount} user-defined`}
          >
            <IconButton
              icon={<EditIcon />}
              text="Edit"
              onClick={() => setShowPromptModal(true)}
            />
          </ListItem>
        </List>

        <List>
          <ListItem title="Connection status" subTitle={status}>
            <IconButton
              icon={<ResetIcon></ResetIcon>}
              onClick={wsClient.reconnect.bind(wsClient)}
            />
          </ListItem>
          <ListItem
            title="API endpoint"
            subTitle="Custom api endpoint must start with http(s)://"
          >
            <input
              type="text"
              value={config.apiURL}
              placeholder="https://server.com/api"
              onChange={(e) =>
                updateConfig((config) => (config.apiURL = e.target.value))
              }
            ></input>
          </ListItem>
          <ListItem
            title="Websocket endpoint"
            subTitle="Custom ws endpoint must start with ws(s)://"
          >
            <input
              type="text"
              value={config.wsURL}
              placeholder="wss://server.com/websocket"
              onChange={(e) =>
                updateConfig((config) => (config.wsURL = e.target.value))
              }
            ></input>
          </ListItem>

          {!accessStore.hideBalanceQuery ? (
            <ListItem
              title="Account Balance"
              subTitle={
                loadingUsage
                  ? "Checking..."
                  : `Used this month $${usage?.used ?? "[?]"}, subscription $${
                      usage?.subscription ?? "[?]"
                    }`
              }
            >
              {loadingUsage ? (
                <div />
              ) : (
                <IconButton
                  icon={<ResetIcon></ResetIcon>}
                  text="Check"
                  onClick={() => checkUsage(true)}
                />
              )}
            </ListItem>
          ) : null}

          <ListItem
            title="Custom Models"
            subTitle="Add extra model options, separate by comma"
          >
            <input
              type="text"
              value={config.customModels}
              placeholder="model1,model2,model3"
              onChange={(e) =>
                config.update(
                  (config) => (config.customModels = e.currentTarget.value),
                )
              }
            ></input>
          </ListItem>
        </List>

        <SyncItems />

        <List>
          <ModelConfigList
            modelConfig={config.modelConfig}
            updateConfig={(updater) => {
              const modelConfig = { ...config.modelConfig };
              updater(modelConfig);
              config.update((config) => (config.modelConfig = modelConfig));
            }}
          />
        </List>

        {shouldShowPromptModal && (
          <UserPromptModal onClose={() => setShowPromptModal(false)} />
        )}

        <DangerItems />
      </div>
    </ErrorBoundary>
  );
}
