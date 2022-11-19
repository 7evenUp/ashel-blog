import { GetStaticPaths, GetStaticPropsContext } from "next";
import React, { useEffect, useState } from "react";
import { prisma } from "../../../server/db/client";
import { trpc } from "../../../utils/trpc";

const Post = () => {
  return (
    <main className="container mx-auto flex flex-col items-center min-h-screen p-4 gap-8">
      <div className="flex flex-col gap-2">
        <div>
          <label>Heading</label>
        </div>
        <div>
          <label>Description</label>
        </div>
      </div>
    </main>
  );
};

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

export async function getStaticProps(context: GetStaticPropsContext<{ id: string }>) {
  if (typeof context.params?.id === "string") {

    return {
      props: { str: 'string' },
    };
  }
}

export default Post;
