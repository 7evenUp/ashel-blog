import { Post } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Post = ({ post }: { post: Post }) => {
  return (
    <Link href={`/blog/${post.id}`}>
      <a className="flex gap-4 lf:gap-8 flex-col-reverse lg:flex-row border-b pb-4">
        <div className="basis-1/2 flex flex-col">
          <h3 className="text-2xl mobile:text-3xl sm:text-4xl md:text-5xl font-serif tracking-wider">Rust - лучший язык программирования?</h3>
          <div className="flex gap-2 items-center mt-2 mb-4">
            <svg className="w-[14px] h-[14px]" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.993 0C3.129 0 0 3.136 0 7C0 10.864 3.129 14 6.993 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 6.993 0ZM7 12.6C3.906 12.6 1.4 10.094 1.4 7C1.4 3.906 3.906 1.4 7 1.4C10.094 1.4 12.6 3.906 12.6 7C12.6 10.094 10.094 12.6 7 12.6Z"/>
              <path d="M7.25 4H6V7.93443L10.375 10L11 9.19344L7.25 7.44262V4Z"/>
            </svg>
            <span className="text-sm">
              {
                // @ts-ignore
                new Date(post.publishedAt).toLocaleDateString()
              }
            </span>
          </div>
          {/* <p>{post.desc}</p> */}
          <p className="text-lg leading-relaxed">Тут я говорю о том, как я учил Rust, как сильно мне понравился процесс обучения, с какими подводными камнями встретился, узнал, что есть компилируемые языки программирования и многое другое</p>
        </div>
        
        <div className="lg:basis-1/2 w-full lg:w-1/2 min-h-[236px] relative ">
          <Image
            className="object-cover"
            src={'https://ntorzmsgnfxlxdfetvfz.supabase.co/storage/v1/object/sign/photos/posts/post.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJwaG90b3MvcG9zdHMvcG9zdC5qcGciLCJ0cmFuc2Zvcm1hdGlvbnMiOiIiLCJpYXQiOjE2NzExMDc4MTMsImV4cCI6MTk4NjQ2NzgxM30.IgIe406AXkxusF1R3b9yf9aaTopMfhaZBIV-uJnzkMQ'}
            alt="Avatar"
            layout='fill'
          />
        </div>
      </a>
    </Link>
  )
}

export default Post