import Image from "next/image";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

type ImageWrapperProps = {
  title: string
  desc: string | null
  src: string
};

const ImageWrapper = ({title, desc, src}: ImageWrapperProps) => {
  const [photoUrl, setPhotoUrl] = useState("")

  useEffect(() => {
    const downloadImage = async (path: string) => {
      try {
        const { data, error } = await supabase.storage
          .from('photos')
          .download(path)
  
        if (error) throw error
  
        const url = URL.createObjectURL(data)
        setPhotoUrl(url)
      } catch (error) {
        console.log('Error downloading image: ', error)
      }
    }

    downloadImage(src)
  }, [])
  
  return (
    <div>
      <h1>Title: {title}</h1>
      <p>Description: {desc}</p>
      <Image
        src={photoUrl}
        alt="Avatar"
        width={300}
        height={300}
      />
    </div>
  )
};

export default ImageWrapper;
