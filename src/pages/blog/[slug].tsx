import { FC } from "react"
import { GetStaticPaths } from "next"
import { MDXRemote } from "next-mdx-remote"
import { NextSeo } from "next-seo"

import { getFileBySlug, getContentFiles } from "@/lib/mdx"
import { dayjs } from "@/lib/dayjs"
import MDXComponents from "@/components/MDXComponents"

import { FrontMatterTypes, MdxSource } from "../../../global"

type PageProps = {
  frontMatter: FrontMatterTypes
  mdxSource: MdxSource
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getContentFiles()

  return {
    paths: posts.map((p) => ({
      params: { slug: p.replace(/\.mdx/, "") },
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string }
}) => {
  const post = await getFileBySlug(params.slug)

  return { props: post }
}

const BlogPost: FC<PageProps> = ({ mdxSource, frontMatter }) => {
  console.log("FRONT MATTER: ", frontMatter)
  const { title, slug, summary, publishedAt, readingTime } = frontMatter

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
            authors: ["https://ashel-portfolio.vercel.app/"],
          },
          images: [
            {
              url: `https://www.ashel.site/images/${slug}/cover.png`,
              width: 800,
              height: 600,
              alt: title,
            },
          ],
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
  )
}


export default BlogPost