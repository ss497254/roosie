import { useChatStore } from "src/store";
import styles from "./chat.module.scss";

export function ClearContextDivider() {
  const chatStore = useChatStore();

  return (
    <div
      className={styles["clear-context"]}
      onClick={() =>
        chatStore.updateCurrentSession(
          (session) => (session.clearContextIndex = undefined),
        )
      }
    >
      <div className={styles["clear-context-tips"]}>Clear</div>
      <div className={styles["clear-context-revert-btn"]}>Revert</div>
    </div>
  );
}
