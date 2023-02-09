import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";
import Image from "next/image";
import { getShimmerBase64 } from "../lib/getShimmer";

const GalleryImage = ({ path, alt }: { path: string, alt: string }) => {
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
  }, [path]);

  if (!isPhotoDownloaded) return null;

  return (
    <div className="group relative w-full h-72 sm:h-80 md:h-96">
      <Image
        className="object-cover group-hover:scale-110 group-hover:z-10 duration-300"
        src={url}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={getShimmerBase64(490, 384)}
        sizes="(max-width: 1024px) 100vw,(max-width: 1536px) 50vw,33vw"
      />
    </div>
  );
};

export default GalleryImage;
