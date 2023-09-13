import { EventEmitter2 } from "eventemitter2";
import { IUser } from "src/types/IUser";

export interface Connection extends EventTarget {
  onerror: ((ev: Event) => void) | null;
  onmessage: ((ev: MessageEvent) => void) | null;
  onclose: ((ev: CloseEvent) => void) | null;
  close(code?: number, reason?: string): void;
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
}

export interface Props<T> {
  user: IUser;
  token: string;
  retryOnFail?: boolean;
  getConnection: (token: string) => T;
}

export class WebSocketClient<T extends Connection> extends EventEmitter2 {
  private token: string;
  user: IUser;
  connection?: T;
  isConnecting = false;
  isResolving = false;
  retryOnFail;
  getConnection: (token: string) => T;

  constructor({ user, token, getConnection, retryOnFail = false }: Props<T>) {
    super({
      wildcard: true,
      verboseMemoryLeak: true,
      delimiter: ".",
      newListener: true,
      removeListener: true,

      // This will ignore the "unspecified event" error
      ignoreErrors: true,
      maxListeners: 25,
    });

    this.token = token;
    this.user = user;
    this.retryOnFail = retryOnFail;
    this.getConnection = getConnection;
  }

  async connect() {
    if (this.isConnecting || this.connection) return;

    try {
      this.isConnecting = true;
      this.emit("state", "connecting");

      this.connection = this.getConnection(this.token);
      this.isConnecting = false;
      this.isResolving = false;
      this.emit("state", "resolving");

      this.connection.onmessage = this.onmessage.bind(this);
      this.connection.onerror = this.onerror.bind(this);
      this.connection.onclose = this.onclose.bind(this);
      this.addListener("send", this.sendMessage);
    } catch (e) {
      this.emit("state", "failed", e);
      this.isConnecting = false;
    }
  }

  reconnect() {
    if (this.isConnecting) return;
    if (this.connection) this.disconnect();

    this.connect();
    console.log("reconnecting");
  }

  disconnect() {
    this.connection?.close();
    this.connection = undefined;
    console.log("disconnected");
  }

  private sendMessage(data: any) {
    console.log("got data", data);
    this.connection!.send(data);
    return {
      username: "pandey",
      content: data,
      timestamp: new Date().toString(),
    };
  }

  private onmessage: NonNullable<Connection["onmessage"]> = (e) => {
    if (!this.isResolving) {
      this.isResolving = true;
      this.emit("state", "connected");
    }

    if (typeof e.data === "string") {
      const { type, ...data } = JSON.parse(e.data);

      this.emit(type, data);
    } else console.warn(`invalid event data type ${typeof e.data}`);
  };

  private onerror: NonNullable<Connection["onerror"]> = (e) => {
    this.emit("state", "error", e);
    if (this.retryOnFail) this.reconnect();
    console.log("error", e);
  };

  private onclose: NonNullable<Connection["onclose"]> = (e) => {
    this.emit("state", "closed", e);
    if (this.retryOnFail) this.reconnect();
    console.log("close", e);
  };
}
