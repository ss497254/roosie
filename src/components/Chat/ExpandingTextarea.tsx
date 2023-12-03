import { forwardRef } from "react";
import { TextAreaProps } from "src/ui";

export const ExpandingTextArea = forwardRef<HTMLDivElement, TextAreaProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        contentEditable
        ref={ref}
        className={[
          "whitespace-pre-wrap focus:ring-1 focus:ring-primary resize-none min-h-[80px] before:text-neutral-500 scroll-thin focus:empty:before:content-['Start_typing...'] empty:before:content-['Send_message'] max-h-[320px] border border-light px-3 py-2 rounded-lg overflow-auto w-full focus:outline-none cursor-text",
        ].join(" ")}
        {...props}
      />
    );
  },
);

ExpandingTextArea.displayName = "TextArea";
