import type { InferGetStaticPropsType } from "next";
import { Post } from "../../components";
import { getAllFilesFrontMatter } from "../../lib/mdx";
import { groupBy } from "../../lib/groupBy";

export const getStaticProps = async () => {
  const blogPosts = await getAllFilesFrontMatter('blog');

  const groupedBlogPosts = groupBy(blogPosts, 'year');

  return {
    props: { blogPosts, groupedBlogPosts },
  };
};

const Blog = ({blogPosts, groupedBlogPosts}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <div className="flex flex-col gap-24 mt-16 w-full">
      {blogPosts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  )
};

export default Blog;