import { List, ListItem } from "src/ui";
import { useSyncStore } from "src/store";
import { IconButton } from "src/ui";

import ResetIcon from "src/icons/reload.svg";

export function SyncItems() {
  const syncStore = useSyncStore();
  const webdav = syncStore.webDavConfig;

  return (
    <List>
      <ListItem
        title={"Last sync " + new Date().toLocaleString()}
        subTitle="20 conversations, 100 messages, 200 prompt words, 20 masks"
      >
        <IconButton
          icon={<ResetIcon />}
          text="Synchronize"
          onClick={() => {
            syncStore.check().then(console.log);
          }}
        />
      </ListItem>

      <ListItem
        title="Local Backup"
        subTitle="20 conversations, 100 messages, 200 prompt words, 20 masks"
      ></ListItem>

      <ListItem title="Web Dav Server" subTitle="Access control enabled">
        <input
          value={webdav.server}
          type="text"
          placeholder={"https://example.com"}
          onChange={(e) => {
            syncStore.update(
              (config) => (config.server = e.currentTarget.value),
            );
          }}
        />
      </ListItem>

      <ListItem title="Web Dav User Name" subTitle="user name here">
        <input
          value={webdav.username}
          type="text"
          placeholder={"username"}
          onChange={(e) => {
            syncStore.update(
              (config) => (config.username = e.currentTarget.value),
            );
          }}
        />
      </ListItem>

      <ListItem title="Web Dav Password" subTitle="password here">
        <input
          value={webdav.password}
          type="text"
          placeholder={"password"}
          onChange={(e) => {
            syncStore.update(
              (config) => (config.password = e.currentTarget.value),
            );
          }}
        />
      </ListItem>
    </List>
  );
}
