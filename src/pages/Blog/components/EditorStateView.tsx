import React from "react";
import Image from "next/image";
import {
  PostParagraphType,
  PostDataType,
  PostImageType,
  TextNodeType,
  PostListType,
} from "../types";

const EditorStateView = ({ data }) => {
  if (!data) return null;

  return (
    <div className="flex flex-col w-full text-sm mobile:text-lg leading-relaxed xl:max-w-[1000px]">
      {JSON.parse(data).root.children.map(renderData)}
    </div>
  );
};

export default EditorStateView;

const renderData = (rootElement: PostDataType) => {
  if (rootElement.type === "heading") {
    if (rootElement.tag === "h1")
      return (
        <h2 className="text-2xl font-medium mb-4 mt-6">
          {rootElement.children[0]?.text}
        </h2>
      );
    else if (rootElement.tag === "h2")
      return (
        <h3 className="text-xl font-medium mb-2 mt-4">
          {rootElement.children[0]?.text}
        </h3>
      );
    else if (rootElement.tag === "h3")
      return (
        <h3 className="text-lg font-medium mb-2 mt-4">
          {rootElement.children[0]?.text}
        </h3>
      );
  } else if (rootElement.type === "paragraph")
    return renderParagraph(rootElement);
  else if (rootElement.type === "list") return renderList(rootElement);
  else if (rootElement.type === "quote") return renderBlockquote(rootElement);
  else if (rootElement.type === "code") return renderCode(rootElement);
  else if (rootElement.type === "horizontalrule")
    return (
      <div className="w-full my-8 flex justify-center gap-3">
        {new Array(5).fill(null).map((_, i) => (
          <span key={i} className="w-1 h-1 rounded-full bg-grey" />
        ))}
      </div>
    );
  else return <span>Not heading</span>;
};

const renderParagraph = (rootElement: PostDataType) => {
  if (rootElement.direction === null)
    return renderImage(rootElement.children[0]);
  else if (rootElement.format === "left")
    return (
      <p className="text-left my-1">
        {rootElement.children.map(renderParagraphChildren)}
      </p>
    );
  else if (rootElement.format === "center")
    return (
      <p className="text-center">
        {rootElement.children.map(renderParagraphChildren)}
      </p>
    );
  else if (rootElement.format === "right")
    return (
      <p className="text-right">
        {rootElement.children.map(renderParagraphChildren)}
      </p>
    );
  return (
    <p className="my-1">{rootElement.children.map(renderParagraphChildren)}</p>
  );
};

const renderParagraphChildren = (textEl: PostParagraphType & TextNodeType) => {
  if (textEl.type === "linebreak") return <br />;
  else if (textEl.type === "link")
    return (
      <a
        className="underline underline-offset-2 text-cyan-500"
        href={textEl.url}
        target="_blank"
        rel="noreferrer"
      >
        {textEl.children[0].text}
      </a>
    );
  else if (textEl.type === "text") return renderTextNode(textEl);
};

const renderTextNode = (textNode: TextNodeType) => {
  if (textNode.format === 0)
    return <React.Fragment>{textNode.text}</React.Fragment>;
  else if (textNode.format === 1) return <b>{textNode.text}</b>;
  else if (textNode.format === 2) return <i>{textNode.text}</i>;
  else if (textNode.format === 4)
    return <span className="line-through">{textNode.text}</span>;
  else if (textNode.format === 8)
    return <span className="underline">{textNode.text}</span>;
  else if (textNode.format === 32) return <sub>{textNode.text}</sub>;
  else if (textNode.format === 64) return <sup>{textNode.text}</sup>;
};

const renderImage = (imageElement: PostImageType) => {
  return (
    <Image
      className="my-8"
      src={imageElement.src}
      alt={imageElement.altText}
      width={500}
      height={300}
      objectFit="cover"
      layout="responsive"
    />
  );
};

const renderList = (rootElement: PostListType) => {
  if (rootElement.listType === "bullet") {
    return (
      <ul className="list-disc list-inside ml-4">
        {rootElement.children.map((el, i) => {
          return <li key={i}>{el.children?.map(renderParagraphChildren)}</li>;
        })}
      </ul>
    );
  } else if (rootElement.listType === "number") {
    return (
      <ol className="list-decimal list-inside ml-4">
        {rootElement.children.map((el, i) => {
          return <li key={i}>{el.children?.map(renderParagraphChildren)}</li>;
        })}
      </ol>
    );
  } else if (rootElement.listType === "check") {
    return (
      <div>
        {rootElement.children.map((el, i) => (
          <div key={i} className="flex gap-2 items-center">
            <span
              className={`border rounded w-5 h-5 block ${
                el.checked ? "border-cyan-400" : "border-slate-400"
              }`}
            />
            {el.children?.map(renderParagraphChildren)}
          </div>
        ))}
      </div>
    );
  }
};

const renderBlockquote = (rootElement) => {
  return (
    <div className="border-l-4 border-grey text-grey ml-4 pl-2 my-4">
      {rootElement.children.map(renderParagraphChildren)}
    </div>
  );
};

const renderCode = (rootElement) => {
  return (
    <pre>
      {rootElement.children.map((el) => {
        if (el.type === "linebreak") return <br />;
        else if (el.type === "code-highlight") {
          if (el.highlightType) {
            if (el.highlightType === "keyword")
              return <span className="text-red-400">{el.text}</span>;
            else if (el.highlightType === "operator")
              return <span className="text-orange-400">{el.text}</span>;
            else if (el.highlightType === "string")
              return <span className="text-green-400">{el.text}</span>;
            else if (el.highlightType === "punctuation")
              return <span className="text-green-400">{el.text}</span>;
            else if (el.highlightType === "constant")
              return <span className="text-amber-300">{el.text}</span>;
            else if (el.highlightType === "function-variable")
              return <span className="text-purple-200">{el.text}</span>;
          } else {
            return el.text;
          }
        }
      })}
    </pre>
  );
};
