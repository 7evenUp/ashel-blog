import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import React, { useEffect, useState } from "react";
import { prisma } from "../../../server/db/client";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
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

    if (post !== null) {
      return {
        props: { post },
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
    <main className="container mx-auto flex flex-col items-center min-h-screen p-4 gap-8">
      <div className="flex flex-col gap-2">
        {error && <h1>Error occured!</h1>}
        
        {post !== undefined && 
          <div>
            <h1>{post.title}</h1>
            
          </div>
        }
      </div>
    </main>
  );
};

export default Post;
