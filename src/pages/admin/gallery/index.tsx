import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { GalleryImage } from "../../../components";
import { getServerAuthSession } from "../../../server/common/get-server-auth-session";
import { supabase } from "../../../supabase/supabaseClient";
import { trpc } from "../../../lib/trpc";

const Gallery: NextPage = () => {
  const createMutation = trpc.useMutation("gallery.create");
  const deleteMutation = trpc.useMutation("gallery.delete");
  const { data, error, isLoading, refetch } = trpc.useQuery(["gallery.getAll"]);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: number, path: string) => {
    const { data, error } = await supabase.storage
      .from("photos")
      .remove([path]);

    if (error) console.error(error);
    else {
      await deleteMutation.mutateAsync(
        { id },
        {
          onSuccess: (data) => {
            setIsDeleting(false)
            console.log("DATA AFTER DELETION:", data);
          },
        }
      );
    }
  };

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];

    if (file === undefined) return;

    if (file.type && file.type.startsWith("image/")) {
      const folderName = "gallery";
      const [fileName, ...rest] = file.name.split(".");
      const fileExt = rest[rest.length - 1];
      const filePath = `${folderName}/${fileName}.${fileExt}`;

      const { data: uploadData, error } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      if (error) console.error(error);
      else {
        await createMutation.mutateAsync(
          {
            title: "123",
            src: uploadData.path,
          },
          {
            onSuccess: (data) => {
              refetch();
              console.log("Success upload:", data);
            },
          }
        );
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
          <input
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            required
          />
        </label>
      </div>

      <div className="grid gap-2 lg:gap-4 w-full lg:grid-cols-2 2xl:grid-cols-3 mt-5">
        {data &&
          data.map((photo) => (
            <div key={photo.id} className="relative">
              <GalleryImage path={photo.src} />
              <button
                onClick={() => {
                  setIsDeleting(true);
                  handleDelete(photo.id, photo.src);
                }}
                className="absolute right-4 bottom-4 py-1 px-2 rounded-md bg-white hover:bg-black hover:text-white transition-all"
              >
                {isDeleting ? "Deleting" : "Delete"}
              </button>
            </div>
          ))}
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
