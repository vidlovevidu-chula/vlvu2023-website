import { read } from "to-vfile"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkHtml from "remark-html"

export default async function markdownToHtml(fileName: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkHtml)
    .process(await read(fileName))

  return String(file)
}
