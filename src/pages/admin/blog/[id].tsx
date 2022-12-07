import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import React, { useEffect, useState, Suspense } from "react";
import { prisma } from "../../../server/db/client";
import dynamic from 'next/dynamic'

const DynamicEditor = dynamic(() => import('./Editor'), { suspense: true })

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await prisma.post.findMany({
    select: {
      id: true
    }
  })

  console.log('Hello from getStaticPaths')

  return {
    paths: posts.map(post => ({ params: { id: `${post.id}` }})),
    fallback: false
  }
}

export const getStaticProps = async (context: GetStaticPropsContext<{id: string}>) => {
  if (context.params?.id) {
    const post = await prisma.post.findFirst({
      where: {
        id: parseInt(context.params?.id)
      },
    })

    if (post !== null) {
      return {
        props: {
          post: {
            ...post,
            createdAt: new Date(post.createdAt).toDateString()
          }
        },
      }
    }
  }

  return {
    props: {
      error: 'Error'
    }
  }
}

const Post = ({post, error}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [title, setTitle] = useState(post?.title || '')
  const [editorState, setEditorState] = useState(null);

  const handlePublish = async () => {

  }

  return (
    <div className="flex flex-col gap-2">
      {error && <h1>Error occured!</h1>}
      
      {post !== undefined && 
        <>
          <FloatButtons />
          <div className="flex flex-col">
            <input
              className="text-5xl outline-none text-center border-b-2"
              type="text"
              placeholder="Title of your story"
              value={title}
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <span>Created at: {post.createdAt}</span>

            <div className="editor-shell">
              <Suspense fallback={`Loading...`}>
                <DynamicEditor state={editorState} setState={setEditorState} />
              </Suspense>
            </div>
          </div>
        </>
      }
    </div>
  );
};

const FloatButtons = () => {
  return (
    <div className="fixed bottom-8 right-8 flex gap-4">
      <button
        className="bg-slate-200 rounded-md py-1 px-2"
        type="button"
        onClick={() => {
          
        }}
      >
        Save
      </button>
      <button
        className="bg-slate-200 rounded-md py-1 px-2"
        type="button"
        onClick={() => {
          
        }}
      >
        Publish
      </button>
    </div>
  )
}

export default Post;
