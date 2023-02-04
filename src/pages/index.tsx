import { Button } from "@components/common/Button"
import { DescribeRoute } from "@components/Meta/DescribeRoute"

export default function Home() {
  return (
    <DescribeRoute title="Vid Love Vid U" description="Vid Love Vid U">
      <div className="bg-vlvu-pink-100 font-display min-h-screen w-full">
        <main className="text-vlvu-pink-500 mx-auto max-w-lg">
          <div className="flex flex-col items-center justify-center h-screen gap-6">
            <div>
              <h1 className="font-semibold text-lg text-center">Welcome!</h1>
              <p className="text-center">มาตามหาดอกไม้สำหรับคุณกัน</p>
            </div>

            <Button type="primary">Ready ?</Button>
          </div>
        </main>
      </div>
    </DescribeRoute>
  )
}
