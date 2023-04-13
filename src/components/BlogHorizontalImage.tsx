import Image from "next/image"
import { getShimmerBase64 } from "@/lib/getShimmer"

const BlogHorizontalImage = ({
  url,
  alt,
  isPriority,
}: {
  url: string
  alt: string
  isPriority?: boolean
}) => {
  return (
    <div className="relative w-screen mobile:w-full h-72 -ml-4 mobile:m-0 sm:h-80 md:h-96 lg:h-[520px]">
      <Image
        className="object-cover"
        src={url}
        alt={alt}
        placeholder="blur"
        blurDataURL={getShimmerBase64(860, 520)}
        fill
        sizes="(max-width: 480px) 100vw, (max-width: 1280px) 90vw, 70vw"
        quality={90}
        priority={isPriority}
      />
    </div>
  )
}

export default BlogHorizontalImage
