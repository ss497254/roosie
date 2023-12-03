import { ModelConfig, useAppConfig } from "src/store";
import { InputRange, List, ListItem, Select } from "src/ui";
import { ModalConfigValidator } from "src/utils/model-config-validator";

const updateModelConfigDefault = (
  updater: (modelConfig: ModelConfig) => void,
) => {
  useAppConfig.getState().update((config) => {
    const modelConfig = { ...config.modelConfig };

    updater(modelConfig);
    config.modelConfig = modelConfig;
  });
};

export function ModelConfigList({
  updateModelConfig = updateModelConfigDefault,
  modelConfig = useAppConfig.getState().modelConfig,
}) {
  return (
    <List>
      <ListItem title="Model">
        <Select
          value={modelConfig.model}
          onChange={(e) => {
            updateModelConfig(
              (modelConfig) =>
                (modelConfig.model = ModalConfigValidator.model(
                  e.currentTarget.value,
                )),
            );
          }}
        >
          {useAppConfig
            .getState()
            .allModels()
            .map((v, i) => (
              <option value={v.name} key={i} disabled={!v.available}>
                {v.name}
              </option>
            ))}
        </Select>
      </ListItem>
      <ListItem
        title="Temperature"
        subTitle="A larger value makes the more random output"
      >
        <InputRange
          value={modelConfig.temperature?.toFixed(1)}
          min="0"
          max="1"
          step="0.1"
          onChange={(e) => {
            updateModelConfig(
              (modelConfig) =>
                (modelConfig.temperature = ModalConfigValidator.temperature(
                  e.currentTarget.valueAsNumber,
                )),
            );
          }}
        ></InputRange>
      </ListItem>
      <ListItem
        title="Top P"
        subTitle="Do not alter this value together with temperature"
      >
        <InputRange
          value={(modelConfig.top_p ?? 1).toFixed(1)}
          min="0"
          max="1"
          step="0.1"
          onChange={(e) => {
            updateModelConfig(
              (modelConfig) =>
                (modelConfig.top_p = ModalConfigValidator.top_p(
                  e.currentTarget.valueAsNumber,
                )),
            );
          }}
        ></InputRange>
      </ListItem>
      <ListItem
        title="Max Tokens"
        subTitle="Maximum length of input tokens and generated tokens"
      >
        <input
          type="number"
          min={100}
          max={100000}
          value={modelConfig.max_tokens}
          onChange={(e) =>
            updateModelConfig(
              (modelConfig) =>
                (modelConfig.max_tokens = ModalConfigValidator.max_tokens(
                  e.currentTarget.valueAsNumber,
                )),
            )
          }
        ></input>
      </ListItem>
      <ListItem
        title="Presence Penalty"
        subTitle="A larger value increases the likelihood to talk about new topics"
      >
        <InputRange
          value={modelConfig.presence_penalty?.toFixed(1)}
          min="-2"
          max="2"
          step="0.1"
          onChange={(e) => {
            updateModelConfig(
              (modelConfig) =>
                (modelConfig.presence_penalty =
                  ModalConfigValidator.presence_penalty(
                    e.currentTarget.valueAsNumber,
                  )),
            );
          }}
        ></InputRange>
      </ListItem>

      <ListItem
        title="Frequency Penalty"
        subTitle="A larger value decreasing the likelihood to repeat the same line"
      >
        <InputRange
          value={modelConfig.frequency_penalty?.toFixed(1)}
          min="-2"
          max="2"
          step="0.1"
          onChange={(e) => {
            updateModelConfig(
              (modelConfig) =>
                (modelConfig.frequency_penalty =
                  ModalConfigValidator.frequency_penalty(
                    e.currentTarget.valueAsNumber,
                  )),
            );
          }}
        ></InputRange>
      </ListItem>

      <ListItem
        title="Inject System Prompts"
        subTitle="Inject a global system prompt for every request"
      >
        <input
          type="checkbox"
          checked={modelConfig.enableInjectSystemPrompts}
          onChange={(e) =>
            updateModelConfig(
              (modelConfig) =>
                (modelConfig.enableInjectSystemPrompts =
                  e.currentTarget.checked),
            )
          }
        ></input>
      </ListItem>

      <ListItem
        title="Input Template"
        subTitle="Newest message will be filled to this template"
      >
        <input
          type="text"
          value={modelConfig.template}
          onChange={(e) =>
            updateModelConfig(
              (modelConfig) => (modelConfig.template = e.currentTarget.value),
            )
          }
        ></input>
      </ListItem>

      <ListItem
        title="Attached Messages Count"
        subTitle="Number of sent messages attached per request"
      >
        <InputRange
          title={modelConfig.historyMessageCount.toString()}
          value={modelConfig.historyMessageCount}
          min="0"
          max="64"
          step="1"
          onChange={(e) =>
            updateModelConfig(
              (modelConfig) =>
                (modelConfig.historyMessageCount = e.target.valueAsNumber),
            )
          }
        ></InputRange>
      </ListItem>

      <ListItem
        title="History Compression Threshold"
        subTitle="Will compress if uncompressed messages length exceeds the value"
      >
        <input
          type="number"
          min={500}
          max={4000}
          value={modelConfig.compressMessageLengthThreshold}
          onChange={(e) =>
            updateModelConfig(
              (modelConfig) =>
                (modelConfig.compressMessageLengthThreshold =
                  e.currentTarget.valueAsNumber),
            )
          }
        ></input>
      </ListItem>
      <ListItem title="Memory Prompt" subTitle="Send Memory">
        <input
          type="checkbox"
          checked={modelConfig.sendMemory}
          onChange={(e) =>
            updateModelConfig(
              (modelConfig) =>
                (modelConfig.sendMemory = e.currentTarget.checked),
            )
          }
        ></input>
      </ListItem>
    </List>
  );
}

export function ModelConfig() {
  const { modelConfig } = useAppConfig();
  return <ModelConfigList modelConfig={modelConfig} />;
}
