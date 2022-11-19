import type { GetServerSideProps, NextPage } from "next";
import router from "next/router";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { trpc } from "../../../utils/trpc";

const Blog: NextPage = () => {
  const { data: posts, error, isLoading } = trpc.useQuery(["posts.getAll"]);
  const postMutation = trpc.useMutation(["posts.create"])

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
          className="py-1 px-2 bg-slate-300 rounded-md ml-auto"
          onClick={async () => {
            await postMutation.mutateAsync({title: ""}, {
              onSuccess(data, variables, context) {
                if (data) router.push(`/admin/blog/${data.id}`);
              },
            })
          }}
        >{postMutation.isLoading ? "Creating new post..." : "Create post"}</button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 w-full mt-4">
        {posts && posts.map((post) => (
          <div
            key={post.id}
            className=""
          >
            {post.id}: {post.title}
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
