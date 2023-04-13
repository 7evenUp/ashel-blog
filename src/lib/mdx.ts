import fs from "fs"
import path from "path"
import dayjs from "dayjs"
import readingTime from "reading-time"

import { serialize } from "next-mdx-remote/serialize"
import matter from "gray-matter"

import rehypeAutolinkHeadings from "rehype-autolink-headings"
import rehypeCodeTitles from "rehype-code-titles"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"
import rehypePrism from "rehype-prism-plus"
import { StaticBlog } from "../../global"

const root = process.cwd()

export async function getContentFiles() {
  return fs.readdirSync(path.join(root, "src", "content"))
}

export async function getFileBySlug(slug: string) {
  const source = fs.readFileSync(
    path.join(root, "src", "content", `${slug}.mdx`),
    "utf8"
  )

  const { data, content } = matter(source)

  const mdxSource = await serialize(source, {
    parseFrontmatter: true,
    scope: {},
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        rehypePrism,
        [
          rehypeAutolinkHeadings,
          {
            properties: {
              className: ["anchor"],
            },
          },
        ],
      ],
      format: "mdx",
    },
  })

  return {
    mdxSource,
    frontMatter: {
      readingTime: readingTime(content),
      slug,
      ...data,
    },
  }
}

export async function getAllFilesFrontMatter() {
  const files = fs.readdirSync(path.join(root, "src", "content"))

  const allPostsData: StaticBlog[] = files.reduce(
    (allPosts: any, postSlug: string) => {
      const source = fs.readFileSync(
        path.join(root, "src", "content", postSlug),
        "utf8"
      )
      const { data, content } = matter(source)
      console.log("getAllFilesFrontMatter: ", data)
      return [
        {
          ...data,
          id: postSlug.replace(/\.mdx$/, ""),
          readingTime: readingTime(content).text.split("read")[0],
          year: dayjs(data.publishedAt).year(),
        },
        ...allPosts,
      ]
    },
    []
  )

  return allPostsData.sort((a, b) => {
    if (a.publishedAt < b.publishedAt) {
      return 1
    } else {
      return -1
    }
  })
}
