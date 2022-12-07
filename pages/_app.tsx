import { AuthProvider } from "@contexts/authContext";
import { ThemeContextProvider } from "@contexts/themeContext";
import "@styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ThemeContextProvider>
          <Component {...pageProps} />
        </ThemeContextProvider>
      </AuthProvider>
    </>
  );
}
