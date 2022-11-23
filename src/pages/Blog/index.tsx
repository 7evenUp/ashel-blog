import type { NextPage } from "next";
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
      <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Загрузка постов
      </h1>
    );
  }

  if (error) {
    return (
      <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Ошибка: {error.message}
      </h1>
    );
  }

  return (
    <>
      <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
        Это мой блог
      </h1>
      <div>
        {isSuccess && (
          posts.map(post => (
            <div key={post.id}>{new Date(post.createdAt).toDateString()}</div>
          ))
        )}
      </div>
    </>
  );
};

export default Blog;
