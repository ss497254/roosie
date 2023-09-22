import { ModelType } from "src/store";

import BotIcon from "src/icons/bot.svg";
import BlackBotIcon from "src/icons/black-bot.svg";

export function Avatar({ size, model }: { model?: ModelType; size?: number }) {
  return (
    <div className="no-dark">
      {model?.startsWith("gpt-4") ? (
        <BlackBotIcon
          className="c border-light card-shadow rounded-lg"
          style={{ size }}
        />
      ) : (
        <BotIcon
          className="c border-light card-shadow rounded-lg"
          style={{ size }}
        />
      )}
    </div>
  );
}
