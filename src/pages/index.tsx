import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { AboutItem, Contacts } from "../components";
import { aboutData } from "../utils/AboutData";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Ashel Blog</title>
        <meta
          name="description"
          content="Ashel's website-blog where you can find my personal info, interesting posts and pics"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1
        className="self-end text-end sm:text-lg relative mt-16 mb-40 max-w-[413px]
        before:w-3 before:h-full before:absolute before:bg-beige before:top-0 before:-left-3 sm:before:-left-8
      "
      >
        Меня зовут Артём. Мне 21 год. Любитель выпить. Дипломированный
        специалист. Безработный.
      </h1>

      <div className="flex flex-col gap-24">
        {aboutData.map((aboutItem, i) => {
          if (i === 2)
            return (
              <React.Fragment key={i}>
                <Contacts />
                <AboutItem {...aboutItem} />
              </React.Fragment>
            );
          return <AboutItem key={i} {...aboutItem} />;
        })}
      </div>
    </>
  );
};

export default Home;
