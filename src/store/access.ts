import { IChannel } from "src/types/IChannel";
import { IUser } from "src/types/IUser";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AccessControlStore {
  token: string;
  user?: IUser;
  channels?: IChannel[];
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
