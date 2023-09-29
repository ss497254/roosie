import { SubmitKey, useAccessStore, useAppConfig } from "src/store";
import { IconButton, InputRange, List, ListItem, Select } from "src/ui";

import MaxIcon from "src/icons/max.svg";
import MinIcon from "src/icons/min.svg";

export function GeneralItem() {
  const accessStore = useAccessStore();
  const config = useAppConfig();

  return (
    <List>
      <ListItem title="Username">
        <h2 className="font-semibold text-lg p-2">
          {accessStore.user?.username}
        </h2>
      </ListItem>

      <ListItem title="Send Key">
        <Select
          value={config.submitKey}
          onChange={(e) => {
            config.update(
              (config) =>
                (config.submitKey = e.target.value as any as SubmitKey),
            );
          }}
        >
          {Object.values(SubmitKey).map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </Select>
      </ListItem>

      <ListItem title="Full screen">
        <IconButton
          icon={config.tightBorder ? <MinIcon /> : <MaxIcon />}
          bordered
          onClick={() => {
            config.update(
              (config) => (config.tightBorder = !config.tightBorder),
            );
          }}
        />
      </ListItem>

      <ListItem title="App color" subTitle="Changes your app primary color">
        <input
          type="color"
          onChange={(e) => {
            document.body.style.setProperty("--primary", e.target.value);
          }}
        />
      </ListItem>

      <ListItem title="Font Size" subTitle="Adjust font size of chat content">
        <InputRange
          title={`${config.fontSize ?? 14}px`}
          value={config.fontSize}
          min="12"
          max="18"
          step="1"
          onChange={(e) =>
            config.update(
              (config) =>
                (config.fontSize = Number.parseInt(e.currentTarget.value)),
            )
          }
        />
      </ListItem>

      <ListItem
        title="Adjust font size of chat content"
        subTitle="Adjust font size of chat content"
      >
        <input
          type="checkbox"
          checked={config.enableAutoGenerateTitle}
          onChange={(e) =>
            config.update(
              (config) =>
                (config.enableAutoGenerateTitle = e.currentTarget.checked),
            )
          }
        ></input>
      </ListItem>

      <ListItem
        title="Send preview bubble"
        subTitle="Preview markdown in bubble"
      >
        <input
          type="checkbox"
          checked={config.sendPreviewBubble}
          onChange={(e) =>
            config.update(
              (config) => (config.sendPreviewBubble = e.currentTarget.checked),
            )
          }
        ></input>
      </ListItem>
    </List>
  );
}
