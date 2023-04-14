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

import rehypePrettyCode from "rehype-pretty-code"

import { StaticBlog } from "../../global"

const rehypePrettyCodeOptions = {
  // Use one of Shiki's packaged themes
  theme: 'github-light',
 
  // Keep the background or use a custom background color?
  keepBackground: true,
 
  // Callback hooks to add custom logic to nodes when visiting
  // them.
  // @ts-expect-error type-any
  onVisitLine(node) {
    // Prevent lines from collapsing in `display: grid` mode, and
    // allow empty lines to be copy/pasted
    if (node.children.length === 0) {
      node.children = [{type: 'text', value: ' '}];
    }
  },
  // @ts-expect-error type-any
  onVisitHighlightedLine(node) {
    // Each line node by default has `class="line"`.
    node.properties.className.push('line--highlighted');
  },
  // @ts-expect-error type-any
  onVisitHighlightedWord(node, id: string) {
    // Each word node has no className by default.
    node.properties.className = ['word--highlighted'];
 
  // `id` will be either 'v', 's', or 'i'.
  // State (v)alue, (s)etter, and (i)nitial value
  if (id) {
    const backgroundColor = {
      v: 'rgb(196 42 94 / 59%)',
      s: 'rgb(10 103 163 / 56%)',
      i: 'rgb(75 25 255 / 45%)',
    }[id];
 
    const color = {
      v: 'rgb(255 235 235 / 100%)',
      s: 'rgb(225 255 255 / 100%)',
      i: 'rgb(235 235 255 / 100%)',
    }[id];
 
    // If the word spans across syntax boundaries (e.g. punctuation), remove
    // colors from the child nodes.
    if (node.properties['data-rehype-pretty-code-wrapper']) {
      // @ts-expect-error type-any
      node.children.forEach((childNode) => {
        childNode.properties.style = '';
      });
    }
 
    node.properties.style =
      `background-color: ${backgroundColor}; color: ${color};`;
  }
  },
}

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
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        rehypeCodeTitles,
        [rehypePrettyCode, rehypePrettyCodeOptions],
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
