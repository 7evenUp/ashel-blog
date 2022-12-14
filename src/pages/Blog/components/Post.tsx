import { Post } from '@prisma/client'
import Link from 'next/link'
import React from 'react'

const Post = ({ post }: { post: Post }) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <a className="flex gap-8">
        <div className="basis-1/2 bg-slate-600 flex flex-col gap-2">
          <b>Rust - лучший язык программирования?</b>
          <div className="flex gap-2">
            <span>Clock icon</span>
            <span>
              {
                // @ts-ignore
                new Date(post.publishedAt).toLocaleDateString()
              }
            </span>
          </div>
          <p>{post.desc}</p>
        </div>
        <div className="basis-1/2 bg-slate-700">Image will be placed here</div>
      </a>
    </Link>
  )
}

export default Post