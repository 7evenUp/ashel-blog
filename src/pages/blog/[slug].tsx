import { GetStaticPaths } from "next";
import { MDXRemote } from "next-mdx-remote";
import React from "react";
import { getFileBySlug, getFiles } from "../../lib/mdx";
import { FrontMatterTypes, MdxSource } from "../../../global";
import MDXComponents from "../../components/MDXComponents";
import { dayjs } from "../../lib/dayjs";
import { NextSeo } from "next-seo";

type Props = {
  frontMatter: FrontMatterTypes;
  mdxSource: MdxSource;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getFiles("blog");

  return {
    paths: posts.map((p) => ({
      params: { slug: p.replace(/\.mdx/, "") },
    })),
    fallback: false,
  };
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string };
}) => {
  const post = await getFileBySlug("blog", params.slug);

  return { props: post };
};

export default function BlogPost({ mdxSource, frontMatter }: Props) {
  console.log("FRONT MATTER: ", frontMatter);
  const { title, slug, summary, publishedAt, readingTime } = frontMatter;

  return (
    <>
      <NextSeo
        title={`Ashel blog - ${title}`}
        description={summary}
        canonical={`https://www.ashel.site/blog/${slug}`}
        openGraph={{
          url: `https://www.ashel.site/blog/${slug}`,
          title: `Ashel blog - ${title}`,
          description: summary,
          type: "article",
          article: {
            publishedTime: dayjs(publishedAt).format("ll"),
            authors: ['https://ashel-portfolio.vercel.app/']
          },
          images: [
            {
              url: `https://www.ashel.site/images/${slug}/cover.png`,
              width: 800,
              height: 600,
              alt: title
            }
          ]
        }}
      />
      <div className="flex flex-col items-center mt-16 w-full">
        <div className="flex flex-col items-center gap-2 mobile:gap-4 mb-8">
          <h1 className="text-2xl mobile:text-3xl sm:text-4xl md:text-5xl font-serif tracking-wider text-center">
            {title}
          </h1>
          <span className="mobile:text-lg">
            {dayjs(publishedAt).format("ll")}
          </span>
          <span className="text-sm mobile:text-base font-semibold">
            {Math.ceil(readingTime.minutes)} мин. чтения
          </span>
        </div>
        <article className="flex flex-col w-full lg:max-w-[860px]">
          <MDXRemote
            {...mdxSource}
            components={{
              ...MDXComponents,
            }}
          />
        </article>
      </div>
    </>
  );
}
