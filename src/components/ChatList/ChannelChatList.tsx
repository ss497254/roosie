import Router, { useRouter } from "next/router";
import { IChannel } from "src/types/IChannel";
import { ResponseType } from "src/types/ResposeType";
import { Spinner } from "src/ui/Spinner";
import useSWRImmutable from "swr/immutable";
import { ChatItem } from "./ChatItem";

export function ChannelChatList(props: { narrow?: boolean }) {
  const {
    isLoading,
    data: response,
    error,
  } = useSWRImmutable<ResponseType<IChannel[]>>("/chats/channels");
  const router = useRouter();

  if (isLoading || error)
    return (
      <div className="h-full c">
        {isLoading ? <Spinner size={24} /> : error.toString()}
      </div>
    );

  if (!response || !response.success || !Array.isArray(response.data))
    return <div>There is some error in loading channels</div>;

  return (
    <div className="chat-list animate-slide-in-top">
      {response.data.map((item, idx) => (
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
