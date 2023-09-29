import Router from "next/router";
import { useChatStore, useMaskStore } from "src/store";
import { IconButton, ListItem, Modal, showConfirm } from "src/ui";
import { MaskConfig } from "../Mask";

import CopyIcon from "src/icons/copy.svg";
import ResetIcon from "src/icons/reload.svg";

export function SessionConfigModel(props: { onClose: () => void }) {
  const chatStore = useChatStore();
  const session = chatStore.currentSession();
  const maskStore = useMaskStore();

  return (
    <div className="modal-mask">
      <Modal
        title="Current Chat Settings"
        onClose={() => props.onClose()}
        actions={[
          <IconButton
            key="reset"
            icon={<ResetIcon />}
            bordered
            text="Reset to Default"
            onClick={async () => {
              if (
                await showConfirm(
                  "Resetting will clear the current conversation history and historical memory. Are you sure you want to reset?",
                )
              ) {
                chatStore.updateCurrentSession(
                  (session) => (session.memoryPrompt = ""),
                );
              }
            }}
          />,
          <IconButton
            key="copy"
            icon={<CopyIcon />}
            bordered
            text="Save as Mask"
            onClick={() => {
              Router.push("/m");
              setTimeout(() => {
                maskStore.create(session.mask);
              }, 500);
            }}
          />,
        ]}
      >
        <MaskConfig
          mask={session.mask}
          updateMask={(updater) => {
            const mask = { ...session.mask };
            updater(mask);
            chatStore.updateCurrentSession((session) => (session.mask = mask));
          }}
          extraListItems={
            session.mask.modelConfig.sendMemory ? (
              <ListItem
                title={`Memory Prompt (${session.lastSummarizeIndex} of ${session.messages.length})`}
                subTitle={session.memoryPrompt || "Nothing yet."}
              ></ListItem>
            ) : undefined
          }
        />
      </Modal>
    </div>
  );
}
