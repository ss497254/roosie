import { EventEmitter2 } from "eventemitter2";
import { IUser } from "src/types/IUser";
import { StoreApi, UseBoundStore, create } from "zustand";

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

export interface State {
  status: string;
  error?: string;
}

export class WebSocketClient<T extends Connection> extends EventEmitter2 {
  private token: string;
  user: IUser;
  connection?: T;
  store: UseBoundStore<StoreApi<State>>;
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

    this.store = create<State>(() => ({ status: "" }));
    this.token = token;
    this.user = user;
    this.retryOnFail = retryOnFail;
    this.getConnection = getConnection;
  }

  getStore() {
    return this.store;
  }

  async connect() {
    if (this.isConnecting || this.connection) return;

    try {
      this.isConnecting = true;
      this.store.setState({ status: "connecting" });

      this.connection = this.getConnection(this.token);
      this.isConnecting = false;
      this.isResolving = false;
      this.store.setState({ status: "resolving" });

      this.connection.onmessage = this.onmessage.bind(this);
      this.connection.onerror = this.onerror.bind(this);
      this.connection.onclose = this.onclose.bind(this);
    } catch (e: any) {
      this.store.setState({
        status: "failed",
        error: JSON.stringify({ ...e }),
      });
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

  private onmessage: NonNullable<Connection["onmessage"]> = (e) => {
    if (!this.isResolving) {
      this.isResolving = true;
      this.store.setState({ status: "connected" });
    }

    if (typeof e.data === "string") {
      const { type, ...data } = JSON.parse(e.data);

      this.emit(type, data);
    } else console.warn(`invalid event data type ${typeof e.data}`);
  };

  private onerror: NonNullable<Connection["onerror"]> = (e) => {
    console.log("error", e);

    this.store.setState({ status: "error", error: JSON.stringify({ ...e }) });
    if (this.retryOnFail) this.reconnect();
  };

  private onclose: NonNullable<Connection["onclose"]> = (e) => {
    console.log("close", e);

    this.store.setState({ status: "closed", error: JSON.stringify({ ...e }) });
    if (this.retryOnFail) this.reconnect();
  };
}
