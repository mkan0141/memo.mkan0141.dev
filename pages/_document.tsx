import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="font-note-sans-jp">
        <Main></Main>
        <NextScript></NextScript>
      </body>
    </Html>
  );
};

export default Document;
