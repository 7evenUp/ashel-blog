import type { NextPage } from "next";
import Link from "next/link";
import { trpc } from "../../utils/trpc";

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
      <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Это мой блог
      </h1>
      <div className="grid grid-cols-2 w-full gap-8">
        {isSuccess && (
          posts.map(post => (
            <div
              key={post.id}
              className="flex flex-col bg-slate-200 rounded-xl p-4"
            >
              {new Date(post.createdAt).toDateString()}
              <Link href={`/blog/${post.id}`}>
                <a>Read more...</a>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default Blog;
