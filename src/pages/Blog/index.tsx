import type { NextPage } from "next";
import { trpc } from "../../utils/trpc";
import Post from "./components/Post";

const Blog: NextPage = () => {
  const {
    data: posts,
    isLoading,
    error,
    isSuccess,
  } = trpc.useQuery(["posts.getPublished"]);

  if (isLoading) {
    return (
      <h1 className="text-[2rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Загрузка постов
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-[2rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Ошибка: {error.message}
      </h1>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-24 mt-16 w-full">
        {isSuccess && posts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </>
  );
};

export default Blog;
