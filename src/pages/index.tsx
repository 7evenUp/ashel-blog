import Head from "next/head"
import { Fragment } from "react"

import { AboutItem, Contacts } from "@/components"
import { aboutData } from "@/lib/AboutData"

const Home = () => {
  return (
    <>
      <Head>
        <title>Ashel Blog</title>
        <meta
          name="description"
          content="Блог о личном, интеллектуальном и о непревзойдённом. Тут вы этого не увидите."
        />
        <link rel="icon" href="/favicon.ico" />
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
        />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      </Head>

      <h1 className="self-end text-end sm:text-lg relative mt-16 mb-40 max-w-[413px] before:w-3 before:h-full before:absolute before:bg-beige before:top-0 before:-left-3 sm:before:-left-8">
        Меня зовут Артём. Мне 21 год. Любитель выпить. Дипломированный
        специалист. Безработный.
      </h1>

      <div className="flex flex-col gap-24">
        {aboutData.map((aboutItem, i) => {
          if (i === 2)
            return (
              <Fragment key={i}>
                <Contacts />
                <AboutItem {...aboutItem} />
              </Fragment>
            )
          return <AboutItem key={i} {...aboutItem} />
        })}
      </div>
    </>
  )
}

export default Home
