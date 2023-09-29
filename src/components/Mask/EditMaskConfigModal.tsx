import React, { useState } from "react";
import { Mask, useMaskStore } from "src/store";
import { Updater } from "src/types/Mask";
import { IconButton, Modal } from "src/ui";
import { MaskConfig } from ".";

import ConfirmIcon from "src/icons/confirm.svg";
import DeleteIcon from "src/icons/delete.svg";

interface EditMaskConfigModalProps extends React.PropsWithChildren {
  mask: Mask;
  onClose?: () => void;
}

export const EditMaskConfigModal: React.FC<EditMaskConfigModalProps> = ({
  mask,
  onClose,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const deleteMask = useMaskStore((state) => state.delete);
  const updateMask: Updater<Mask> = (updater) => {
    useMaskStore.getState().update(mask.id!, updater);
  };

  return (
    <div className="modal-mask">
      <Modal
        title={`Edit Prompt Template ${mask.builtin ? "(readonly)" : ""}`}
        onClose={onClose}
        actions={[
          <IconButton
            bordered
            text="Cancel"
            key="cancel"
            icon={<DeleteIcon />}
            onClick={async () => {
              deleteMask(mask.id);
              onClose?.();
            }}
          />,
          <IconButton
            bordered
            key="done"
            type="primary"
            text="Done"
            icon={<ConfirmIcon />}
            onClick={onClose}
          />,
        ]}
      >
        <MaskConfig
          mask={mask}
          updateMask={updateMask}
          readonly={mask.builtin}
        />
      </Modal>
    </div>
  );
};
