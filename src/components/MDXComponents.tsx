import Image from "next/image"
import Link from "next/link"
import { getShimmerBase64 } from "../lib/getShimmer"
import BlogHorizontalImage from "./BlogHorizontalImage"
import BlogVerticalImage from "./BlogVerticalImage"
import Callout from "./Callout"
import Card from "./Card"

const Quote = (props: any) => (
  <blockquote className="text-lg px-2 py-1 my-4 bg-beige" {...props}>
    <p className="italic text-black w-full">
      {props.children[1].props.children}
    </p>
  </blockquote>
)

const CustomImage = (props: any) => {
  console.log(props)
  return (
    <p className="relative w-full min-h-[181px]">
      <Image
        className="object-contain"
        src={props.src}
        alt={props.alt}
        placeholder="blur"
        blurDataURL={getShimmerBase64(350, 350)}
        fill
      />
    </p>
  )
}

const CustomLink = (props: any) => {
  const href = props.href
  const isInternalLink = href && (href.startsWith("/") || href.startsWith("#"))

  if (isInternalLink) return <Link {...props} />

  return (
    <Link
      {...props}
      className="text-indigo-700 hover:text-indigo-400 transition-all"
      target="_blank"
      rel="noreferrer"
    />
  )
}

const CustomHR = () => (
  <div className="flex justify-center gap-2 my-10 mobile:my-20">
    {Array(5)
      .fill(null)
      .map((_, i) => (
        <span key={i} className="w-1 h-1 rounded-full bg-black" />
      ))}
  </div>
)

const MDXComponents = {
  h1: (props: any) => <h1 className="text-3xl lg:text-4xl mb-4" {...props} />,
  h2: (props: any) => (
    <h2 className="text-xl lg:text-2xl mb-2 mt-4 text-grey" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-2xl lg:text-3xl mt-8 mb-2 font-bold" {...props} />
  ),
  hr: CustomHR,
  a: CustomLink,
  blockquote: Quote,
  img: CustomImage,
  p: (props: any) => (
    <p
      className="text-base lg:text-lg text-black w-full leading-relaxed lg:leading-loose"
      {...props}
    ></p>
  ),
  ul: (props: any) => (
    <ul className=" list-disc flex flex-col gap-1 mb-4" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal flex flex-col gap-1 mb-4" {...props} />
  ),
  li: (props: any) => (
    <li
      className="text-sm mobile:text-base lg:text-lg leading-relaxed ml-4 mobile:ml-8"
      {...props}
    />
  ),
  code: (props: any) => (
    <code className="bg-slate-300 rounded-md px-2 py-1 bg-opacity-50" {...props} />
  ),
  BlogHorizontalImage,
  BlogVerticalImage,
  Callout,
  Card,
}

export default MDXComponents
