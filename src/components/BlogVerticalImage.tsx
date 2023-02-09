import React from 'react'
import Image from 'next/image'
import { getShimmerBase64 } from '../lib/getShimmer'

const BlogHorizontalImage = ({url, alt}: {url: string, alt: string}) => {
  return (
    <div className="relative w-full h-[600px] lg:h-[650px]">
      <Image
        className="object-contain"
        src={url}
        alt={alt}
        fill
        placeholder="blur"
        blurDataURL={getShimmerBase64(860, 650)}
      />
    </div>
  )
}

export default BlogHorizontalImage