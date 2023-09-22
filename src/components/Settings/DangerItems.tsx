import { IconButton, List, ListItem, showConfirm } from "src/ui";
import { useAccessStore, useAppConfig, useChatStore } from "src/store";

export function DangerItems() {
  const chatStore = useChatStore();
  const appConfig = useAppConfig();

  return (
    <List>
      <ListItem title="Logout">
        <IconButton
          text="Logout"
          onClick={async () => {
            if (await showConfirm("Are you sure you want to logout?")) {
              useAccessStore.setState({ user: undefined, token: "" });
            }
          }}
          type="danger"
        />
      </ListItem>
      <ListItem
        title="Reset All Settings"
        subTitle="Reset all setting items to default"
      >
        <IconButton
          text="Reset"
          onClick={async () => {
            if (
              await showConfirm("Confirm to reset all settings to default?")
            ) {
              appConfig.reset();
            }
          }}
          type="danger"
        />
      </ListItem>
      <ListItem
        title="Clear All Data"
        subTitle="Clear all messages and settings"
      >
        <IconButton
          text="Clear"
          onClick={async () => {
            if (
              await showConfirm("Confirm to clear all messages and settings?")
            ) {
              chatStore.clearAllData();
            }
          }}
          type="danger"
        />
      </ListItem>
    </List>
  );
}
