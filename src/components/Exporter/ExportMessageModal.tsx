import { Modal } from "src/ui";
import { MessageExporter } from "./Exporter";

export function ExportMessageModal(props: { onClose: () => void }) {
  return (
    <div className="modal-mask">
      <Modal title="Export Messages" onClose={props.onClose}>
        <div style={{ minHeight: "40vh" }}>
          <MessageExporter />
        </div>
      </Modal>
    </div>
  );
}
