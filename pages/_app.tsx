import { AuthProvider } from "@contexts/authContext";

import { ThemeContextProvider } from "@contexts/themeContext";

import "@styles/globals.css";

import { AppProps } from "next/app";

import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <>
          <Head>
            <title>code-diary</title>
          </Head>
          <Component {...pageProps} />
        </>
      </ThemeContextProvider>
    </AuthProvider>
  );
}
