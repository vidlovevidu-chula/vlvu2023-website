import markdownToHtml from "@/lib/parseMarkDown"
import { InferGetStaticPropsType } from "next"
import { join } from "path"

export async function getStaticProps() {
  const pp = join(process.cwd(), "/src/data/privacy-policy.md")

  const content = await markdownToHtml(pp || "")

  return {
    props: {
      content,
    },
  }
}

export default function PrivacyPolicy({ content }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 w-full h-full px-8 py-4 bg-vlvu-pink-100 text-vlvu-pink-600 font-display">
      <h1 className="text-xl mt-4 mb-4 font-bold md:text-4xl">ข้อตกลงและเงื่อนไขในการใช้งาน</h1>

      <article
        className="prose lg:prose-xl leading-6 prose-p:inline font-texts"
        id="tos"
        dangerouslySetInnerHTML={{ __html: content }}
      ></article>
    </div>
  )
}
