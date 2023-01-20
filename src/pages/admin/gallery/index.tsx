import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { supabase } from "../../../supabase/supabaseClient";
import { trpc } from "../../../utils/trpc";

const Gallery: NextPage = () => {
  const createMutation = trpc.useMutation('gallery.create')

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0]; 

    if (file === undefined) return;

    if (file.type && file.type.startsWith("image/")) {
      const folderName = 'gallery'
      const [fileName, ...rest] = file.name.split(".");
      const fileExt = rest[rest.length - 1]
      const filePath = `${folderName}/${fileName}.${fileExt}`;

      const { data: uploadData, error } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (error) console.error(error);
      else {
        await createMutation.mutateAsync({
          title: '123',
          src: uploadData.path
        }, {
          onSuccess: data => console.log('Success upload:', data)
        })
      }
    }
  };

  return (
    <>
      <div className="flex items-center gap-16 justify-start w-full">
        <h1 className="text-5xl leading-normal font-extrabold text-white drop-shadow-[0_0_1px_rgb(0,0,0)]">
          Кладезь эстетики
        </h1>

        <label className="flex gap-4 items-center">
          <span>Load Image</span>
          <input type="file" accept="image/*" onChange={onSelectFile} required />
        </label>
      </div>

      <div className="grid gap-2 lg:gap-4 w-full lg:grid-cols-2 2xl:grid-cols-3 mt-5">
        {[
          "https://images.unsplash.com/photo-1671726805766-de50e4327182?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
          "https://images.unsplash.com/photo-1673537074513-e66435b69012?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
          "https://images.unsplash.com/photo-1673363006135-b298da87a3de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
          "https://images.unsplash.com/photo-1673546803288-488dbba044c3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
          "https://images.unsplash.com/photo-1673557143243-39f2995a3bca?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
          "https://images.unsplash.com/photo-1671725501884-e832fb8d0d84?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
          "https://images.unsplash.com/photo-1673423050335-43b991cf57e8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60",
        ].map((el, key) => {
          return (
            <div className="group relative w-full h-72 sm:h-80 md:h-96" key={key}>
              <Image
                className="object-cover grayscale-0 group-hover:grayscale group-hover:scale-110 duration-300"
                src={el}
                layout={"fill"}
                sizes="(max-width: 1024px) 100vw,(max-width: 1536px) 50vw,33vw"
                quality={100}
              />
              <button
                onClick={() => {
                  // setIsDeleting(true)
                  // handleDelete(post.id)
                }}
                className="absolute right-4 bottom-4 py-1 px-2 rounded-md bg-white hover:bg-black hover:text-white transition-all py-1"
              >
                {/* { isDeleting ? 'Deleting' : 'Delete'} */}
                Delete
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Gallery;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerAuthSession(context);

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
