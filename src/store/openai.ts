import { decrypt, encrypt } from "src/utils/crypto";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface OpenaiStore {
  openaiKey?: string;
  setOpenaiKey: (key: string) => void;
}

export const useOpenaiConfig = create<OpenaiStore>()(
  persist(
    (set) => ({
      setOpenaiKey: (openaiKey) => set({ openaiKey }),
    }),
    {
      name: "arxd-config-store",
      storage: createJSONStorage(() => localStorage, {
        replacer(key, value) {
          if (key === "openaiKey" && typeof value === "string") {
            return encrypt(value.substring(3));
          }
          return value;
        },
        reviver(key, value) {
          if (key === "openaiKey" && typeof value === "string") {
            return "sk-" + decrypt(value);
          }
          return value;
        },
      }),
    },
  ),
);
