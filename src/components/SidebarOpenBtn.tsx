import React from "react";
import { useMobileScreen } from "src/hooks/useMobileScreen";
import { useSidebarDrawerStore } from "src/store/sidebar";
import { IconButton } from "../ui/IconButtonWithText";

import MenuIcon from "src/icons/menu.svg";

interface SidebarOpenBtnProps extends React.PropsWithChildren {}

export const SidebarOpenBtn: React.FC<SidebarOpenBtnProps> = () => {
  const isMobileScreen = useMobileScreen();

  if (!isMobileScreen) return null;

  return (
    <IconButton
      icon={<MenuIcon />}
      bordered
      onClick={useSidebarDrawerStore.getState().toggleOpen}
    />
  );
};
