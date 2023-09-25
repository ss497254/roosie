/* eslint-disable @next/next/no-img-element */
import { DEFAULT_MASK_AVATAR } from "src/store";
import { Avatar } from "../Avatar";

import BotIcon from "src/icons/bot.png";

export function ExportAvatar(props: { avatar: string }) {
  if (props.avatar === DEFAULT_MASK_AVATAR) {
    return (
      <img
        src={BotIcon.src}
        width={30}
        height={30}
        alt="bot"
        className="c border-light card-shadow rounded-xl"
      />
    );
  }

  return <Avatar />;
}
