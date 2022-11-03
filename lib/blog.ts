import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDir = join(process.cwd(), "_posts");

const getPostFileNames = (): string[] => {
  return fs.readdirSync(postsDir);
};

const getAllPostNames = (): string[] => {
  return getPostFileNames().map((postName) => postName.replace(/\.md$/g, ""));
};

const getPostContent = (postName: string) => {
  const postFilePath = join(postsDir, `${postName}.md`);
  const postContent = fs.readFileSync(postFilePath, "utf-8");
  const { data, content } = matter(postContent);

  return {
    data,
    content,
    path: `/entry/${postName}`,
    slug: postName,
  };
};

const getPost = (postName: string) => {
  return getPostContent(postName);
};

const getAllPosts = () => {
  const allPostNames = getAllPostNames();

  return allPostNames.map((postName) => {
    return getPostContent(postName);
  });
};

export { getAllPostNames, getPost, getAllPosts };
