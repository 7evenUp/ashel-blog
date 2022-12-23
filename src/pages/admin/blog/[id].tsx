import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import React, { useState } from "react";
import { prisma } from "../../../server/db/client";
import { trpc } from "../../../utils/trpc";
import FloatButtons from "./components/FloatButtons";
import Modal from "./components/Modal";
import Editor from "./components/Editor";

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  return {
    paths: posts.map((post) => ({ params: { id: `${post.id}` } })),
    fallback: false,
  };
};

export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>
) => {
  if (context.params?.id) {
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(context.params?.id),
      },
    });

    if (post !== null) {
      return {
        props: {
          post: {
            ...post,
            publishedAt: post.publishedAt
              ? new Date(post.publishedAt).toLocaleDateString()
              : null,
            createdAt: new Date(post.createdAt).toLocaleDateString(),
          },
        },
      };
    }
  }

  return {
    props: {
      error: "Error",
    },
  };
};

const Post = ({
  post,
  error,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [title, setTitle] = useState(post?.title || "");
  const [description, setDescription] = useState(post?.desc || "");
  const [editorState, setEditorState] = useState(post?.content || "");
  const [isModalOpened, setIsModalOpened] = useState(false);
  const saveMutation = trpc.useMutation("posts.update");
  const publishMutation = trpc.useMutation("posts.publish");

  const changeModalStatus = () => setIsModalOpened(!isModalOpened);

  return (
    <>
      {error && <h1>Error occured!</h1>}

      {post !== undefined && (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-end">
            <span>Created at: {post.createdAt}</span>
            <input
              className="text-3xl w-full outline-none text-center border-b-2 bg-white text-black placeholder:text-beige pb-2"
              type="text"
              placeholder="Title of your story"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />

            <button
              className="hover:bg-beige transition-all rounded-lg p-1"
              type="button"
              onClick={changeModalStatus}
            >
              <svg
                className="w-8 h-8 fill-black"
                viewBox="0 0 40 40"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.4999 25H14.9999V18.3333H12.4999V20.4167H9.99992V22.9167H12.4999V25ZM16.6666 22.9167H29.9999V20.4167H16.6666V22.9167ZM24.9999 18.3333H27.4999V16.25H29.9999V13.75H27.4999V11.6667H24.9999V18.3333ZM9.99992 16.25H23.3333V13.75H9.99992V16.25ZM13.3333 35V31.6667H6.66659C5.74992 31.6667 4.96547 31.3406 4.31325 30.6883C3.65992 30.035 3.33325 29.25 3.33325 28.3333V8.33333C3.33325 7.41667 3.65992 6.63167 4.31325 5.97833C4.96547 5.32611 5.74992 5 6.66659 5H33.3333C34.2499 5 35.0349 5.32611 35.6883 5.97833C36.3405 6.63167 36.6666 7.41667 36.6666 8.33333V28.3333C36.6666 29.25 36.3405 30.035 35.6883 30.6883C35.0349 31.3406 34.2499 31.6667 33.3333 31.6667H26.6666V35H13.3333ZM6.66659 28.3333H33.3333V8.33333H6.66659V28.3333ZM6.66659 28.3333V8.33333V28.3333Z" />
              </svg>
            </button>
          </div>

          <div className="editor-shell">
            <Editor state={editorState} setState={setEditorState} />
          </div>
        </div>
      )}

      {isModalOpened && <Modal post={post} state={description} setState={setDescription} close={changeModalStatus} />}

      {post !== undefined && (
        <FloatButtons
          states={{ title, desc: description, content: editorState }}
          handlePublish={async () => {
            await publishMutation.mutateAsync(
              {
                id: post.id,
                title,
                desc: description,
                content: editorState || "",
              },
              {
                onSuccess: (data) => console.log(data),
              }
            );
          }}
          handleSave={async () => {
            await saveMutation.mutateAsync(
              {
                id: post.id,
                title,
                desc: description,
                content: editorState || "",
              },
              {
                onSuccess: (data) => {
                  console.log(data);
                },
              }
            );
          }}
        />
      )}
    </>
  );
};

export default Post;
