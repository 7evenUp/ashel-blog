import React from 'react'
import Image from 'next/image'
import { getShimmerBase64 } from '../lib/getShimmer'

const BlogHorizontalImage = ({url, alt}: {url: string, alt: string}) => {
  return (
    <div className="relative w-screen mobile:w-full h-72 -ml-4 mobile:m-0 sm:h-80 md:h-96 lg:h-[520px]">
      <Image
        className="object-cover"
        src={url}
        layout={"fill"}
        alt={alt}
        sizes="(max-width: 1536px) 100vw,(max-width: 1024px) 50vw,33vw"
        placeholder="blur"
        blurDataURL={getShimmerBase64(350, 350)}
      />
    </div>
  )
}

export default BlogHorizontalImage