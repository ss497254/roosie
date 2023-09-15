/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { IconButton } from "../components/button";

import MaxIcon from "src/icons/max.svg";
import MinIcon from "src/icons/min.svg";
import CloseIcon from "src/icons/close.svg";
import CancelIcon from "src/icons/cancel.svg";
import ConfirmIcon from "src/icons/confirm.svg";

interface ModalProps {
  title: string;
  children?: any;
  actions?: JSX.Element[];
  defaultMax?: boolean;
  onClose?: () => void;
}
export function Modal(props: ModalProps) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        props.onClose?.();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isMax, setMax] = useState(!!props.defaultMax);

  return (
    <div className={"modal-container" + ` ${isMax && "modal-container-max"}`}>
      <div className="modal-header">
        <div className="modal-title">{props.title}</div>

        <div className="modal-header-actions">
          <div className="modal-header-action" onClick={() => setMax(!isMax)}>
            {isMax ? <MinIcon /> : <MaxIcon />}
          </div>
          <div className="modal-header-action" onClick={props.onClose}>
            <CloseIcon />
          </div>
        </div>
      </div>

      <div className="modal-content">{props.children}</div>

      {props.actions && (
        <div className="modal-footer">
          <div className="modal-actions">
            {props.actions?.map((action, i) => (
              <div key={i} className="modal-action">
                {action}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function showModal(props: ModalProps) {
  const div = document.createElement("div");
  div.className = "modal-mask";
  document.body.appendChild(div);

  const root = createRoot(div);
  const closeModal = () => {
    props.onClose?.();
    root.unmount();
    div.remove();
  };

  div.onclick = (e) => {
    if (e.target === div) {
      closeModal();
    }
  };

  root.render(<Modal {...props} onClose={closeModal}></Modal>);
}

export function showConfirm(content: any) {
  const div = document.createElement("div");
  div.className = "modal-mask";
  document.body.appendChild(div);

  const root = createRoot(div);
  const closeModal = () => {
    root.unmount();
    div.remove();
  };

  return new Promise<boolean>((resolve) => {
    root.render(
      <Modal
        title="Confirm"
        actions={[
          <IconButton
            key="cancel"
            text="Cancel"
            onClick={() => {
              resolve(false);
              closeModal();
            }}
            icon={<CancelIcon />}
            tabIndex={0}
            bordered
            shadow
          ></IconButton>,
          <IconButton
            key="confirm"
            text="Confirm"
            type="primary"
            onClick={() => {
              resolve(true);
              closeModal();
            }}
            icon={<ConfirmIcon />}
            tabIndex={0}
            autoFocus
            bordered
            shadow
          ></IconButton>,
        ]}
        onClose={closeModal}
      >
        {content}
      </Modal>,
    );
  });
}

export function showImageModal(img: string) {
  showModal({
    title: "Long press or right click to save image",
    children: (
      <div>
        <img
          src={img}
          alt="preview"
          style={{
            maxWidth: "100%",
          }}
        ></img>
      </div>
    ),
  });
}
