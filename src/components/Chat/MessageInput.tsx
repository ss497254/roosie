import React, { useEffect, useRef } from "react";
import SendWhiteIcon from "src/icons/send-white.svg";
import { getChannelStore } from "src/store/channel";
import { IconButton } from "src/ui/Buttons/IconButton";
import { ExpandingTextArea } from "./ExpandingTextarea";

interface Props {
  channel: string;
}

export const MessageInput: React.FC<Props> = ({ channel }) => {
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
  }, []);

  return (
    <div className="flex items-end p-3 pr-4 border-t-light">
      <ExpandingTextArea ref={ref} />
      <IconButton
        size={40}
        onClick={isSubmitting ? undefined : onSubmit}
        loading={isSubmitting}
        className="!p-2 ml-3 duration-200"
      >
        <SendWhiteIcon size={24} />
      </IconButton>
    </div>
  );
};
