import { useAccessStore } from "src/store";
import { ErrorBoundary } from "../ErrorBoundary";
import { SidebarOpenBtn } from "../SidebarOpenBtn";
import { ChatItem } from "./ChatItem";
import { DangerItems } from "./DangerItems";
import { GeneralItem } from "./GeneralItem";
import { ModelConfig } from "./ModelConfig";
import { ZConfig } from "./ZConfig";

export function Settings() {
  const user = useAccessStore((state) => state.user);

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
        {user!.admin && <ModelConfig />}
        <DangerItems />
      </div>
    </ErrorBoundary>
  );
}
