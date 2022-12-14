import type { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";
import Post from "./components/Post";

const Blog: NextPage = () => {
  const x = trpc.useQuery(["example.hello"]);
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
      <div className="grid grid-cols-2 w-full gap-8">
        { isSuccess && posts.map(post => <Post key={post.id} post={post} />) }
      </div>
    </>
  );
};

export default Blog;
