import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify";
import remarkPrism from "remark-prism";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";
import "prismjs/themes/prism-twilight.css";

const markdownToHtml = async (markdown: string) => {
  const html = await remark()
    .use(remarkHtml, { sanitize: false })
    .use(remarkGfm)
    .use(remarkPrism)
    .use(remarkParse)
    .use(remarkStringify)
    .process(markdown);

  return html.toString();
};

export { markdownToHtml };
