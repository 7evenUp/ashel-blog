import { Layout, MDXComponents } from "../components"
import { Analytics } from "@vercel/analytics/react"
import { MDXProvider } from "@mdx-js/react"
import { DefaultSeo } from "next-seo"
import type { AppType } from "next/dist/shared/lib/utils"

import "../styles/globals.css"
import "../styles/prism.css"

const defaultSeoConfig = {
  title: "Ashel Blog",
  description:
    "Блог о личном, интеллектуальном и о непревзойдённом. Тут вы этого не увидите.",
  canonical: "https://www.ashel.site/",
  openGraph: {
    type: "website",
    url: "https://www.ashel.site/",
    title: "Ashel Blog - сайт Артёма Шелудешева",
    description:
      "Блог о личном, интеллектуальном и о непревзойдённом. Тут вы этого не увидите.",
  },
}

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  return (
    <MDXProvider components={MDXComponents}>
      <DefaultSeo {...defaultSeoConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <Analytics />
    </MDXProvider>
  )
}

export default MyApp
