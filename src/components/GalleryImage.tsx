import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import Image from "next/image";
import { getShimmerBase64 } from "../lib/getShimmer";

const GalleryImage = ({ path }: { path: string }) => {
  const [url, setUrl] = useState("");
  const [isPhotoDownloaded, setIsPhotoDownloaded] = useState(false);

  useEffect(() => {
    const fetchImg = async () => {
      const { data, error } = await supabase.storage
        .from("photos")
        .download(path);
      if (error) {
        setIsPhotoDownloaded(false);
        console.error(
          `Image loading failed. Photo path: '${path}'`,
          error.message
        );
      }
      if (data) {
        const url = URL.createObjectURL(data);
        setUrl(url);
        setIsPhotoDownloaded(true);
      }
    };

    fetchImg();
  }, []);

  if (!isPhotoDownloaded) return null;

  return (
    <div className="group relative w-full h-72 sm:h-80 md:h-96">
      <Image
        className="object-cover group-hover:scale-110 duration-300"
        src={url}
        layout={"fill"}
        alt={'TODO'}
        sizes="(max-width: 1536px) 100vw,(max-width: 1024px) 50vw,33vw"
        placeholder="blur"
        blurDataURL={getShimmerBase64(350, 350)}
      />
    </div>
  );
};

export default GalleryImage;
