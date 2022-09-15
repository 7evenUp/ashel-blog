import type { NextPage } from "next";
import { Footer, Header } from "../../components";

const Blog: NextPage = () => {
  return (
    <>
      <Header />

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Это мой блог
        </h1>
      </main>

      <Footer />
    </>
  );
};

export default Blog
