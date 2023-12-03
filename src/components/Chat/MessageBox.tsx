import { IMessage } from "src/types/IMessage";
import React from "react";
import { ImagePreview } from "./ImagePreview";

interface props extends IMessage {
  dir: "left" | "right";
}

const dirClassNames = {
  left: "mr-auto rounded-tl-none",
  right: "ml-auto rounded-tr-none",
};

export const MessageBox: React.FC<props> = ({
  content,
  dir,
  timestamp,
  username,
  delivering,
  image,
}) => {
  return (
    <div
      className={[
        "w-[90%] md:w-[80%] max-w-3xl p-3 whitespace-pre-wrap bg-box my-2 relative rounded-lg outline-none border-light dark:text-neutral-50",
        dirClassNames[dir],
      ].join(" ")}
    >
      {image && <ImagePreview src={image} />}
      <p className="overflow-x-hidden text-sm hover:break-words text-ellipsis">
        {content}
      </p>
      <div className="mt-3 -mb-1 flex">
        <div className="flex-grow font-medium">
          {dir === "left" ? username : delivering ? "✔" : "✔✔"}
        </div>
        {new Date(timestamp).toLocaleString()}
      </div>
    </div>
  );
};
