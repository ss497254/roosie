import { Mask, DEFAULT_MASK_AVATAR } from "src/store";
import { Avatar } from "../Avatar";

export function MaskAvatar({ mask, size }: { mask: Mask; size?: number }) {
  return mask.avatar !== DEFAULT_MASK_AVATAR ? (
    <Avatar size={size} />
  ) : (
    <Avatar model={mask.modelConfig.model} size={size} />
  );
}
