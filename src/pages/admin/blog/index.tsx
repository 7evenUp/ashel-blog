import type { GetServerSideProps, NextPage } from "next";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { trpc } from "../../../utils/trpc";

const Blog: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from tRPC" }]);
  const createPost = trpc.useMutation(["posts.createPost"])
  
  return (
    <>
      <div>
        <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Редактор блога
        </h1>
        <button
          type="button"
          onClick={() => {
            createPost.mutate({title: "My first post using tRPC"})
            // const { data, error } = await createPost("New Post1");

            // if (error) console.error(error);

            // if (data) router.push(`/builder/${data.id}`);
          }}
        >Create post</button>
      </div>
      
      <div className="grid grid-cols-4 gap-4 w-full">
        <div className="h-48 bg-slate-400 rounded-lg"></div>
        <div className="col-span-3 h-48 bg-red-400 rounded-lg"></div>
        <div className="h-48 bg-slate-400 rounded-lg"></div>
        <div className="col-start-2 col-end-3 h-48 bg-green-400 rounded-lg"></div>
        <div className="h-48 bg-slate-400 rounded-lg"></div>
        <div className="h-48 bg-slate-400 rounded-lg"></div>
        <div className="h-48 bg-slate-400 rounded-lg"></div>
        <div className="col-start-3 col-span-2 h-48 bg-blue-400 rounded-lg"></div>
        <div className="h-48 bg-slate-400 rounded-lg"></div>
        <div className="h-48 bg-slate-400 rounded-lg"></div>
        <div className="h-48 bg-slate-400 rounded-lg"></div>
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
