import { Mask } from "src/store";
import { MaskAvatar } from "../Mask";
import styles from "./home.module.scss";

export function MaskItem(props: { mask: Mask; onClick?: () => void }) {
  return (
    <div className={styles["mask"]} onClick={props.onClick}>
      <MaskAvatar mask={props.mask} />
      <div className={styles["mask-name"] + " one-line"}>{props.mask.name}</div>
    </div>
  );
}
