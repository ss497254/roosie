import { ClientApi } from "src/api-client";

let _apiClient: ClientApi;

export const getApiClient = () => {
  if (_apiClient) _apiClient = new ClientApi();

  return _apiClient;
};
