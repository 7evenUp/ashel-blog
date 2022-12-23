import { Post } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabase/supabaseClient";

const Post = ({ post }: { post: Post }) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const fetchImg = async () => {
      if (post.image) {
        const { data, error } = await supabase.storage
          .from("photos")
          .download(post.image);
        if (error) console.error(error);
        if (data) {
          const url = URL.createObjectURL(data);
          setUrl(url);
        }
      }
    };

    fetchImg();
  }, []);

  return (
    <Link href={`/blog/${post.id}`}>
      <a className="group flex gap-4 lg:gap-8 flex-col-reverse lg:flex-row border-b pb-8 hover:border-black duration-500 w-full">
        <div className="basis-1/2 flex flex-col">
          <h3 className="text-2xl mobile:text-3xl sm:text-4xl md:text-5xl font-serif tracking-wider">
            {post.title}
          </h3>
          <div className="flex gap-1 mobile:gap-2 items-center mt-2 mb-4">
            <svg
              className="w-3 h-3 mobile:w-[14px] mobile:h-[14px]"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.993 0C3.129 0 0 3.136 0 7C0 10.864 3.129 14 6.993 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 6.993 0ZM7 12.6C3.906 12.6 1.4 10.094 1.4 7C1.4 3.906 3.906 1.4 7 1.4C10.094 1.4 12.6 3.906 12.6 7C12.6 10.094 10.094 12.6 7 12.6Z" />
              <path d="M7.25 4H6V7.93443L10.375 10L11 9.19344L7.25 7.44262V4Z" />
            </svg>
            <span className="text-sm">
              {post.publishedAt &&
                new Date(post.publishedAt).toLocaleDateString()}
            </span>
          </div>
          <p className="text-base mobile:text-lg leading-relaxed">
            {post.desc}
          </p>
        </div>

        <div className="lg:basis-1/2 w-full lg:w-1/2 min-h-[236px] sm:h-[300px] relative">
          {url && (
            <Image
              className="object-cover grayscale group-hover:grayscale-0 duration-300"
              src={url}
              alt={post.title}
              layout="fill"
            />
          )}
        </div>
      </a>
    </Link>
  );
};

export default Post;
