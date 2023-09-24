import { useEffect, useRef } from "react";
import { SubmitKey, useAppConfig } from "src/store";

export function useSubmitHandler() {
  const submitKey = useAppConfig((state) => state.submitKey);
  const isComposing = useRef(false);

  useEffect(() => {
    const onCompositionStart = () => {
      isComposing.current = true;
    };
    const onCompositionEnd = () => {
      isComposing.current = false;
    };

    window.addEventListener("compositionstart", onCompositionStart);
    window.addEventListener("compositionend", onCompositionEnd);

    return () => {
      window.removeEventListener("compositionstart", onCompositionStart);
      window.removeEventListener("compositionend", onCompositionEnd);
    };
  }, []);

  const shouldSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return false;
    if (e.key === "Enter" && (e.nativeEvent.isComposing || isComposing.current))
      return false;
    return (
      (submitKey === SubmitKey.AltEnter && e.altKey) ||
      (submitKey === SubmitKey.CtrlEnter && e.ctrlKey) ||
      (submitKey === SubmitKey.ShiftEnter && e.shiftKey) ||
      (submitKey === SubmitKey.MetaEnter && e.metaKey) ||
      (submitKey === SubmitKey.Enter &&
        !e.altKey &&
        !e.ctrlKey &&
        !e.shiftKey &&
        !e.metaKey)
    );
  };

  return {
    submitKey,
    shouldSubmit,
  };
}
