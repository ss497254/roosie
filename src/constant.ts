export const isServer = typeof window === "undefined";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
export const __prod__ = process.env.NODE_ENV === "production";

export enum SlotID {
  AppBody = "app-body",
}

export enum FileName {
  Masks = "masks.json",
  Prompts = "prompts.json",
}

export const MAX_SIDEBAR_WIDTH = 500;
export const MIN_SIDEBAR_WIDTH = 230;
export const NARROW_SIDEBAR_WIDTH = 100;

export const ACCESS_CODE_PREFIX = "nk-";

export const LAST_INPUT_KEY = "last-input";
export const UNFINISHED_INPUT = (id: string) => "unfinished-input-" + id;

export const REQUEST_TIMEOUT_MS = 60000;

export const EXPORT_MESSAGE_CLASS_NAME = "export-markdown";

export const OpenaiPath = {
  ChatPath: "v1/chat/completions",
  UsagePath: "dashboard/billing/usage",
  SubsPath: "dashboard/billing/subscription",
  ListModelPath: "v1/models",
};

export const DEFAULT_INPUT_TEMPLATE = `{{input}}`; // input / time / model / lang
export const DEFAULT_SYSTEM_TEMPLATE = `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2021-09
Current model: {{model}}
Current time: {{time}}`;

export const SUMMARIZE_MODEL = "gpt-3.5-turbo";

export const DEFAULT_MODELS = [
  {
    name: "gpt-4",
    available: true,
  },
  {
    name: "gpt-4-0314",
    available: true,
  },
  {
    name: "gpt-4-0613",
    available: true,
  },
  {
    name: "gpt-4-32k",
    available: true,
  },
  {
    name: "gpt-4-32k-0314",
    available: true,
  },
  {
    name: "gpt-4-32k-0613",
    available: true,
  },
  {
    name: "gpt-3.5-turbo",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-0301",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-0613",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-16k",
    available: true,
  },
  {
    name: "gpt-3.5-turbo-16k-0613",
    available: true,
  },
] as const;

export const CHAT_PAGE_SIZE = 15;

export const PrimaryColorPallete: Record<string, string> = {
  Emerald: "#059669",
  Teal: "#14b8a6",
  Cyan: "#06b6d4",
  Sky: "#0ea5e9",
  Blue: "#3b82f6",
  Indigo: "#6366f1",
  Pink: "#ec4899",
  Rose: "#f43f5e",
};

export const SecondaryColorPallete: Record<string, string> = {
  Emerald: "#d1fae5",
  Teal: "#ccfbf1",
  Sky: "#e0f2fe",
  Blue: "#dbeafe",
  Indigo: "#e0e7ff",
  Purple: "#f3e8ff",
  Violet: "#ede9fe",
  Pink: "#fce7f3",
};
