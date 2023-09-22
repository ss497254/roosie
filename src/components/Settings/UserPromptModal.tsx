import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { Prompt, SearchService, usePromptStore } from "src/store/prompt";
import { IconButton, Modal } from "src/ui";
import { copyToClipboard } from "src/utils";
import { EditPromptModal } from "./EditPromptModal";

import AddIcon from "src/icons/add.svg";
import ClearIcon from "src/icons/clear.svg";
import CopyIcon from "src/icons/copy.svg";
import EditIcon from "src/icons/edit.svg";
import EyeIcon from "src/icons/eye.svg";

export function UserPromptModal(props: { onClose?: () => void }) {
  const promptStore = usePromptStore();
  const userPrompts = promptStore.getUserPrompts();
  const builtinPrompts = SearchService.builtinPrompts;
  const allPrompts = userPrompts.concat(builtinPrompts);
  const [searchInput, setSearchInput] = useState("");
  const [searchPrompts, setSearchPrompts] = useState<Prompt[]>([]);
  const prompts = searchInput.length > 0 ? searchPrompts : allPrompts;

  const [editingPromptId, setEditingPromptId] = useState<string>();

  useEffect(() => {
    if (searchInput.length > 0) {
      const searchResult = SearchService.search(searchInput);
      setSearchPrompts(searchResult);
    } else {
      setSearchPrompts([]);
    }
  }, [searchInput]);

  return (
    <div className="modal-mask">
      <Modal
        title="Prompt List"
        onClose={() => props.onClose?.()}
        actions={[
          <IconButton
            key="add"
            onClick={() =>
              promptStore.add({
                id: nanoid(),
                createdAt: Date.now(),
                title: "Empty Prompt",
                content: "Empty Prompt Content",
              })
            }
            icon={<AddIcon />}
            bordered
            text="Add One"
          />,
        ]}
      >
        <div className="min-h-[40vh]">
          <input
            type="text"
            className="w-full max-w-full mb-2.5 bg-gray"
            placeholder="Search Prompts"
            value={searchInput}
            onInput={(e) => setSearchInput(e.currentTarget.value)}
          ></input>

          <div className="border-light rounded-lg">
            {prompts.map((v, _) => (
              <div
                className="flex justify-between p-2.5 border-b-light last:border-none"
                key={v.id ?? v.title}
              >
                <div className="max-w-[calc(100%-100px)]">
                  <div className="text-sm font-bold">{v.title}</div>
                  <div className="text-xs one-line">{v.content}</div>
                </div>

                <div className="flex items-center [column-gap:2px]">
                  {v.isUser && (
                    <IconButton
                      icon={<ClearIcon />}
                      className="p-1.5"
                      onClick={() => promptStore.remove(v.id!)}
                    />
                  )}
                  {v.isUser ? (
                    <IconButton
                      icon={<EditIcon />}
                      className="p-1.5"
                      onClick={() => setEditingPromptId(v.id)}
                    />
                  ) : (
                    <IconButton
                      icon={<EyeIcon />}
                      className="p-1.5"
                      onClick={() => setEditingPromptId(v.id)}
                    />
                  )}
                  <IconButton
                    icon={<CopyIcon />}
                    className="p-1.5"
                    onClick={() => copyToClipboard(v.content)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Modal>

      {editingPromptId !== undefined && (
        <EditPromptModal
          id={editingPromptId!}
          onClose={() => setEditingPromptId(undefined)}
        />
      )}
    </div>
  );
}
