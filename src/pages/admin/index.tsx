import type { GetServerSideProps,  } from "next";
import { getAllUnpublishedFilesFrontMatter } from "../../lib/mdx";
import { groupBy } from "../../lib/groupBy";
import { StaticBlog } from "../../../global";
import { Post } from "../../components";

export const getServerSideProps: GetServerSideProps = async () => {

  const blogPosts = await getAllUnpublishedFilesFrontMatter('blog');
  const groupedBlogPosts = groupBy(blogPosts, 'year');

  return { props: { posts: blogPosts, groupedBlogPosts } };
};

const Admin = ({posts}: {posts: StaticBlog[]}) => {
  console.log('ADMIN BLOG: ', posts)
  return (
    <>
      <div className="flex items-center gap-16 justify-start w-full">
        <h1 className="text-5xl leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Неопубликованные посты / в разработке
        </h1>
      </div>

      <div className="flex flex-col gap-24 mt-16 w-full">
        {posts.map((post) => <Post key={post.id} post={post} isAdmin={true} />)}
      </div>
    </>
  );
};

export default Admin;