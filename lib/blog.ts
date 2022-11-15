import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

type Post = {
  title: string;
  publish_at: string;
  tags: string[];
  path: string;
  content: string;
};

const postsDir = join(process.cwd(), "_posts");

const getPostFileNames = (): string[] => {
  return fs.readdirSync(postsDir);
};

const getAllPostNames = (): string[] => {
  return getPostFileNames().map((postName) => postName.replace(/\.md$/g, ""));
};

const getPostContent = (postName: string): Post => {
  const postFilePath = join(postsDir, `${postName}.md`);
  const postContent = fs.readFileSync(postFilePath, "utf-8");
  const { data, content } = matter(postContent);

  return {
    title: data.title,
    publish_at: data.publish_at,
    tags: data.tags,
    path: `/entry/${postName}`,
    content,
  };
};

const getPost = (postName: string): Post => {
  return getPostContent(postName);
};

const getAllPosts = (): Post[] => {
  const allPostNames = getAllPostNames();

  return allPostNames.map((postName) => {
    return getPostContent(postName);
  });
};

export { getAllPostNames, getPost, getAllPosts };
