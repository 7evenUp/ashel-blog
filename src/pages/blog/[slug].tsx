import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { MDXRemote } from 'next-mdx-remote';
import React from "react";
import { prisma } from "../../server/db/client";
import { getFileBySlug, getFiles } from "../../lib/mdx";
import { FrontMatterTypes, MdxSource } from "../../../global";
import MDXComponents from "../../components/MDXComponents";
import { dayjs } from "../../lib/dayjs";

type Props = {
  frontMatter: FrontMatterTypes;
  mdxSource: MdxSource;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles('blog')

  return {
    paths: posts.map(p => ({
      params: { slug: p.replace(/\.mdx/, '')}
    })),
    fallback: false
  }
};

export const getStaticProps = async ({ params }: { params: { slug: string } }) => {
  const post = await getFileBySlug('blog', params.slug);

  return { props: post };
}

export default function BlogPost({ mdxSource, frontMatter }: Props) {
  console.log('FRONT MATTER: ', frontMatter)
  return (
    // <BlogLayout frontMatter={frontMatter}>
    <>
      <div className="flex flex-col gap-2">
        <h1>{frontMatter.title}</h1>
        <span>{dayjs(frontMatter.publishedAt).format('ll')}</span>
        <span>{Math.ceil(frontMatter.readingTime.minutes)} мин. чтения</span>
      </div>
      <MDXRemote
          {...mdxSource}
          components={{
            ...MDXComponents,
          }}
        />
    </>
      
    // </BlogLayout>
  );
}