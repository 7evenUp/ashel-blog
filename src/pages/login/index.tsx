import type { GetServerSideProps, NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";
import { Footer, Header } from "../../components";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const Login: NextPage = () => {
  const { data: session } = useSession();

  const makeRequest = async () => {
    const res = await fetch("api/restricted");
    console.log(await res.json());
  };

  return (
    <>
      <Header />

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Login page
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  return { props: {} };
};

export default Login;
