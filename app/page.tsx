"use client";
require("./polyfill");

import { useEffect } from "react";
import { ErrorBoundary } from "./components/error";
import { Screen, useLoadData } from "./components/home";
import { Loading } from "app/ui";
import { getClientConfig } from "./config/client";
import { useIsHydrated } from "./hooks/useIsHydarted";
import { useTheme } from "./hooks/useTheme";
import { useAccessStore } from "./store";
import { HashRouter } from "react-router-dom";

export default function Home() {
  useTheme();
  useLoadData();

  useEffect(() => {
    console.log("[Config] got config from build time", getClientConfig());
    useAccessStore.getState().fetch();
  }, []);

  if (!useIsHydrated()) {
    return <Loading />;
  }

  return (
    <ErrorBoundary>
      <HashRouter>
        <Screen />
      </HashRouter>
    </ErrorBoundary>
  );
}
