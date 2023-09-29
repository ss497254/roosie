import {
  useAccessStore,
  useAppConfig,
  useOpenaiConfig,
  useUpdateStore,
} from "src/store";
import { IconButton, List, ListItem } from "src/ui";

import { useState } from "react";
import ResetIcon from "src/icons/reload.svg";
import { getWSClient } from "src/lib/ws-client-store";

export function ZConfig() {
  const config = useAppConfig();
  const updateStore = useUpdateStore();
  const wsClient = getWSClient();
  const status = wsClient.getStore()((state) => state.status);
  const updateConfig = useAppConfig((state) => state.update);
  const setOpenaiKey = useOpenaiConfig((state) => state.setOpenaiKey);
  const openaiKey = useOpenaiConfig((state) => state.openaiKey);

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

  return (
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
          placeholder="wss://server.com/ws"
          onChange={(e) =>
            updateConfig((config) => (config.wsURL = e.target.value))
          }
        ></input>
      </ListItem>

      <ListItem title="Openai Key" subTitle="Your openai key">
        <input
          type="text"
          value={openaiKey}
          placeholder="sk-******************"
          onChange={(e) => setOpenaiKey(e.target.value)}
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
  );
}
