import { Mask } from "src/store";
import { MaskAvatar } from "../Mask";

export function ChatItem(props: {
  onClick?: () => void;
  onDelete?: () => void;
  title: string;
  count: number;
  time: string;
  selected: boolean;
  narrow?: boolean;
  mask?: Mask;
}) {
  return (
    <div
      title={`${props.title}\n${props.count} messages`}
      className={`chat-item ${props.selected && "chat-item-selected"}`}
      onClick={props.onClick}
    >
      {props.narrow ? (
        <div className="chat-item-narrow">
          <div className="chat-item-avatar no-dark">
            {props.mask ? <MaskAvatar mask={props.mask} /> : props.title[0]}
          </div>
          <div className="chat-item-narrow-count">{props.count}</div>
        </div>
      ) : (
        <>
          <div className="chat-item-title">{props.title}</div>
          <div className="chat-item-info">
            {props.count && (
              <div className="chat-item-detail">{props.count} messages</div>
            )}
            <div className="chat-item-date">{props.time}</div>
          </div>
        </>
      )}
    </div>
  );
}
