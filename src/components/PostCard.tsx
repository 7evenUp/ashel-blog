import { Post } from "@prisma/client";
import Link from "next/link";
import React from "react";

const PostCard = ({
  post,
  handleDelete,
}: {
  post: Post;
  handleDelete: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-4 bg-beige rounded-xl py-2 px-4 relative">
      {post.published && (
        <span className="absolute w-3 h-3 rounded-full bg-red-400 top-2 right-4" />
      )}
      <span className="font-bold text-2xl">{post.title}</span>
      <span>PostID: {post.id}</span>
      <p>Description: {post.desc}</p>
      <span>Created: {new Date(post.createdAt).toLocaleDateString()}</span>
      {post.publishedAt && (
        <span>
          Published: {new Date(post.publishedAt).toLocaleDateString()}
        </span>
      )}
      <div className="flex gap-6 justify-between">
        <Link href={`/admin/blogx/${post.id}`}>
          <a className="w-1/2 rounded-md bg-white hover:bg-black hover:text-white transition-all py-1 text-center">
            edit
          </a>
        </Link>
        <button
          onClick={() => handleDelete(post.id)}
          className="w-1/2 rounded-md bg-white hover:bg-black hover:text-white transition-all py-1"
        >
          delete
        </button>
      </div>
    </div>
  );
};

export default PostCard;
