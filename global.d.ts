export type StaticBlog = {
  id: string;
  title: string;
  publishedAt: Date;
  summary: string;
  image: string;
  languageTags: string[];
  readingTime: string;
};

type MatterTypes = {
  wordCount: number;
  slug: string;
  summary: string;
  readingTime: {
    text: string;
    minutes: number;
    time: number;
    words: number;
  };
};

export type MdxSource = {
  compiledSource: string;
  renderedOutput: string;
};

export type FrontMatterTypes = StaticBlog & MatterTypes;