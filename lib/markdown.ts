import { remark } from "remark";

import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";

const markdownToHtml = async (markdown: string) => {
  const html = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(markdown);

  return html.toString();
};

export { markdownToHtml };
