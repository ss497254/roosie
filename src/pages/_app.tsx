import "src/polyfill";

import { AppProps } from "next/app";
import Router from "next/router";
import { NextPageContext } from "next/types";
import NProgress from "nprogress";
import { ErrorBoundary } from "src/components/ErrorBoundary";
import { Layout } from "src/components/Layout";
import { useIsHydrated } from "src/hooks/useIsHydarted";
import { useLoadData } from "src/hooks/useLoadData";
import { useTheme } from "src/hooks/useTheme";
import { initializeWSClient } from "src/lib/ws-client-store";
import { useAccessStore } from "src/store";
import "src/styles/animation.css";
import "src/styles/font.css";
import "src/styles/globals.scss";
import "src/styles/highlight.scss";
import "src/styles/layout.scss";
import "src/styles/markdown.scss";
import "src/styles/nprogress.css";
import "src/styles/sidebar.scss";
import "src/styles/ui.scss";
import "src/styles/window.scss";
import { PageComponent } from "src/types/PageComponent";
import { Loading } from "src/ui";
import { Cfetch } from "src/utils/fetch";
import { SWRConfig } from "swr";

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

    return (
      <ErrorBoundary>
        <SWRConfig value={{ fetcher: Cfetch }}>
          <Layout withSidebar>
            <Component {...pageProps} />
          </Layout>
        </SWRConfig>
      </ErrorBoundary>
    );
  }

  return <Component {...pageProps} />;
}
