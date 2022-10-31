import type { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react"
import { Footer, Header } from "../../components";
import { trpc } from "../../utils/trpc";

const Blog: NextPage = () => {
  const { data: session } = useSession()
  const x = trpc.useQuery(['example.hello'])

  const makeRequest = async () => {
    const res = await fetch('api/restricted')
    console.log(await res.json())
  }

  return (
    <>
      <Header />

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Это мой блог
        </h1>
        {!session ? (
          <button type="button" onClick={() => signIn()}>
            sign in
          </button>
        ) : (
          <>
            <button type="button" onClick={makeRequest}>
              make request
            </button>
            <button type="button" onClick={() => signOut()}>
              sign out
            </button>
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Blog
