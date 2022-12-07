import { DEFAULT_THEME, possibleThemes, Theme } from "@contexts/themeContext";
import { GetServerSideProps } from "next";
import { Head, Html, Main, NextScript } from "next/document";

export const getServerSideProps: GetServerSideProps<{ theme: Theme }> = async (
  ctx,
) => {
  console.log(ctx.req.cookies);
  const inCookie = ctx.req.cookies["theme"];
  const theme = possibleThemes.includes(inCookie as Theme) // workaround
    ? (inCookie as Theme) // it is definitely a theme
    : DEFAULT_THEME;
  return {
    props: { theme: theme },
  };
};

export default function Document(props: { theme: Theme }) {
  return (
    <Html data-theme={props.theme}>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.typekit.net/bit7rvm.css"
        ></link>
        <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      </Head>
      <body>
        <Main />
        {props.theme}
        <NextScript />
      </body>
    </Html>
  );
}
