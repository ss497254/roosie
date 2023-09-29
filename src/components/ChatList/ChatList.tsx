import { useChatStore } from "src/store";
import { ChatItem } from "./ChatItem";
import Router from "next/router";

export function ChatList(props: { narrow?: boolean }) {
  const { selectSession, sessions, currentSessionIndex, deleteSession } =
    useChatStore();

  return (
    <div className="chat-list animate-slide-in-top">
      {sessions.map((item, idx) => (
        <ChatItem
          title={item.topic}
          time={new Date(item.lastUpdate).toLocaleString()}
          count={item.messages.length}
          key={item.id}
          onDelete={() => deleteSession(idx)}
          selected={idx === currentSessionIndex}
          onClick={() => {
            Router.push(`/m/${item.id}`);
            selectSession(idx);
          }}
          narrow={props.narrow}
          mask={item.mask}
        />
      ))}
    </div>
  );
}
