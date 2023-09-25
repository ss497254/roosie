import { useState } from "react";
import { IconButton } from "src/ui";
import { useMobileScreen } from "src/hooks/useMobileScreen";
import { useScrollToBottom } from "src/hooks/useScrollToBottom";
import { useAppConfig } from "src/store";
import { getChannelStore } from "src/store/channel";
import { useDebouncedCallback } from "use-debounce";
import { ChatAction } from "./ChatAction";
import { MessageInput } from "./MessageInput";
import { MessagesContainer } from "./MessagesContainer";
import styles from "./chat.module.scss";
import { SidebarOpenBtn } from "../SidebarOpenBtn";

import BottomIcon from "src/icons/bottom.svg";
import BreakIcon from "src/icons/break.svg";
import MaxIcon from "src/icons/max.svg";
import MinIcon from "src/icons/min.svg";
import ResetIcon from "src/icons/reload.svg";

function ChatActions(props: {
  scrollToBottom: () => void;
  hitBottom: boolean;
}) {
  return (
    <div className="absolute right-3 -top-11 bg-transparent">
      {!props.hitBottom && (
        <ChatAction
          onClick={props.scrollToBottom}
          text="To Latest"
          icon={<BottomIcon />}
        />
      )}

      <ChatAction
        text="Clear context"
        icon={<BreakIcon />}
        onClick={() => {}}
      />
    </div>
  );
}

export const ChannelChat = ({ channel }: { channel: string }) => {
  const config = useAppConfig();
  const store = getChannelStore(channel);
  const totalMessages = store((state) => state.totalMessages);
  const clearMessages = store((state) => state.clearMessages);

  const { scrollRef, setAutoScroll, scrollDomToBottom } =
    useScrollToBottom(channel);

  const [hitBottom, setHitBottom] = useState(true);
  const isMobileScreen = useMobileScreen();

  const showMaxIcon = !isMobileScreen;

  const onChatBodyScroll = useDebouncedCallback(
    (e: HTMLElement) => {
      const bottomHeight = e.scrollTop + e.clientHeight;

      const isHitBottom =
        bottomHeight >= e.scrollHeight - (isMobileScreen ? 0 : 10);

      setHitBottom(isHitBottom);
      setAutoScroll(isHitBottom);
    },
    100,
    {
      leading: true,
      trailing: true,
    },
  );

  return (
    <div className={styles.chat}>
      <div className="window-header">
        <div className={`window-header-title ${styles["chat-body-title"]}`}>
          <div
            className={`window-header-main-title ${styles["chat-body-main-title"]}`}
          >
            {channel}
          </div>
          <div className="window-header-sub-title">
            {totalMessages} messages
          </div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <IconButton bordered icon={<ResetIcon />} onClick={clearMessages} />
          </div>
          <div className="window-action-button">
            {showMaxIcon && (
              <IconButton
                bordered
                icon={config.tightBorder ? <MinIcon /> : <MaxIcon />}
                onClick={() => {
                  config.update(
                    (config) => (config.tightBorder = !config.tightBorder),
                  );
                }}
              />
            )}
          </div>
          <div className="window-action-button">
            <SidebarOpenBtn />
          </div>
        </div>
      </div>

      <div
        className={styles["chat-body"]}
        ref={scrollRef}
        onScroll={(e) => onChatBodyScroll(e.currentTarget)}
      >
        <MessagesContainer channel={channel} />
      </div>
      <div className="relative">
        <ChatActions scrollToBottom={scrollDomToBottom} hitBottom={hitBottom} />
        <MessageInput channel={channel} />
      </div>
    </div>
  );
};
