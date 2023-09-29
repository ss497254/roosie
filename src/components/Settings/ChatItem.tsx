import { useState } from "react";
import { SearchService, useAppConfig, usePromptStore } from "src/store";
import { IconButton, List, ListItem } from "src/ui";
import { UserPromptModal } from "./UserPromptModal";

import EditIcon from "src/icons/edit.svg";

export function ChatItem() {
  const disablePromptHint = useAppConfig((state) => state.disablePromptHint);
  const updateConfig = useAppConfig((state) => state.update);
  const [shouldShowPromptModal, setShowPromptModal] = useState(false);

  const promptStore = usePromptStore();

  const builtinCount = SearchService.count.builtin;
  const customCount = promptStore.getUserPrompts().length ?? 0;

  return (
    <>
      <List>
        <ListItem
          title="Disable auto-completion"
          subTitle="Input / to trigger auto-completion"
        >
          <input
            type="checkbox"
            checked={disablePromptHint}
            onChange={(e) =>
              updateConfig(
                (config) =>
                  (config.disablePromptHint = e.currentTarget.checked),
              )
            }
          ></input>
        </ListItem>

        <ListItem
          title="Prompt List"
          subTitle={`${builtinCount} built-in, ${customCount} user-defined`}
        >
          <IconButton
            icon={<EditIcon />}
            text="Edit"
            onClick={() => setShowPromptModal(true)}
          />
        </ListItem>
      </List>

      {shouldShowPromptModal && (
        <UserPromptModal onClose={() => setShowPromptModal(false)} />
      )}
    </>
  );
}
