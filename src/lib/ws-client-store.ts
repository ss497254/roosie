import { useAccessStore, useAppConfig } from "src/store";
import { WebSocketClient, Connection } from "./ws-client";

let client: WebSocketClient<Connection> | undefined;

export const getWSClient = () => {
  if (!client) throw new Error("client not intialized");

  return client;
};

export const initializeWSClient = () => {
  if (client) return;

  client = new WebSocketClient({
    getConnection: () =>
      new WebSocket(
        `${useAppConfig.getState().wsURL!}?access_token=${
          useAccessStore.getState().token
        }`,
      ),
  });
};

export const cleanWSClient = () => {
  if (client) {
    client.disconnect();
    client.removeAllListeners();

    client = undefined;
  }
};
