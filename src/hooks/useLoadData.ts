import { useEffect } from "react";
import { getApiClient } from "src/lib/api-client-store";
import { useAccessStore, useAppConfig, usePromptStore } from "src/store";
import { Cfetch } from "src/utils/fetch";

async function LoadModels() {
  const api = getApiClient();

  const models = await api.llm.models();
  useAppConfig.getState().mergeModels(models);
}

async function LoadUserDetails() {
  const res = await Cfetch<any>("/user/me");

  if (res && res.success) useAccessStore.setState({ ...res.data });
}

export function useLoadData() {
  useEffect(() => {
    Promise.all([LoadModels(), LoadUserDetails()]).catch(console.warn);

    usePromptStore.getState().loadPrompts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
