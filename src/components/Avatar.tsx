/* eslint-disable @next/next/no-img-element */
import { ModelType } from "src/store";

import React from "react";
import BlackBotIcon from "src/icons/black-bot.svg";
import BotIcon from "src/icons/bot.svg";

interface Props extends React.HTMLAttributes<HTMLElement> {
  model?: ModelType;
  size?: number;
  src?: string;
}

export function Avatar({ size, model, src, ...props }: Props) {
  return (
    <div className="no-dark">
      {src ? (
        <img src={src} height={size} width={size} alt="image" {...props} />
      ) : model?.startsWith("gpt-4") ? (
        <BlackBotIcon
          className="c border-light card-shadow rounded-lg"
          style={{ height: size, width: size }}
          {...props}
        />
      ) : (
        <BotIcon
          className="c border-light card-shadow rounded-lg"
          style={{ height: size, width: size }}
          {...props}
        />
      )}
    </div>
  );
}
