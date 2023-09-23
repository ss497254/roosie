import { Mask, DEFAULT_MASK_AVATAR } from "src/store";
import { Avatar } from "../Avatar";

export function MaskAvatar(props: { mask: Mask }) {
  return props.mask.avatar !== DEFAULT_MASK_AVATAR ? (
    <Avatar />
  ) : (
    <Avatar model={props.mask.modelConfig.model} />
  );
}
