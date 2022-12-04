import { Html, Head, Main, NextScript } from "next/document";
import React from "react";

export default function Document() {
  return (
    <Html>
      <Head data-theme="halloween">
        <link
          rel="stylesheet"
          href="https://use.typekit.net/bit7rvm.css"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
