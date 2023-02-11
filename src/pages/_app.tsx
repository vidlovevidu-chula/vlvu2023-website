import "@styles/tailwind.css"
import "@styles/fonts.css"
import type { AppProps } from "next/app"
import { AuthProvider } from "@/lib/auth"
import { DescribeRoute } from "@/components/Meta/DescribeRoute"
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DescribeRoute title="Vid Love Vid U" description="14 Feb 2023" imgURL="/assets/banner.png">
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </DescribeRoute>
  )
}
export default MyApp
