import type { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import router from "next/router";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { trpc } from "../../../utils/trpc";

const Blog: NextPage = () => {
  const { data: posts, error, isLoading, refetch } = trpc.useQuery(["posts.getAll"]);
  const createMutation = trpc.useMutation(["posts.create"])
  const deleteMutation = trpc.useMutation(["posts.delete"])

  const handleCreate = async () => {
    await createMutation.mutateAsync({title: ""}, {
      onSuccess: data => { router.push(`/admin/blog/${data.id}`) },
    })
  }

  const handleDelete = async (postId: number) => {
    await deleteMutation.mutateAsync({id: postId}, {
      onSuccess: () => { refetch() },
    })
  }

  if (error) return <h1>Error while loading: {error.message}</h1>

  if (isLoading) return <h1>We load some data...</h1>
  
  return (
    <>
      <div className="flex items-center gap-16 justify-start w-full">
        <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Редактор блога
        </h1>
        <button
          type="button"
          className="py-1 px-2 bg-beige rounded-md ml-auto"
          onClick={handleCreate}
        >{createMutation.isLoading ? "Creating new post..." : "Create post"}</button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 w-full mt-4">
        {posts && posts.map((post) => (
          <div
            key={post.id}
            className="flex flex-col gap-4 bg-beige rounded-xl py-2 px-4 relative"
          >
            {post.published && <span className="absolute w-3 h-3 rounded-full bg-red-400 top-2 right-4"/>}
            <span className="font-bold text-2xl">{post.title}</span>
            <span>PostID: {post.id}</span>
            <p>Description: {post.desc}</p>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            <div className="flex gap-6 justify-between">
              <Link href={`/admin/blog/${post.id}`}>
                <a className="w-1/2 rounded-md bg-white hover:bg-black hover:text-white transition-all py-1 text-center">edit</a>
              </Link>
              <button
                onClick={() => handleDelete(post.id)}
                className="w-1/2 rounded-md bg-white hover:bg-black hover:text-white transition-all py-1"
              >delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  console.log("Session in Server", session);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: { session } };
};
