import { nanoid } from "nanoid";
import { create } from "zustand";
import { BUILTIN_MASKS } from "../masks";
import { ChatMessage, DEFAULT_TOPIC } from "./chat";
import { ModelConfig, useAppConfig } from "./config";

export type Mask = {
  id: string;
  createdAt: number;
  avatar: string;
  name: string;
  hideContext?: boolean;
  context: ChatMessage[];
  syncGlobalConfig?: boolean;
  modelConfig: ModelConfig;
  builtin: boolean;
};

export const DEFAULT_MASK_STATE = {
  masks: {} as Record<string, Mask>,
};

export type MaskState = typeof DEFAULT_MASK_STATE;
type MaskStore = MaskState & {
  create: (mask?: Partial<Mask>) => Mask;
  update: (id: string, updater: (mask: Mask) => void) => void;
  delete: (id: string) => void;
  search: (text: string) => Mask[];
  get: (id?: string) => Mask | null;
  getAll: () => Mask[];
};

export const DEFAULT_MASK_AVATAR = "gpt-bot";
export const createEmptyMask = () =>
  ({
    id: nanoid(),
    avatar: DEFAULT_MASK_AVATAR,
    name: DEFAULT_TOPIC,
    context: [],
    syncGlobalConfig: true, // use global config as default
    modelConfig: { ...useAppConfig.getState().modelConfig },

    builtin: false,
    createdAt: Date.now(),
  }) as Mask;

export const useMaskStore = create<MaskStore>()((set, get) => ({
  ...DEFAULT_MASK_STATE,

  create(mask) {
    const masks = get().masks;
    const id = nanoid();
    masks[id] = {
      ...createEmptyMask(),
      ...mask,
      id,
      builtin: false,
    };

    set(() => ({ masks }));

    return masks[id];
  },
  update(id, updater) {
    const masks = get().masks;
    const mask = masks[id];
    if (!mask) return;
    const updateMask = { ...mask };
    updater(updateMask);
    masks[id] = updateMask;
    set(() => ({ masks }));
  },
  delete(id) {
    const masks = get().masks;
    delete masks[id];
    set(() => ({ masks }));
  },

  get(id) {
    return get().masks[id ?? 1145141919810];
  },
  getAll() {
    const userMasks = Object.values(get().masks).sort(
      (a, b) => b.createdAt - a.createdAt,
    );
    const config = useAppConfig.getState();
    // if (config.hideBuiltinMasks) return userMasks;
    const buildinMasks = BUILTIN_MASKS.map(
      (m) =>
        ({
          ...m,
          modelConfig: {
            ...config.modelConfig,
            ...m.modelConfig,
          },
        }) as Mask,
    );

    return userMasks.concat(buildinMasks);
  },
  search(text) {
    return Object.values(get().masks);
  },
}));
