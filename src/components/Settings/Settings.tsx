import Router from "next/router";
import { useEffect } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { SidebarOpenBtn } from "../SidebarOpenBtn";
import { ChatItem } from "./ChatItem";
import { DangerItems } from "./DangerItems";
import { GeneralItem } from "./GeneralItem";
import { ModelConfigList } from "./ModelConfig";
import { SyncItems } from "./SyncItem";
import { ZConfig } from "./ZConfig";
import { useAccessStore } from "src/store";

export function Settings() {
  const user = useAccessStore((state) => state.user);

  useEffect(() => {
    const keydownEvent = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        Router.back();
      }
    };
    document.addEventListener("keydown", keydownEvent);
    return () => {
      document.removeEventListener("keydown", keydownEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ErrorBoundary>
      <div className="window-header">
        <div className="window-header-title">
          <div className="window-header-main-title">Settings</div>
          <div className="window-header-sub-title">All settings</div>
        </div>
        <div className="window-actions">
          <div className="window-action-button">
            <SidebarOpenBtn />
          </div>
        </div>
      </div>
      <div className="p-5 overflow-auto">
        <GeneralItem />
        <ChatItem />
        <ZConfig />
        {user!.admin && <SyncItems />}
        {user!.admin && <ModelConfigList />}
        <DangerItems />
      </div>
    </ErrorBoundary>
  );
}
