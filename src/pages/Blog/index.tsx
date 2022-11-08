import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";

const Blog: NextPage = () => {
  const x = trpc.useQuery(["example.hello"]);

  return (
    <>
      <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Это мой блог
      </h1>
    </>
  );
};

export default Blog;
