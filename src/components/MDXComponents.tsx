const Tstrong = (props: any) => <span className="font-bold text-red-500" {...props} />;

const MDXComponents = {
  h1: (props: any) => <h1 className="text-3xl mb-4" {...props} />,
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
  // img: TImage,
  p: (props: any) => <p className="text-lg text-green-500" {...props}></p>,
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

export default MDXComponents