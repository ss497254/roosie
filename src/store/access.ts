import { IUser } from "src/types/IUser";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AccessControlStore {
  token: string;
  user?: IUser;
  hideBalanceQuery: Boolean;
}

export const useAccessStore = create<AccessControlStore>()(
  persist(
    (set) => ({
      token: "",
      user: undefined,
      hideBalanceQuery: false,
    }),
    {
      name: "access-store",
      version: 1,
    },
  ),
);
