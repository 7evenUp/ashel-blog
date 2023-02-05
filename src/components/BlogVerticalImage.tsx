import React from 'react'
import Image from 'next/image'
import { getShimmerBase64 } from '../lib/getShimmer'

const BlogHorizontalImage = ({url, alt}: {url: string, alt: string}) => {
  return (
    <div className="relative w-full h-[600px] lg:h-[650px]">
      <Image
        className="object-contain"
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