import Router, { useRouter } from "next/router";
import { useAccessStore } from "src/store";
import { ChatItem } from "./ChatItem";

export function ChannelChatList(props: { narrow?: boolean }) {
  const router = useRouter();
  const channels = useAccessStore((state) => state.channels!);

  return (
    <div className="chat-list animate-slide-in-top">
      {channels.map((item, idx) => (
        <ChatItem
          key={idx}
          title={item.name}
          time={new Date(item.lastUpdate).toLocaleString()}
          selected={router.query?.channel === item.name}
          count={item.messages}
          narrow={props.narrow}
          onClick={() => Router.push(`/c/${item.name}`)}
        />
      ))}
    </div>
  );
}
