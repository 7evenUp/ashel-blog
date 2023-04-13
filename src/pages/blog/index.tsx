import type { InferGetStaticPropsType } from "next"
import { NextSeo } from "next-seo"

import { getAllFilesFrontMatter } from "@/lib/mdx"
import { Post } from "@/components"

const url = "https://www.ashel.site/blog"
const title = "Ashel blog"
const description =
  "Programming tutorials, thoughts on different topics and lifehacks."

export const getStaticProps = async () => {
  const blogPosts = await getAllFilesFrontMatter()

  return {
    props: { blogPosts },
  }
}

const Blog = ({
  blogPosts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
        }}
      />
      <div className="flex flex-col gap-24 mt-16 w-full">
        {blogPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default Blog
