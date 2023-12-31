import { useRef, useState, useEffect } from "react";
import { getChannelStore } from "src/store/channel";

export function useScrollToBottom(channel?: string) {
  // for auto-scroll
  let newMessages;
  if (channel)
    newMessages = getChannelStore(channel)((state) => state.newMessages);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  function scrollDomToBottom() {
    const dom = scrollRef.current;
    if (dom) {
      requestAnimationFrame(() => {
        setAutoScroll(true);
        dom.scrollTo(0, dom.scrollHeight);
      });
    }
  }

  useEffect(() => {
    scrollDomToBottom();
  }, [newMessages]);

  return {
    scrollRef,
    autoScroll,
    setAutoScroll,
    scrollDomToBottom,
  };
}
