import type { InferGetStaticPropsType } from "next";
import { Post } from "../../components";
import { getAllPublishedFilesFrontMatter } from "../../lib/mdx";
import { groupBy } from "../../lib/groupBy";
import { NextSeo } from "next-seo";

const url = "https://www.ashel.site/blog"
const title = "Ashel blog"
const description = 'Programming tutorials, thoughts on different topics and lifehacks.';

export const getStaticProps = async () => {
  const blogPosts = await getAllPublishedFilesFrontMatter('blog');

  const groupedBlogPosts = groupBy(blogPosts, 'year');
  return {
    props: { blogPosts, groupedBlogPosts },
  };
};

const Blog = ({blogPosts, groupedBlogPosts}: InferGetStaticPropsType<typeof getStaticProps>) => {
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
        {blogPosts.map((post) => <Post key={post.id} post={post} />)}
      </div>
    </>
  )
};

export default Blog;