import Image from "next/image";
import { getShimmerBase64 } from "../lib/getShimmer";

const Tstrong = (props: any) => (
  <span className="font-bold text-red-500" {...props} />
);

const MDXComponents = {
  h1: (props: any) => <h1 className="text-3xl mb-4" {...props} />,
  h2: (props: any) => <h2 className="text-2xl mb-4" {...props} />,
  h3: (props: any) => <h3 className="text-xl mb-4" {...props} />,
  // h2: (props: any) => (
  //   <DocsHeading as="h2" fontSize="35px"  fontWeight="bold"  {...props} />
  // ),
  // h3: (props: any) => <DocsHeading as="h3" fontSize="25px" fontWeight="bold" {...props} />,
  // inlineCode: (props: any) => <Code color="white" backgroundColor="black" {...props} />,
  // kbd: Kbd,
  // br: (props: any) => <Box height="24px" {...props} />,
  // hr: <hr />,
  // table: Table,
  // th: THead,
  // td: TData,
  // a: CustomLink,
  img: (props: any) => {
    console.log(props);
    return (
      <p className="relative w-full min-h-[181px]">
        <Image
          className="object-contain"
          src={props.src}
          layout={"fill"}
          alt={props.alt}
          sizes="(max-width: 1536px) 100vw,(max-width: 1024px) 50vw,33vw"
          placeholder="blur"
          blurDataURL={getShimmerBase64(350, 350)}
        />
      </p>
    );
  },
  p: (props: any) => (
    <p className="text-lg text-slate-700 w-full" {...props}></p>
  ),
  ul: (props: any) => <ul className="list-none" {...props} />,
  ol: (props: any) => <ol className="list-none" {...props} />,
  li: (props: any) => <li className="ml-4" {...props} />,
  strong: Tstrong,
  // CodeSandBox,
  // EventBubbling,
  // EventCapturing,
  // AsyncWithtHook,
  // ToggleWithHook,
  // CounterExample,
  // CounterPrevExample,
  // blockquote: Quote,
};

export default MDXComponents;
