import Link from "next/link";
import Router from "next/router";
import { useState } from "react";
import { Path } from "src/constant";
import { useDragSideBar } from "src/hooks/useDragSidebar";
import { useHotKey } from "src/hooks/useHotKey";
import LightIcon from "src/icons/light.svg";
import { Theme, useAppConfig, useChatStore } from "src/store";
import { IconButton } from "./button";
import { ChatList, ChannelChatList } from "./chat-list";

import AddIcon from "src/icons/add.svg";
import AutoIcon from "src/icons/auto.svg";
import DarkIcon from "src/icons/dark.svg";
import DragIcon from "src/icons/drag.svg";
import MaskIcon from "src/icons/mask.svg";
import ChannelsIcon from "src/icons/chat.svg";
import SettingsIcon from "src/icons/settings.svg";
import { WSClientStatus } from "./WSClientStatus";

export type ChatTypes = "Masks" | "Channels";

export function SideBar(props: { className?: string }) {
  const chatStore = useChatStore();
  const [chatType, setChatType] = useState<ChatTypes>("Masks");

  const { onDragMouseDown, shouldNarrow } = useDragSideBar();
  const config = useAppConfig();
  const theme = config.theme;

  useHotKey();

  return (
    <div
      className={`sidebar ${props.className} ${
        shouldNarrow && "narrow-sidebar"
      }`}
    >
      <div className="relative my-5">
        <div className="sidebar-title">Chatoor</div>
        <div className="sidebar-sub-title">Your all time partner.</div>
        <div
          className={[
            shouldNarrow
              ? "relative flex justify-center"
              : "absolute right-0 top-0",
            "no-dark",
          ].join(" ")}
        >
          <WSClientStatus compact={shouldNarrow} />
        </div>
      </div>

      <div className="sidebar-header-bar">
        <IconButton
          icon={<MaskIcon />}
          text={shouldNarrow ? undefined : "Mask"}
          className="sidebar-bar-button"
          type={chatType === "Masks" ? "highlight" : undefined}
          onClick={() => {
            Router.push("/");
            setChatType("Masks");
          }}
          shadow
        />
        <IconButton
          icon={<ChannelsIcon />}
          text={shouldNarrow ? undefined : "Channels"}
          className="sidebar-bar-button"
          type={chatType === "Channels" ? "highlight" : undefined}
          onClick={() => setChatType("Channels")}
          shadow
        />
      </div>

      <div className="flex-grow overflow-x-hidden">
        {chatType === "Masks" ? (
          <ChatList narrow={shouldNarrow} />
        ) : (
          <ChannelChatList narrow={shouldNarrow} />
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
          <div className="flex-grow" />
          {chatType === "Masks" && (
            <div>
              <IconButton
                icon={<AddIcon />}
                text={shouldNarrow ? undefined : "New Chat"}
                onClick={() => {
                  if (config.dontShowMaskSplashScreen) {
                    chatStore.newSession();
                    Router.push(Path.Chat);
                  } else {
                    Router.push(Path.NewChat);
                  }
                }}
                shadow
              />
            </div>
          )}
        </div>
      </div>

      <div className="sidebar-drag" onMouseDown={onDragMouseDown as any}>
        <DragIcon />
      </div>
    </div>
  );
}
