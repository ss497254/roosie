import { SlotID } from "src/constant";
import { useMobileScreen } from "../hooks/useMobileScreen";
import { useAppConfig } from "../store";
import { SideBar } from "./Sidebar";
import { cleanWSClient, getWSClient } from "src/lib/ws-client-store";
import { useEffect } from "react";

export function Layout({
  children,
  withSidebar,
}: React.PropsWithChildren & { withSidebar?: boolean }) {
  const isMobileScreen = useMobileScreen();
  const tightBorder = useAppConfig((state) => state.tightBorder);

  useEffect(() => {
    const client = getWSClient();

    client.connect();

    function listner() {
      if (client.getStore().getState().status === "connected") return;

      client.reconnect();
    }

    window.addEventListener("focus", listner);
    window.addEventListener("online", listner);
    return () => {
      cleanWSClient();
      window.removeEventListener("focus", listner);
      window.removeEventListener("online", listner);
    };
  }, []);

  return (
    <div
      className={`container ${
        tightBorder && !isMobileScreen ? "tight-container" : ""
      }`}
    >
      {withSidebar && <SideBar />}
      <div className="window-content" id={SlotID.AppBody}>
        {children}
      </div>
    </div>
  );
}
