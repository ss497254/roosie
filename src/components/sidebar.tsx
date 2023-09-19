import Link from "next/link";
import { useRouter } from "next/router";
import { Path } from "src/constant";
import { useDragSideBar } from "src/hooks/useDragSidebar";
import LightIcon from "src/icons/light.svg";
import { Theme, useAppConfig } from "src/store";
import { ChannelChatList, ChatList } from "./ChatList";
import { IconButton } from "./button";

import Image from "next/image";
import AutoIcon from "src/icons/auto.svg";
import ChannelsIcon from "src/icons/chat.svg";
import DarkIcon from "src/icons/dark.svg";
import DragIcon from "src/icons/drag.svg";
import MaskIcon from "src/icons/mask.svg";
import SettingsIcon from "src/icons/settings.svg";
import { WSClientStatus } from "./WSClientStatus";

export function SideBar(props: { className?: string }) {
  const router = useRouter();
  const isChannelRoute = router.pathname.startsWith("/c");

  const { onDragMouseDown, shouldNarrow } = useDragSideBar();
  const config = useAppConfig();
  const theme = config.theme;

  return (
    <div
      className={`sidebar ${props.className} ${
        shouldNarrow && "narrow-sidebar"
      }`}
    >
      <div className="f justify-between items-center py-1">
        <Image alt="logo" src="/logo.png" width={40} height={40} />
        <WSClientStatus compact={shouldNarrow} />
      </div>
      <div className="pb-4">
        <div className="font-semibold text-lg">Roosie</div>
        <div className="text-sm -mt-1">Your all time partner.</div>
      </div>
      <div className="no-dark"></div>

      <div className="sidebar-header-bar">
        <IconButton
          icon={<MaskIcon />}
          text={shouldNarrow ? undefined : "Mask"}
          className="sidebar-bar-button"
          type={isChannelRoute ? undefined : "highlight"}
          onClick={() => router.push("/")}
          shadow
        />
        <IconButton
          icon={<ChannelsIcon />}
          text={shouldNarrow ? undefined : "Channels"}
          className="sidebar-bar-button"
          type={isChannelRoute ? "highlight" : undefined}
          onClick={() => router.push("/c")}
          shadow
        />
      </div>

      <div className="flex-grow overflow-x-hidden">
        {isChannelRoute ? (
          <ChannelChatList narrow={shouldNarrow} />
        ) : (
          <ChatList narrow={shouldNarrow} />
        )}
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
              icon={
                <>
                  {theme === Theme.Auto ? (
                    <AutoIcon />
                  ) : theme === Theme.Light ? (
                    <LightIcon />
                  ) : theme === Theme.Dark ? (
                    <DarkIcon />
                  ) : null}
                </>
              }
              onClick={() => {
                const themes = [Theme.Auto, Theme.Light, Theme.Dark];
                const themeIndex = themes.indexOf(theme);
                const nextIndex = (themeIndex + 1) % themes.length;
                const nextTheme = themes[nextIndex];
                config.update((config) => (config.theme = nextTheme));
              }}
              shadow
            />
          </div>
        </div>
      </div>

      <div className="sidebar-drag" onMouseDown={onDragMouseDown as any}>
        <DragIcon />
      </div>
    </div>
  );
}
