import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from 'components/layout';
import Script from 'next/script';
import Head from 'next/head';
import { Noto_Sans_JP } from 'next/font/google';

const notoSansJp = Noto_Sans_JP({
  weight: ['400', '700'],
  preload: false,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>memo.mkan0141.dev</title>
        <meta name="description" content="mkan0141の日記帳" />
      </Head>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-P2YRZ64G57"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-P2YRZ64G57');
        `}
      </Script>
      <main className={notoSansJp.className}>
        <Component {...pageProps} />
      </main>
    </Layout>
  );
}

export default MyApp;
