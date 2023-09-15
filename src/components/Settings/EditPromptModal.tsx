import { Input, Modal } from "src/ui";

import { IconButton } from "../button";

import { usePromptStore } from "src/store/prompt";

export function EditPromptModal(props: { id: string; onClose: () => void }) {
  const promptStore = usePromptStore();
  const prompt = promptStore.get(props.id);

  return prompt ? (
    <div className="modal-mask">
      <Modal
        title="Edit Prompt"
        onClose={props.onClose}
        actions={[
          <IconButton key="" onClick={props.onClose} text="Confirm" bordered />,
        ]}
      >
        <div className="flex flex-col">
          <input
            type="text"
            value={prompt.title}
            readOnly={!prompt.isUser}
            className="max-w-[unset] mb-5"
            onInput={(e) =>
              promptStore.update(
                props.id,
                (prompt) => (prompt.title = e.currentTarget.value),
              )
            }
          ></input>
          <Input
            value={prompt.content}
            readOnly={!prompt.isUser}
            className="max-w-[unset]"
            rows={10}
            onInput={(e) =>
              promptStore.update(
                props.id,
                (prompt) => (prompt.content = e.currentTarget.value),
              )
            }
          ></Input>
        </div>
      </Modal>
    </div>
  ) : null;
}
