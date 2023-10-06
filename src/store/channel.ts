import { StoreApi, UseBoundStore, create } from "zustand";
import { IMessage } from "src/types/IMessage";
import { getWSClient } from "src/lib/ws-client-store";
import { Cfetch } from "src/utils/fetch";
import { showToast } from "src/ui";

export interface IChannelToast {
  type: "error" | "info";
  content: string;
}

export interface IMessageStore {
  newMessages: IMessage[];
  oldMessages: IMessage[];
  toasts: IChannelToast[];
  channel: string;
  isLoading: boolean;
  isSubmitting: boolean;
  totalMessages: number;
  sendMessage: (content: string) => Promise<boolean>;
  addMessage: (message: IMessage, override?: boolean) => void;
  loadOldMessages: () => Promise<void>;
  clearMessages: () => void;
}

const MessageStoreMap = new Map<
  string,
  UseBoundStore<StoreApi<IMessageStore>>
>();

export const getChannelStore = (channel: string) => {
  if (MessageStoreMap.has(channel)) return MessageStoreMap.get(channel)!;

  const client = getWSClient();

  const store = create<IMessageStore>()((set, get) => ({
    channel,
    isLoading: false,
    toasts: [],
    isSubmitting: false,
    newMessages: [],
    oldMessages: [],
    totalMessages: 0,

    sendMessage: async (content) => {
      set({ isSubmitting: true });

      try {
        const res = await Cfetch<IMessage>("/chats/send-message", {
          method: "POST",
          body: JSON.stringify({ channel, content }),
        });

        if (res.success) {
          res.data.delivering = true;
          get().addMessage(res.data);

          return true;
        }
      } catch (e: any) {
        showToast("Message not sent", {
          text: e.message || e.name,
        });
        console.warn(e);
      }

      set({ isSubmitting: false });
      return false;
    },

    addMessage: async (message, override) => {
      const { newMessages, totalMessages } = get();

      let idx = newMessages.findLastIndex(
        (m) => m.timestamp === message.timestamp,
      );

      if (idx === -1)
        return set({
          isSubmitting: false,
          newMessages: [...newMessages, message],
          totalMessages: totalMessages + 1,
        });

      if (override)
        return set({
          isSubmitting: false,
          newMessages: newMessages.map((value, _idx) => {
            if (_idx === idx) return message;
            else return value;
          }),
        });

      return set({ isSubmitting: false });
    },

    loadOldMessages: async () => {
      set({ isLoading: true });

      try {
        const { oldMessages, totalMessages } = get();
        const res = await Cfetch<IMessage[]>(
          `/chats/channels/${channel}/messages?cursor=${
            oldMessages[0]?.timestamp || new Date().getTime()
          }`,
        );

        if (res.success) {
          return set({
            isLoading: false,
            oldMessages: res.data.reverse().concat(oldMessages),
            totalMessages: totalMessages + res.data.length,
          });
        }
      } catch (e: any) {
        showToast("Unable to load messages", {
          text: e.message || e.name,
        });
        console.warn(e);
      }

      set({ isLoading: false });
    },

    clearMessages: () =>
      set({
        newMessages: [],
        oldMessages: [],
        isSubmitting: false,
        isLoading: false,
        totalMessages: 0,
      }),
  }));

  client.addListener(channel, ({ message }) => {
    store.getState().addMessage(message, true);
  });

  MessageStoreMap.set(channel, store);

  return store;
};
