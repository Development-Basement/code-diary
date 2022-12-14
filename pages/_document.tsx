import { DEFAULT_THEME } from "@contexts/themeContext";
import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html data-theme={DEFAULT_THEME}>
      <Head>
        <link rel="stylesheet" href="https://use.typekit.net/bit7rvm.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
