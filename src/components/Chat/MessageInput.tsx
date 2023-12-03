import React, { useEffect, useRef, useState } from "react";
import { getChannelStore } from "src/store/channel";
import { IconButton } from "src/ui/Buttons/IconButton";
import { ExpandingTextArea } from "./ExpandingTextarea";
import { ImageSelect } from "./ImageSelect";

import CameraIcon from "src/icons/camera.svg";
import SendWhiteIcon from "src/icons/send-white.svg";

interface Props {
  channel: string;
}

export const MessageInput: React.FC<Props> = ({ channel }) => {
  const [imageSelectOpen, setImageSelectOpen] = useState(false);
  const [sendMessage, isSubmitting] = getChannelStore(channel)((state) => [
    state.sendMessage,
    state.isSubmitting,
  ]);

  const ref = useRef<HTMLDivElement>(null);
  const isRunning = useRef(false);

  const onSubmit = async () => {
    if (isSubmitting || isRunning.current) return;

    isRunning.current = true;
    await sendMessage(ref.current?.innerText || "(empty)");
    isRunning.current = false;

    if (ref.current) {
      ref.current.innerText = "";
      ref.current.focus();
    }
  };

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const fn = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSubmit();
      }
    };

    element.addEventListener("keydown", fn);
    return () => element.removeEventListener("keydown", fn);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [channel]);

  return (
    <div className="flex items-end p-3 pr-4 border-t-light space-x-2 md:space-x-3">
      {imageSelectOpen && (
        <ImageSelect onClose={() => setImageSelectOpen(false)} />
      )}
      <ExpandingTextArea ref={ref} />
      <div className="space-y-2">
        <IconButton
          size={36}
          onClick={() => setImageSelectOpen(true)}
          loading={imageSelectOpen}
          className="!p-2 duration-200"
        >
          <CameraIcon />
        </IconButton>
        <IconButton
          size={36}
          onClick={isSubmitting ? undefined : onSubmit}
          loading={isSubmitting}
          className="!p-2 duration-200"
        >
          <SendWhiteIcon size={24} />
        </IconButton>
      </div>
    </div>
  );
};
