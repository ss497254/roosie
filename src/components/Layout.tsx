import { SlotID } from "src/constant";
import { useMobileScreen } from "../hooks/useMobileScreen";
import { useAppConfig } from "../store";
import { SideBar } from "./sidebar";

export function Layout({
  children,
  withSidebar,
}: React.PropsWithChildren & { withSidebar?: boolean }) {
  const isMobileScreen = useMobileScreen();
  const tightBorder = useAppConfig((state) => state.tightBorder);

  return (
    <div
      className={`container ${
        tightBorder && !isMobileScreen ? "tight-container" : ""
      }`}
    >
      {withSidebar && <SideBar className="sidebar-show" />}
      <div className="window-content" id={SlotID.AppBody}>
        {children}
      </div>
    </div>
  );
}
