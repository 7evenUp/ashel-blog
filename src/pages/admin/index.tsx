import type { GetServerSideProps, NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { Footer, Header } from "../../components";
import { getServerAuthSession } from "../../server/common/get-server-auth-session";
import { supabase } from "../../supabase/supabaseClient";

const Admin: NextPage = () => {
  const { data: session } = useSession();
  console.log("Session in client", session);

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return

    const file = e.target.files[0]

    if (file === undefined) return

    if (file.type && file.type.startsWith('image/')) {
      // const reader = new FileReader()

      // reader.addEventListener('load', () => {
      //   console.log(reader.result)
      // })
      const fileExt = file.name.split('.').pop()
      const filePath = `111.${fileExt}`

      const { data: uploadData, error } = await supabase
        .storage
        .from('photos')
        .upload(filePath, file)

      // const
      
      if (error) console.error(error)
      else {
        const { data, error } = await supabase
          .from('Photo')
          .insert([{ title: 'title', desc: 'description', src: uploadData.path }])
          .select("id")
          .single();

        if (error) console.error(error)

        console.log(data)
      }

      // reader.readAsDataURL(file)
    }
  }

  return (
    <>
      <Header />

      <main className="container mx-auto flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-[5rem] leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Admin page
        </h1>
        <div>
          <h2>Add photo</h2>
          <input type="file" accept="image/*" onChange={onSelectFile} required />
        </div>
        <button type="button" onClick={() => signOut()}>
          sign out
        </button>
      </main>

      <Footer />
    </>
  );
};

export default Admin;

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
