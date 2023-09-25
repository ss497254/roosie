import { ClientApi } from "src/api-client/api";

let _apiClient: ClientApi;

export const getApiClient = () => {
  if (_apiClient) _apiClient = new ClientApi();

  return _apiClient;
};
