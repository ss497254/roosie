import { useEffect } from "react";
import { api } from "src/client/api";
import { useAppConfig } from "src/store";

export function useLoadData() {
  const config = useAppConfig();

  useEffect(() => {
    (async () => {
      const models = await api.llm.models();
      config.mergeModels(models);
    })().catch(console.warn);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
