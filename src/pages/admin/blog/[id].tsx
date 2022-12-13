import {
  GetStaticPaths,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from "next";
import React, { useEffect, useState } from "react";
import { prisma } from "../../../server/db/client";
import { trpc } from "../../../utils/trpc";
import Editor from './Editor'

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true,
    },
  });

  console.log("Hello from getStaticPaths");

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

    if (post !== null && post.publishedAt) {
      return {
        props: {
          post: {
            ...post,
            publishedAt: new Date(post.publishedAt).toLocaleDateString(),
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
  const [editorState, setEditorState] = useState(post?.content);
  const saveMutation = trpc.useMutation("posts.update")
  const publishMutation = trpc.useMutation("posts.publish")

  return (
    <div className="flex flex-col gap-2">
      {error && <h1>Error occured!</h1>}

      {post !== undefined && (
        <>
          <FloatButtons
            handlePublish={async () => {
              await publishMutation.mutateAsync({
                id: post.id,
                title,
                desc: 'This is description for published posts',
                content: editorState || ''
              }, {
                onSuccess: data => console.log(data)
              })
            }}
            handleSave={async () => {
              await saveMutation.mutateAsync({
                id: post.id,
                title,
                desc: 'This is a custom description',
                content: editorState || ''
              }, {
                onSuccess: (data) => { console.log(data) }
              })
            }}
          />
          <div className="flex flex-col">
            <div>
              <input
                className="text-5xl outline-none text-center border-b-2"
                type="text"
                placeholder="Title of your story"
                value={title}
                onChange={(e) => setTitle(e.currentTarget.value)}
              />
              <span>Created at: {post.createdAt}</span>
            </div>
            

            <div className="editor-shell">
              <Editor state={editorState} setState={setEditorState} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const FloatButtons = ({
  handlePublish,
  handleSave,
}: {
  handlePublish: () => void;
  handleSave: () => void;
}) => {
  return (
    <div className="fixed bottom-8 right-8 flex gap-4 z-50">
      <button
        className="bg-slate-200 rounded-md py-1 px-2"
        type="button"
        onClick={handleSave}
      >
        Save
      </button>
      <button
        className="bg-slate-200 rounded-md py-1 px-2"
        type="button"
        onClick={handlePublish}
      >
        Publish
      </button>
    </div>
  );
};

export default Post;
