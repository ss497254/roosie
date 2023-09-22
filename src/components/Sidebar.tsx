import Link from "next/link";
import { useRouter } from "next/router";
import { Path } from "src/constant";
import LightIcon from "src/icons/light.svg";
import { Theme, useAppConfig } from "src/store";
import { ChannelChatList, ChatList } from "./ChatList";
import { IconButton } from "../ui/IconButtonWithText";

import Image from "next/image";
import ChannelsIcon from "src/icons/chat.svg";
import DarkIcon from "src/icons/dark.svg";
import MaskIcon from "src/icons/mask.svg";
import CloseIcon from "src/icons/close.svg";
import SettingsIcon from "src/icons/settings.svg";
import { WSClientStatus } from "./WSClientStatus";
import { useSidebarDrawerStore } from "src/store/sidebar";
import { useEffect } from "react";

export function SideBar() {
  const router = useRouter();
  const isChannelRoute = router.pathname.startsWith("/c");

  const config = useAppConfig();
  const theme = config.theme;
  const { open, toggleOpen } = useSidebarDrawerStore();

  useEffect(() => {
    open && toggleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  return (
    <div className={`sidebar ${open && "sidebar-show"}`}>
      <div className="f justify-between items-center py-1">
        <Image alt="logo" src="/logo.png" width={40} height={40} />
        <WSClientStatus />
      </div>
      <div className="pb-4">
        <div className="font-semibold text-lg">Roosie</div>
        <div className="text-sm -mt-1">Your all time partner.</div>
      </div>

      <div className="sidebar-header-bar">
        <IconButton
          icon={<MaskIcon />}
          text="Mask"
          className="sidebar-bar-button"
          type={isChannelRoute ? undefined : "highlight"}
          onClick={() => router.push("/")}
          shadow
        />
        <IconButton
          icon={<ChannelsIcon />}
          text="Channels"
          className="sidebar-bar-button"
          type={isChannelRoute ? "highlight" : undefined}
          onClick={() => router.push("/c")}
          shadow
        />
      </div>

      <div className="flex-grow overflow-x-hidden">
        {isChannelRoute ? <ChannelChatList /> : <ChatList />}
      </div>

      <div className="sidebar-tail">
        <div className="sidebar-actions">
          <div className="sidebar-action">
            <Link href={Path.Settings}>
              <IconButton icon={<SettingsIcon />} shadow />
            </Link>
          </div>
          <div className="sidebar-action">
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
            <div className="sidebar-action ml-auto">
              <IconButton icon={<CloseIcon />} onClick={toggleOpen} shadow />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}