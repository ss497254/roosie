import { useAppConfig } from "src/store/config";
import { ResponseType } from "src/types/ResposeType";
import { useAccessStore } from "src/store";

export const Cfetch = async <T>(path: string, init: RequestInit = {}) => {
  const { apiURL } = useAppConfig.getState();
  const { token } = useAccessStore.getState();
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  } as any;

  if (token) headers!.Authorization = `Bearer ${token}`;

  const res = await fetch(apiURL + path, { ...init, headers });

  let output: ResponseType<T>;

  if (res.headers.get("Content-Type")?.includes("application/json"))
    output = await res.json();
  else throw new Error("invalid response content-type");

  if (res.ok) {
    return output;
  }

  throw new Error(
    `${res.statusText}: ${output.message || "Some error occured."}`,
  );
};
