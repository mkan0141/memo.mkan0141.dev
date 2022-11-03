import { markdownToHtml } from "lib/markdown";
import { getAllPostNames, getPost } from "lib/blog";
import "prismjs/themes/prism-tomorrow.min.css";

type Props = {
  html: any;
  data: any;
};

const Post = (props: Props) => {
  const { html, data } = props;
  const { title, publish_at } = data;

  return (
    <>
      <article>
        <div className="">
          <h1 className="text-3xl font-bold">{title}</h1>
          <time className="mt-8">{publish_at}</time>
        </div>
        <div
          className="entry-body"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </article>
    </>
  );
};

export async function getStaticPaths() {
  const allPostNames = getAllPostNames();
  return {
    paths: allPostNames.map((postName) => ({
      params: {
        slug: postName,
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }: any) {
  const { content, data } = getPost(params.slug);
  const html = await markdownToHtml(content);
  console.log("[DEBUG]", data, content);

  return {
    props: {
      data,
      html,
    },
  };
}

export default Post;
