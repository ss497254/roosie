import React, { useEffect } from "react";
import { useAccessStore } from "src/store";
import { getChannelStore } from "src/store/channel";
import { BlockButton } from "src/ui/Buttons";
import { Spinner } from "src/ui/Spinner";
import { MessageBox } from "./MessageBox";

interface MessagesContainerProps extends React.PropsWithChildren {
  channel: string;
}

export const MessagesContainer: React.FC<MessagesContainerProps> = ({
  channel,
}) => {
  return (
    <div className="flex-grow overflow-auto">
      <OldMessagesList channel={channel} />
      <NewMessagesList channel={channel} />
    </div>
  );
};

export const OldMessagesList: React.FC<{ channel: string }> = ({ channel }) => {
  const { username } = useAccessStore((state) => state.user!);
  const store = getChannelStore(channel);
  const isLoading = store((state) => state.isLoading);
  const oldMessages = store((state) => state.oldMessages);
  const loadOldMessages = store((state) => state.loadOldMessages);

  useEffect(() => {
    if (oldMessages.length === 0) loadOldMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadOldMessages]);

  return (
    <>
      <div className="c h-24">
        {isLoading ? (
          <Spinner size={30} />
        ) : (
          <BlockButton
            className="py-2 !px-4 md:!px-6 rounded-xl"
            onClick={loadOldMessages}
          >
            Load previous messages
          </BlockButton>
        )}
      </div>
      {oldMessages.map((x) => (
        <MessageBox
          key={x.timestamp}
          dir={x.username === username ? "right" : "left"}
          {...x}
        />
      ))}
    </>
  );
};

export const NewMessagesList: React.FC<{
  channel: string;
}> = ({ channel }) => {
  const { username } = useAccessStore((state) => state.user!);
  const newMessages = getChannelStore(channel)((state) => state.newMessages);

  return (
    <>
      {newMessages.map((x) => (
        <MessageBox
          key={x.timestamp}
          dir={x.username === username ? "right" : "left"}
          {...x}
        />
      ))}
    </>
  );
};
