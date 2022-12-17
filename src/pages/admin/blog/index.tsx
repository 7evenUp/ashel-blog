import { Post } from "@prisma/client";
import type { GetServerSideProps, NextPage } from "next";
import router from "next/router";
import { useEffect, useState } from "react";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { trpc } from "../../../utils/trpc";
import PostCard from "./components/PostCard";

const Blog: NextPage = () => {
  const [publishedPosts, setPublishedPosts] = useState<Post[]>([]);
  const [unpublishedPosts, setUnpublishedPosts] = useState<Post[]>([]);
  const {
    data: posts,
    error,
    isLoading,
    refetch,
  } = trpc.useQuery(["posts.getAll"]);
  const createMutation = trpc.useMutation(["posts.create"]);
  const deleteMutation = trpc.useMutation(["posts.delete"]);

  const handleCreate = async () => {
    await createMutation.mutateAsync(
      { title: "" },
      {
        onSuccess: (data) => {
          router.push(`/admin/blog/${data.id}`);
        },
      }
    );
  };

  const handleDelete = async (postId: number) => {
    await deleteMutation.mutateAsync(
      { id: postId },
      {
        onSuccess: () => {
          refetch();
        },
      }
    );
  };

  useEffect(() => {
    if (posts) {
      setPublishedPosts(
        posts
          .filter((post) => post.publishedAt)
          // @ts-ignore
          .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime())
      );
      setUnpublishedPosts(
        posts
          .filter((post) => !post.published)
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      );
    }
  }, [posts]);

  if (error) return <h1>Error while loading: {error.message}</h1>;

  if (isLoading) return <h1>We load some data...</h1>;

  return (
    <>
      <div className="flex items-center gap-16 justify-start w-full">
        <h1 className="text-5xl leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Редактор блога
        </h1>
        <button
          type="button"
          className="py-1 px-2 bg-beige rounded-md ml-auto"
          onClick={handleCreate}
        >
          {createMutation.isLoading ? "Creating new post..." : "Create post"}
        </button>
      </div>

      <h2 className="mb-4 mt-10">Published posts</h2>
      <div className="grid grid-cols-3 gap-4 w-full">
        {publishedPosts &&
          publishedPosts.map((post) => (
            <PostCard key={post.id} post={post} handleDelete={handleDelete} />
          ))}
      </div>

      <h2 className="mb-4 mt-10">Unpublished posts</h2>
      <div className="grid grid-cols-3 gap-4 w-full">
        {unpublishedPosts &&
          unpublishedPosts.map((post) => (
            <PostCard key={post.id} post={post} handleDelete={handleDelete} />
          ))}
      </div>
    </>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  console.log("Session in Server", session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
