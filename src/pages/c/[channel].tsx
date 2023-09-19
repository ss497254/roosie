import { useRouter } from "next/router";
import { ChannelChat } from "src/components/Chat";
import { Loading } from "src/ui";

export default function Page() {
  const router = useRouter();
  const channel = router.query.channel as string;
  if (!channel) return <Loading />;

  return <ChannelChat channel={channel} />;
}
