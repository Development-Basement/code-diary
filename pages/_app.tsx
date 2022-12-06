import "@styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeContextProvider } from "@contexts/themeContext";
import { AuthProvider } from "@contexts/authContext";

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
