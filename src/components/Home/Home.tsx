import Router from "next/router";
import { useEffect, useRef } from "react";
import { useAccessStore } from "src/store";
import { Avatar } from "../Avatar";
import { SidebarOpenBtn } from "../SidebarOpenBtn";
import styles from "./home.module.scss";

import { ChannelItem } from "./ChannelItem";
import { useChannelGroup } from "./useChannelGroup";

export function Home() {
  const channels = useAccessStore((state) => state.channels!);
  const groups = useChannelGroup(channels);

  const channelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (channelRef.current) {
      channelRef.current.scrollLeft =
        (channelRef.current.scrollWidth - channelRef.current.clientWidth) / 2;
    }
  }, [groups]);

  return (
    <div className="h-full flex flex-col items-center justify-end relative bg-gradient-to-b from-white to-neutral-700/20 dark:to-neutral-800">
      <div className={styles["header"]}>
        <SidebarOpenBtn />
      </div>
      <div className={styles["cards"]}>
        <div className={styles["card"]}>
          <Avatar size={50} src="/images/girl-1.png" />
        </div>
        <div className={styles["card"]}>
          <Avatar size={50} src="/logo.png" />
        </div>
        <div className={styles["card"]}>
          <Avatar size={50} src="/images/girl-2.png" />
        </div>
      </div>

      <div className={styles["title"]}>Pick a Channel</div>
      <div className={styles["sub-title"]}>and start chatting.</div>

      <div className={styles["channels"]} ref={channelRef}>
        {groups.map((channels, i) => (
          <div key={i} className={styles["channel-row"]}>
            {channels.map((channel, index) => (
              <ChannelItem
                key={index}
                channel={channel}
                onClick={() =>
                  setTimeout(() => {
                    Router.push(`/c/${channel.name}`);
                  }, 10)
                }
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
