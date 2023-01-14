import { Post } from "@prisma/client";
import React from "react";
import PostCard from "./PostCard";

const PostCards = ({
  title,
  posts,
  handleDelete,
}: {
  title: string;
  posts: Post[];
  handleDelete: (id: number) => void;
}) => {
  return (
    <>
      <h2 className="mb-4 mt-10">{title}</h2>
      <div className="grid grid-cols-3 gap-4 w-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} handleDelete={handleDelete} />
        ))}
      </div>
    </>
  );
};

export default PostCards;
