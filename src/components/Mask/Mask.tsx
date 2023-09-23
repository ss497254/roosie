import Router from "next/router";
import { useState } from "react";
import { FileName } from "src/constant";
import { BUILTIN_MASK_STORE } from "src/masks";
import { useChatStore } from "src/store";
import { Mask, useMaskStore } from "src/store/mask";
import { Modal, showConfirm } from "src/ui";
import { downloadAs, readFromFile } from "src/utils";
import { IconButton } from "../../ui/IconButtonWithText";
import { ErrorBoundary } from "../ErrorBoundary";
import { SidebarOpenBtn } from "../SidebarOpenBtn";
import { MaskAvatar } from "./MaskAvatar";
import { MaskConfig } from "./MaskConfig";
import styles from "./mask.module.scss";

import AddIcon from "src/icons/add.svg";
import CopyIcon from "src/icons/copy.svg";
import DeleteIcon from "src/icons/delete.svg";
import DownloadIcon from "src/icons/download.svg";
import EditIcon from "src/icons/edit.svg";
import EyeIcon from "src/icons/eye.svg";
import UploadIcon from "src/icons/upload.svg";

export function MaskPage() {
  const maskStore = useMaskStore();
  const chatStore = useChatStore();

  const allMasks = maskStore.getAll();

  const [searchMasks, setSearchMasks] = useState<Mask[]>([]);
  const [searchText, setSearchText] = useState("");
  const masks = searchText.length > 0 ? searchMasks : allMasks;

  // simple search, will refactor later
  const onSearch = (text: string) => {
    text = text.toLowerCase();
    setSearchText(text);
    if (text.length > 0) {
      const result = allMasks.filter((m) =>
        m.name.toLowerCase().includes(text),
      );
      setSearchMasks(result);
    } else {
      setSearchMasks(allMasks);
    }
  };

  const [editingMaskId, setEditingMaskId] = useState<string | undefined>();
  const editingMask =
    maskStore.get(editingMaskId) ?? BUILTIN_MASK_STORE.get(editingMaskId);
  const closeMaskModal = () => setEditingMaskId(undefined);

  const downloadAll = () => {
    downloadAs(JSON.stringify(masks), FileName.Masks);
  };

  const importFromFile = () => {
    readFromFile().then((content) => {
      try {
        const importMasks = JSON.parse(content);
        if (Array.isArray(importMasks)) {
          for (const mask of importMasks) {
            if (mask.name) {
              maskStore.create(mask);
            }
          }
          return;
        }
        //if the content is a single mask.
        if (importMasks.name) {
          maskStore.create(importMasks);
        }
      } catch {}
    });
  };

  return (
    <ErrorBoundary>
      <div className={styles["mask-page"]}>
        <div className="window-header">
          <div className="window-header-title">
            <div className="window-header-main-title">Prompt Template</div>
            <div className="window-header-submai-title">
              {allMasks.length} prompt templates
            </div>
          </div>

          <div className="window-actions">
            <div className="window-action-button">
              <IconButton
                icon={<DownloadIcon />}
                bordered
                onClick={downloadAll}
              />
            </div>
            <div className="window-action-button">
              <IconButton
                icon={<UploadIcon />}
                bordered
                onClick={() => importFromFile()}
              />
            </div>
            <div className="window-action-button">
              <SidebarOpenBtn />
            </div>
          </div>
        </div>

        <div className={styles["mask-page-body"]}>
          <div className={styles["mask-filter"]}>
            <input
              type="text"
              className={styles["search-bar"]}
              placeholder="Search templates"
              autoFocus
              onInput={(e) => onSearch(e.currentTarget.value)}
            />

            <IconButton
              className={styles["mask-create"]}
              icon={<AddIcon />}
              text="Create"
              bordered
              onClick={() => {
                const createdMask = maskStore.create();
                setEditingMaskId(createdMask.id);
              }}
            />
          </div>

          <div>
            {masks.map((m) => (
              <div className={styles["mask-item"]} key={m.id}>
                <div className={styles["mask-header"]}>
                  <div className={styles["mask-icon"]}>
                    <MaskAvatar mask={m} />
                  </div>
                  <div className={styles["mask-title"]}>
                    <div className={styles["mask-name"]}>{m.name}</div>
                    <div className={styles["mask-info"] + " one-line"}>
                      {`${m.context.length} / ${m.modelConfig.model}`}
                    </div>
                  </div>
                </div>
                <div className={styles["mask-actions"]}>
                  <IconButton
                    icon={<AddIcon />}
                    text="Chat"
                    onClick={() => {
                      const { id } = chatStore.newSession(m);
                      Router.push("/m/" + id);
                    }}
                  />
                  {m.builtin ? (
                    <IconButton
                      icon={<EyeIcon />}
                      text="View"
                      onClick={() => setEditingMaskId(m.id)}
                    />
                  ) : (
                    <IconButton
                      icon={<EditIcon />}
                      text="Edit"
                      onClick={() => setEditingMaskId(m.id)}
                    />
                  )}
                  {!m.builtin && (
                    <IconButton
                      icon={<DeleteIcon />}
                      text="Delete"
                      onClick={async () => {
                        if (await showConfirm("Confirm to delete?")) {
                          maskStore.delete(m.id);
                        }
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {editingMask && (
        <div className="modal-mask">
          <Modal
            title={`Edit Prompt Template ${
              editingMask?.builtin ? "(readonly)" : ""
            }`}
            onClose={closeMaskModal}
            actions={[
              <IconButton
                icon={<DownloadIcon />}
                text="Download"
                key="export"
                bordered
                onClick={() =>
                  downloadAs(
                    JSON.stringify(editingMask),
                    `${editingMask.name}.json`,
                  )
                }
              />,
              <IconButton
                key="copy"
                icon={<CopyIcon />}
                bordered
                text="Clone"
                onClick={() => {
                  Router.push("/mask");
                  maskStore.create(editingMask);
                  setEditingMaskId(undefined);
                }}
              />,
            ]}
          >
            <MaskConfig
              mask={editingMask}
              updateMask={(updater) =>
                maskStore.update(editingMaskId!, updater)
              }
              readonly={editingMask.builtin}
            />
          </Modal>
        </div>
      )}
    </ErrorBoundary>
  );
}
