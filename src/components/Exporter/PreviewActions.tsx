import DownloadIcon from "src/icons/download.svg";
import { ChatMessage } from "src/store";
import { IconButton } from "src/ui/IconButtonWithText";
import { RenderExport } from "./RenderExport";
import styles from "./exporter.module.scss";

import CopyIcon from "src/icons/copy.svg";

export function PreviewActions(props: {
  download: () => void;
  copy: () => void;
  showCopy?: boolean;
  messages?: ChatMessage[];
}) {
  return (
    <>
      <div className={styles["preview-actions"]}>
        {props.showCopy && (
          <IconButton
            text="Copy"
            bordered
            shadow
            icon={<CopyIcon />}
            onClick={props.copy}
          ></IconButton>
        )}
        <IconButton
          text="Download"
          bordered
          shadow
          icon={<DownloadIcon />}
          onClick={props.download}
        ></IconButton>
      </div>
      <div
        style={{
          position: "fixed",
          right: "200vw",
          pointerEvents: "none",
        }}
      >
        <RenderExport messages={props.messages ?? []} />
      </div>
    </>
  );
}
