import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import Image from "next/image";

const GalleryImage = ({ path }: { path: string }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchImg = async () => {
      const { data, error } = await supabase.storage
        .from("photos")
        .download(path);
      if (error) console.error(error);
      if (data) {
        const url = URL.createObjectURL(data);
        setUrl(url);
      }
    };

    fetchImg();
  }, []);

  return (
    <div className="relative w-full h-72 sm:h-80 md:h-96">
      <Image
        className="object-cover"
        src={url}
        layout={"fill"}
        sizes="(max-width: 1536px) 100vw,(max-width: 1024px) 50vw,33vw"
      />
    </div>
  );
};

export default GalleryImage;
