/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FileInput, IconButton, Modal } from "src/ui";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, { type Crop } from "react-image-crop";

import CancelIcon from "src/icons/cancel.svg";
import ConfirmIcon from "src/icons/confirm.svg";

interface ImageSelectProps extends React.PropsWithChildren {
  onClose: () => void;
}

export const ImageSelect: React.FC<ImageSelectProps> = ({ onClose }) => {
  const [file, setFile] = useState<File>();

  return (
    <div className="modal-mask">
      <Modal
        title="Select Image"
        onClose={onClose}
        actions={[
          <IconButton
            key="cancel"
            text="Cancel"
            onClick={onClose}
            icon={<CancelIcon />}
            tabIndex={0}
            bordered
            shadow
          ></IconButton>,
          <IconButton
            key="confirm"
            text="Confirm"
            type="primary"
            onClick={onClose}
            icon={<ConfirmIcon />}
            tabIndex={0}
            autoFocus
            bordered
            shadow
          ></IconButton>,
        ]}
      >
        {file ? (
          <ImageCrop file={file} />
        ) : (
          <FileInput
            accept="image/gif, image/jpeg, image/png"
            onChange={(e) => {
              if (!e.target.files) return;

              const files = [...e.target.files];
              if (files.length === 0) return;

              setFile(files[0]);
            }}
          />
        )}
      </Modal>
    </div>
  );
};

function ImageCrop({ file }: { file: File }) {
  const [crop, setCrop] = useState<Crop>();

  return (
    <ReactCrop
      className="mx-auto w-fit"
      crop={crop}
      maxHeight={480}
      onChange={(c) => {
        setCrop(c);
      }}
    >
      <img alt="image" className="h-[480px]" src={URL.createObjectURL(file)} />
    </ReactCrop>
  );
}
