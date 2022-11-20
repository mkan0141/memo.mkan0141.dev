import { markdownToHtml } from 'lib/markdown';
import { getAllPostNames, getPost } from 'lib/blog';
import 'prismjs/themes/prism-tomorrow.min.css';
import { GetStaticPropsContext } from 'next';

type Props = {
  title: string;
  publish_at: string;
  tags: string[];
  path: string;
  html: string;
};

const Post = (props: Props) => {
  const { title, publish_at, tags, path, html } = props;

  return (
    <>
      <article>
        <div>
          <h1 className="text-4xl font-bold text-zinc-700">{title}</h1>
          <div className="mt-2 text-zinc-500">
            <time className="">{publish_at}</time>
          </div>
        </div>
        <div
          className="entry-body mt-4"
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

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { title, publish_at, tags, path, content } = getPost(
    params?.slug as string
  );
  const html = await markdownToHtml(content);

  return {
    props: {
      slug: params?.slug,
      title,
      publish_at,
      tags,
      path,
      html,
    },
  };
}

export default Post;
