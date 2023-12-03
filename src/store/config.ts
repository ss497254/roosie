import { LLMModel } from "src/api-client";
import { ModelType } from "src/types/Mask";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  API_URL,
  DEFAULT_INPUT_TEMPLATE,
  DEFAULT_MODELS,
  WS_URL,
} from "../constant";

export enum SubmitKey {
  Enter = "Enter",
  CtrlEnter = "Ctrl + Enter",
  ShiftEnter = "Shift + Enter",
  AltEnter = "Alt + Enter",
  MetaEnter = "Meta + Enter",
}

export enum Theme {
  Auto = "auto",
  Dark = "dark",
  Light = "light",
}

export const DEFAULT_CONFIG = {
  fontSize: 14,
  theme: Theme.Auto as Theme,
  tightBorder: true,
  primaryColor: "#10b981",
  secondaryColor: "#e0f2fe",

  submitKey: SubmitKey.ShiftEnter as SubmitKey,
  sendPreviewBubble: true,
  enableAutoGenerateTitle: true,

  disablePromptHint: false,
  apiURL: API_URL,
  wsURL: WS_URL,

  customModels: "",
  models: DEFAULT_MODELS as any as LLMModel[],

  modelConfig: {
    model: "gpt-3.5-turbo" as ModelType,
    temperature: 0.5,
    top_p: 1,
    max_tokens: 2000,
    presence_penalty: 0,
    frequency_penalty: 0,
    sendMemory: true,
    historyMessageCount: 4,
    compressMessageLengthThreshold: 1000,
    enableInjectSystemPrompts: true,
    template: DEFAULT_INPUT_TEMPLATE,
  },
};

export type ChatConfig = typeof DEFAULT_CONFIG;

export type ChatConfigStore = ChatConfig & {
  reset: () => void;
  update: (updater: (config: ChatConfig) => void) => void;
  updateValue: (key: keyof ChatConfig, value: any) => void;
  mergeModels: (newModels: LLMModel[]) => void;
  allModels: () => LLMModel[];
};

export type ModelConfig = ChatConfig["modelConfig"];

export const useAppConfig = create<ChatConfigStore>()(
  persist(
    (set, get) => ({
      ...DEFAULT_CONFIG,

      reset() {
        set(() => ({ ...DEFAULT_CONFIG }));
      },

      update(updater) {
        const config = { ...get() };
        updater(config);
        set(() => config);
      },

      updateValue(key, value) {
        set({ [key]: value });
      },

      mergeModels(newModels) {
        if (!newModels || newModels.length === 0) {
          return;
        }

        const oldModels = get().models;
        const modelMap: Record<string, LLMModel> = {};

        for (const model of oldModels) {
          model.available = false;
          modelMap[model.name] = model;
        }

        for (const model of newModels) {
          model.available = true;
          modelMap[model.name] = model;
        }

        set(() => ({
          models: Object.values(modelMap),
        }));
      },

      allModels() {
        const customModels = get()
          .customModels.split(",")
          .filter((v) => !!v && v.length > 0)
          .map((m) => ({ name: m, available: true }));

        const models = get().models.concat(customModels);
        return models;
      },
    }),
    {
      name: "app-config",
      version: 1,
    },
  ),
);
