import { useState, useEffect } from "react";
import { SlotID } from "src/constant";
import { IChannel } from "src/types/IChannel";

export function useChannelGroup(Channels: IChannel[]) {
  const [groups, setGroups] = useState<IChannel[][]>([]);

  useEffect(() => {
    const computeGroup = () => {
      const appBody = document.getElementById(SlotID.AppBody);
      if (!appBody || Channels.length === 0) return;

      const rect = appBody.getBoundingClientRect();
      const maxWidth = rect.width;
      const maxHeight = rect.height * 0.6;
      const ChannelItemWidth = 120;
      const ChannelItemHeight = 50;

      const randomChannel = () =>
        Channels[Math.floor(Math.random() * Channels.length)];
      let ChannelIndex = 0;
      const nextChannel = () => Channels[ChannelIndex++ % Channels.length];

      const rows = Math.ceil(maxHeight / ChannelItemHeight);
      const cols = Math.ceil(maxWidth / ChannelItemWidth);

      const newGroups = new Array(rows)
        .fill(0)
        .map((_, _i) =>
          new Array(cols)
            .fill(0)
            .map((_, j) =>
              j < 1 || j > cols - 2 ? randomChannel() : nextChannel(),
            ),
        );

      setGroups(newGroups);
    };

    computeGroup();

    window.addEventListener("resize", computeGroup);
    return () => window.removeEventListener("resize", computeGroup);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return groups;
}
