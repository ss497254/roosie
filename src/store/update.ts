import { getApiClient } from "src/lib/api-client-store";
import { create } from "zustand";

export interface UpdateStore {
  used: number;
  subscription: number;
  lastUpdateUsage: number;

  updateUsage: (force?: boolean) => Promise<void>;
}

const ONE_MINUTE = 60 * 1000;

export const useUpdateStore = create<UpdateStore>()((set, get) => ({
  used: 0,
  subscription: 0,
  lastUpdateUsage: 0,

  async updateUsage(force = false) {
    const overOneMinute = Date.now() - get().lastUpdateUsage >= ONE_MINUTE;
    if (!overOneMinute && !force) return;

    set(() => ({
      lastUpdateUsage: Date.now(),
    }));

    try {
      const api = getApiClient();
      const usage = await api.llm.usage();

      if (usage) {
        set(() => ({
          used: usage.used,
          subscription: usage.total,
        }));
      }
    } catch (e) {
      console.error((e as Error).message);
    }
  },
}));
