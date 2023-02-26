import { Layout, MDXComponents } from "../components";
import { Analytics } from "@vercel/analytics/react";
import { MDXProvider } from "@mdx-js/react";
import type { AppType } from "next/dist/shared/lib/utils";
import "../styles/globals.css";
import "../styles/prism.css";

const MyApp: AppType = ({
  Component,
  pageProps: { ...pageProps }
}) => {
  return (
    <MDXProvider components={MDXComponents}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </MDXProvider>
  );
};

export default MyApp
