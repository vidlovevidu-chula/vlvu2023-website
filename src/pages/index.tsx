import { DescribeRoute } from "@components/Meta/DescribeRoute"
import type { NextPage } from "next"

const Home: NextPage = () => {
  return (
    <DescribeRoute title="Next.js boilerplate" description="by betich">
      <main>
        <h1>Next.js App</h1>
        <p className="mt-2 mb-4 text-sm font-bold text-white">
          Generated using{" "}
          <a href="https://github.com/betich/next-boilerplate" target="_blank" rel="noreferrer">
            {"betich's"}
          </a>{" "}
          Next.js boilerplate template
        </p>
      </main>
    </DescribeRoute>
  )
}

export default Home
