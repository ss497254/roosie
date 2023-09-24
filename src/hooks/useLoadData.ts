import { useEffect } from "react";
import { getApiClient } from "src/lib/api-client-store";
import { useAppConfig } from "src/store";

export function useLoadData() {
  const config = useAppConfig();

  useEffect(() => {
    (async () => {
      const api = getApiClient();
      const models = await api.llm.models();
      config.mergeModels(models);
    })().catch(console.warn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
