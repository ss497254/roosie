import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <title>Chatoor</title>
      <meta name="description" content="Chatoor - your all time partner" />
      <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      <link rel="manifest" href="/site.webmanifest"></link>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1 maximum-scale=1"
      />
      <meta name="apple-mobile-web-app-title" content="Chatoor" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <link rel="apple-touch-startup-image" href="android-chrome-512x512.png" />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: dark)"
        content="#151515"
      />
      <meta
        name="theme-color"
        media="(prefers-color-scheme: light)"
        content="#fafafa"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      ></link>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
