import Link from "next/link";
import { useRouter } from "next/router";
import LightIcon from "src/icons/light.svg";
import { Theme, useAccessStore, useAppConfig } from "src/store";
import { IconButton } from "src/ui";
import { ChannelChatList, ChatList } from "./ChatList";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSidebarDrawerStore } from "src/store/sidebar";
import { WSClientStatus } from "./WSClientStatus";

import ChannelsIcon from "src/icons/chat.svg";
import CloseIcon from "src/icons/close.svg";
import DarkIcon from "src/icons/dark.svg";
import MaskIcon from "src/icons/mask.svg";
import SettingsIcon from "src/icons/settings.svg";

export function SideBar() {
  const router = useRouter();
  const { admin } = useAccessStore((state) => state.user!);
  const [isMaskRoute, setIsMaskRoute] = useState(
    window.location.pathname.startsWith("/m"),
  );

  const config = useAppConfig();
  const theme = config.theme;
  const { open, toggleOpen } = useSidebarDrawerStore();

  useEffect(() => {
    open && toggleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <div className={`sidebar [&>*]:px-5 ${open && "sidebar-show"}`}>
      <div className="f justify-between items-center mb-1 mt-5">
        <Link href="/">
          <Image alt="logo" src="/logo.png" width={40} height={40} />
        </Link>
        <WSClientStatus />
      </div>
      <div className="font-semibold text-lg">Roosie</div>
      <div className="text-sm -mt-1 mb-3">Your all time partner.</div>
      <div className="sidebar-header-bar">
        {admin && (
          <>
            <IconButton
              icon={<ChannelsIcon />}
              text="Channels"
              className="sidebar-bar-button"
              type={isMaskRoute ? undefined : "highlight"}
              onClick={() => {
                router.push("/");
                setIsMaskRoute(false);
              }}
              shadow
            />
            <IconButton
              icon={<MaskIcon />}
              text="Mask"
              className="sidebar-bar-button"
              type={isMaskRoute ? "highlight" : undefined}
              onClick={() => {
                router.push("/m");
                setIsMaskRoute(true);
              }}
              shadow
            />
          </>
        )}
      </div>

      <div className="flex-grow overflow-x-hidden">
        {isMaskRoute && admin ? <ChatList /> : <ChannelChatList />}
      </div>

      <div className="f py-5 justify-between">
        <div className="f space-x-3">
          <Link href="/settings">
            <IconButton icon={<SettingsIcon />} shadow />
          </Link>
          <IconButton
            icon={<>{theme === Theme.Light ? <LightIcon /> : <DarkIcon />}</>}
            onClick={() => {
              if (theme === Theme.Light)
                config.update((config) => (config.theme = Theme.Dark));
              else config.update((config) => (config.theme = Theme.Light));
            }}
            shadow
          />
        </div>
        {open && (
          <IconButton icon={<CloseIcon />} onClick={toggleOpen} shadow />
        )}
      </div>
    </div>
  );
}
