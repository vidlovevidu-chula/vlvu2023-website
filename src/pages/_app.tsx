import "@styles/tailwind.css"
import "@styles/fonts.css"
import type { AppProps } from "next/app"
import { AuthProvider } from "@/lib/auth"
import { DescribeRoute } from "@/components/Meta/DescribeRoute"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DescribeRoute
      title="Vid Love Vid U"
      description="วันที่ 14 กุมภาพันธ์ 2566 เวลา 16.30 เป็นต้นไป ณ ลานจักร-ลานเกียร์"
      imgURL="/assets/meta/banner.png"
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </DescribeRoute>
  )
}
export default MyApp
