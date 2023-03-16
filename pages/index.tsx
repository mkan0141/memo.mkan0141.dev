import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import Layout from 'components/layout';

import { getAllPosts } from 'lib/blog';

const Home: NextPage = (props: any) => {
  return (
    <ul className="mt-8">
      {props.posts.map((post: any) => (
        <li className="mt-6 list-none" key={post.title}>
          <div className="text-sm text-zinc-500">
            <time>{post.publish_at}</time>
          </div>
          <Link
            href={post.path}
            className="text-base text-orange-600 underline decoration-orange-600"
          >
            {post.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Home;

export const getStaticProps = async () => {
  const posts = getAllPosts();
  return { props: { posts } };
};
