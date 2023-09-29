import { IChannel } from "src/types/IChannel";
import styles from "./home.module.scss";

type Props = {
  channel: IChannel;
  onClick?: () => void;
};

export function ChannelItem({ channel, onClick }: Props) {
  return (
    <div className={styles["channel"]} onClick={onClick}>
      <div className="text-sm one-line">{channel.name}</div>
    </div>
  );
}
