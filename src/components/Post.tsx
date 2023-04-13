import Image from "next/image"
import Link from "next/link"
import { StaticBlog } from "../../global"
import { getShimmerBase64 } from "../lib/getShimmer"

const Post = ({ post }: { post: StaticBlog }) => {
  const linkHref = `/blog/${post.id}`

  return (
    <Link href={linkHref}>
      <div className="group flex gap-4 lg:gap-8 flex-col-reverse lg:flex-row border-b pb-8 hover:border-black duration-500 w-full">
        <div className="basis-1/2 flex flex-col">
          <h3 className="text-2xl mobile:text-3xl sm:text-4xl md:text-5xl font-serif tracking-wider">
            {post.title}
          </h3>
          <div className="flex gap-1 mobile:gap-2 items-center mt-4 mb-6">
            <svg
              className="w-3 h-3 mobile:w-[14px] mobile:h-[14px]"
              viewBox="0 0 14 14"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.993 0C3.129 0 0 3.136 0 7C0 10.864 3.129 14 6.993 14C10.864 14 14 10.864 14 7C14 3.136 10.864 0 6.993 0ZM7 12.6C3.906 12.6 1.4 10.094 1.4 7C1.4 3.906 3.906 1.4 7 1.4C10.094 1.4 12.6 3.906 12.6 7C12.6 10.094 10.094 12.6 7 12.6Z" />
              <path d="M7.25 4H6V7.93443L10.375 10L11 9.19344L7.25 7.44262V4Z" />
            </svg>
            <span className="text-sm xl:text-base">
              {post.publishedAt.toString()}
            </span>
          </div>
          <p className="text-base mobile:text-lg lg:text-xl xl:text-2xl leading-relaxed xl:leading-9">
            {post.summary}
          </p>
        </div>

        <div className="lg:basis-1/2 w-full lg:w-1/2 min-h-[236px] h-[300px] sm:h-[350px] md:h-[470px] lg:h-[350px] xl:h-[400px] 2xl:h-[450px] relative">
          <Image
            className="object-cover grayscale group-hover:grayscale-0 duration-300"
            src={post.image}
            alt={post.title}
            placeholder="blur"
            blurDataURL={getShimmerBase64(480, 300)}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={85}
          />
        </div>
      </div>
    </Link>
  )
}

export default Post
