require("src/polyfill");

import { AppProps } from "next/app";
import Router from "next/router";
import { NextPageContext } from "next/types";
import NProgress from "nprogress";
import { Layout } from "src/components/Layout";
import { ErrorBoundary } from "src/components/error";
import { useIsHydrated } from "src/hooks/useIsHydarted";
import { useTheme } from "src/hooks/useTheme";
import { useAccessStore } from "src/store";
import { PageComponent } from "src/types/PageComponent";
import { Loading } from "src/ui";

import { useLoadData } from "src/hooks/useLoadData";
import { getWSClient, initializeWSClient } from "src/lib/ws-client-store";
import "src/styles/animation.css";
import "src/styles/font.css";
import "src/styles/globals.scss";
import "src/styles/highlight.scss";
import "src/styles/layout.scss";
import "src/styles/markdown.scss";
import "src/styles/nprogress.css";
import "src/styles/sidebar.scss";
import "src/styles/window.scss";
import "src/ui/styles.scss";

Router.events.on("routeChangeStart", NProgress.start);
Router.events.on("routeChangeComplete", NProgress.done);
Router.events.on("routeChangeError", NProgress.done);

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: PageComponent<NextPageContext> }) {
  const user = useAccessStore((state) => state.user);

  useTheme();
  useLoadData();

  if (!useIsHydrated()) {
    return <Loading />;
  }

  if (!Component.noAuth) {
    if (!user) {
      Router.replace("/auth");

      return <Loading />;
    }

    initializeWSClient();
    getWSClient().connect();

    return (
      <ErrorBoundary>
        <Layout withSidebar>
          <Component {...pageProps} />
        </Layout>
      </ErrorBoundary>
    );
  }

  return <Component {...pageProps} />;
}
