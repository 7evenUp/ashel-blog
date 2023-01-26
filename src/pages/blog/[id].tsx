import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { MDXRemote } from 'next-mdx-remote';
import React from "react";
import { prisma } from "../../server/db/client";
import { EditorStateView } from "../../components/";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
    },
  });

  return {
    paths: posts.map((post) => ({ params: { id: `${post.id}` } })),
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  if (context.params?.id) {
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(context.params?.id),
      },
    });

    if (post !== null && post.publishedAt) {
      return {
        props: {
          post: {
            ...post,
            publishedAt: new Date(post.publishedAt).toLocaleDateString(),
            createdAt: new Date(post.createdAt).toLocaleDateString(),
          },
        },
      };
    }
  }

  return {
    props: {
      error: "Error",
    },
  };
};

const Post = ({
  post,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col gap-2 w-full xl:items-center">
      {error && <h1>Error occured here!</h1>}

      {post !== undefined && (
        <>
          <div className="flex items-baseline gap-4 mb-4 mt-6">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            <div className="flex items-center gap-1">
              <svg
                className="w-[14px] h-[14px]"
                viewBox="0 0 14 14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.993 0C3.129 0 0 3.136 0 7C0 10.864 3.129 14 6.993 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 6.993 0ZM7 12.6C3.906 12.6 1.4 10.094 1.4 7C1.4 3.906 3.906 1.4 7 1.4C10.094 1.4 12.6 3.906 12.6 7C12.6 10.094 10.094 12.6 7 12.6Z" />
                <path d="M7.25 4H6V7.93443L10.375 10L11 9.19344L7.25 7.44262V4Z" />
              </svg>
              <span className="text-sm">{post.publishedAt}</span>
            </div>
          </div>
          <EditorStateView data={post.content} />
        </>
      )}
    </div>
  );
};

export default Post;
