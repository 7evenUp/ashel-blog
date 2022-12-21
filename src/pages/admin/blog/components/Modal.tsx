import React, { Dispatch, SetStateAction } from "react";
import { supabase } from "../../../../supabase/supabaseClient";
import { trpc } from "../../../../utils/trpc";

const Modal = ({
  state,
  setState,
  close,
  postId
}: {
  state: string;
  setState: Dispatch<SetStateAction<string>>;
  close: () => void
  postId: number
}) => {
  const pathMutation = trpc.useMutation('posts.update_path')
  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];

    if (file === undefined) return;

    if (file.type && file.type.startsWith("image/")) {
      // const reader = new FileReader()

      // reader.addEventListener('load', () => {
      //   console.log(reader.result)
      // })
      const folderName = 'posts'
      const fileExt = file.name.split(".").pop();
      const filePath = `${folderName}/121.${fileExt}`;

      const { data: uploadData, error } = await supabase.storage
        .from("photos")
        .upload(filePath, file);

      // const

      if (error) console.error(error);
      else {
        console.log(uploadData)
        await pathMutation.mutateAsync({
          id: postId,
          path: uploadData.path
        }, {
          onSuccess: data => console.log('Success: ', data)
        })
        // const { data, error } = await supabase
        //   .from("Photo")
        //   .insert([
        //     { title: "title", desc: "description", src: uploadData.path },
        //   ])
        //   .select("id")
        //   .single();

        // if (error) console.error(error);

        // console.log(data);
      }

      // reader.readAsDataURL(file)
    }
  };

  
  return (
    <div className="absolute w-screen h-screen bg-black bg-opacity-50 top-0 left-0 z-20">
      <div className="flex flex-col gap-2 absolute top-1/2 left-1/2 w-[500px] h-80 -translate-x-1/2 -translate-y-1/2 z-30">
        <span className="text-white text-lg">Description: </span>
        <textarea
          className="text-black bg-white w-full h-full outline-none p-2 resize-none"
          value={state}
          onChange={(e) => setState(e.currentTarget.value)}
        />
        <label className="text-white flex gap-4 items-center">
          <span>Load Image</span>
          <input type="file" accept="image/*" onChange={onSelectFile} required />
        </label>
        
      </div>
      <button
        type="button"
        className="absolute right-4 top-4 z-30 text-white text-5xl rotate-45 hover:text-beige"
        onClick={close}
      >+</button>
    </div>
  )
};

export default Modal;
