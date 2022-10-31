import type { GetServerSideProps, NextPage } from "next";
import { useSession, signOut } from "next-auth/react"
import { Footer, Header } from "../../components";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";

const Admin: NextPage = () => {
  const { data: session } = useSession()
  console.log('Session in client', session)
  return (
    <>
      <Header />

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Admin page
        </h1>
        <button type="button" onClick={() => signOut()}>
          sign out
        </button>
      </main>

      <Footer />
    </>
  );
};

export default Admin

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

  console.log('Session in Server', session)
  
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  return { props: { session } }
}