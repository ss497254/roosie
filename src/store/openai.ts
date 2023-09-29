import { create } from "zustand";

interface OpenaiStore {
  openaiKey?: string;
  setOpenaiKey: (key: string) => void;
}

export const useOpenaiConfig = create<OpenaiStore>()((set) => ({
  setOpenaiKey: (openaiKey) => set({ openaiKey }),
}));
