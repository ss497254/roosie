import { useChatStore } from "src/store";
import { ChatItem } from "./ChatItem";
import Router from "next/router";

export function ChatList(props: { narrow?: boolean }) {
  const [sessions, selectedIndex, selectSession] = useChatStore((state) => [
    state.sessions,
    state.currentSessionIndex,
    state.selectSession,
  ]);

  return (
    <div className="chat-list animate-slide-in-top">
      {sessions.map((item, idx) => (
        <ChatItem
          title={item.topic}
          time={new Date(item.lastUpdate).toLocaleString()}
          count={item.messages.length}
          key={item.id}
          selected={idx === selectedIndex}
          onClick={() => {
            Router.push(`/chat/${item.id}`);
            selectSession(idx);
          }}
          narrow={props.narrow}
          mask={item.mask}
        />
      ))}
    </div>
  );
}
