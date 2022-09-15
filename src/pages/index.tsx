import type { NextPage } from "next";
import Head from "next/head";
import { Header, Footer, AboutItem } from "../components";
import { aboutData } from "../utils/AboutData";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);

  return (
    <>
      <Head>
        <title>Ashel Blog</title>
        <meta name="description" content="Ashel blog website created with T3 stack" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <div className="flex flex-col gap-20">
          {aboutData.map((aboutItem, i) => (
            <AboutItem key={i} {...aboutItem} />
          ))}
        </div>
        
        <div className="pt-6 text-2xl text-blue-500 flex justify-center items-center w-full">
          {hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Home
