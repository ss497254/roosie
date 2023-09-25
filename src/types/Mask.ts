import { ModelConfig } from "../store";
import { type Mask } from "../store/mask";

export type BuiltinMask = Omit<Mask, "id" | "modelConfig"> & {
  builtin: Boolean;
  modelConfig: Partial<ModelConfig>;
};

export type Updater<T> = (updater: (value: T) => void) => void;
