import { GetStaticPropsContext } from "next";
import React, { useEffect, useState } from "react";

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

export async function getStaticPaths() {

  return { paths: [{ params: { id: '1' }}], fallback: false }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  if (typeof context.params?.id === "string") {

    return {
      props: { str: 'string' },
    };
  }
}

export default Post;
