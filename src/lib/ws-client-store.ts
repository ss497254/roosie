import { useAccessStore, useAppConfig } from "src/store";
import { WebSocketClient, Connection } from "./ws-client";

let client: WebSocketClient<Connection> | undefined;

export const getWSClient = () => {
  if (!client) throw new Error("client not intialized");

  return client;
};

export const initializeWSClient = () => {
  const { user, token } = useAccessStore.getState();
  if (client) return;

  client = new WebSocketClient({
    user: user!,
    token,
    getConnection: (token: string) =>
      new WebSocket(`${useAppConfig.getState().wsURL!}?access_token=${token}`),
  });

  client.addListener("*", console.log);
};
