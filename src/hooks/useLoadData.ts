import { useEffect } from "react";
import { getApiClient } from "src/lib/api-client-store";
import { useAppConfig, usePromptStore } from "src/store";

export function useLoadData() {
  useEffect(() => {
    (async () => {
      const api = getApiClient();
      const models = await api.llm.models();
      useAppConfig.getState().mergeModels(models);
    })().catch(console.warn);

    usePromptStore.getState().loadPrompts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
