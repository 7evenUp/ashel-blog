import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import React, { useEffect, useState } from "react";
import { prisma } from "../../server/db/client";
import EditorStateView from "./EditorStateView";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    where: {
      published: true
    },
    select: {
      id: true
    }
  })

  console.log('Hello from getStaticPaths')

  return {
    paths: posts.map(post => ({ params: { id: `${post.id}` }})),
    fallback: false
  }
}

export const getStaticProps = async (context: GetStaticPropsContext<{id: string}>) => {
  if (context.params?.id) {
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(context.params?.id)
      },
    })

    if (post !== null && post.publishedAt) {
      return {
        props: {
          post: {
            ...post,
            publishedAt: new Date(post.publishedAt).toLocaleDateString(),
            createdAt: new Date(post.createdAt).toLocaleDateString()
          }
        },
      }
    }
  }

  return {
    props: {
      error: 'Error'
    }
  }
}

const Post = ({post, error}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {error && <h1>Error occured!</h1>}
      
      {post !== undefined && 
        <>
          <div>
            <h1 className="text-5xl">{post.title}</h1>
            <p>Description: {post.desc}</p>
            <span>Published at: {post.publishedAt}</span>
          </div>
          <EditorStateView data={post.content} />
        </>
      }
    </div>
  );
};

export default Post;
