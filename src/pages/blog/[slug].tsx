import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import { MDXRemote } from 'next-mdx-remote';
import React from "react";
import { prisma } from "../../server/db/client";
import { EditorStateView } from "../../components";
import { getFileBySlug, getFiles } from "../../lib/mdx";
import { FrontMatterTypes, MdxSource } from "../../../global";
import MDXComponents from "../../components/MDXComponents";

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

export default function Blog({ mdxSource, frontMatter }: Props) {
  console.log('FRONT MATTER: ', frontMatter)
  return (
    // <BlogLayout frontMatter={frontMatter}>
      <MDXRemote
        {...mdxSource}
        components={{
          ...MDXComponents,
        }}
      />
    // </BlogLayout>
  );
}
