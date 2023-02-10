import chrome from "chrome-aws-lambda"
import puppeteer from "puppeteer-core"

export default async function screenshot(url: string, width: number = 911, height: number = 1638) {
  const options = process.env.AWS_REGION
    ? {
        args: chrome.args,
        executablePath: await chrome.executablePath,
        headless: chrome.headless,
      }
    : {
        args: [],
        executablePath:
          process.platform === "win32"
            ? "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
            : process.platform === "linux"
            ? "/usr/bin/google-chrome"
            : "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      }

  const browser = await puppeteer.launch(options)
  const page = await browser.newPage()
  await page.evaluate(() => (document.body.style.background = "transparent"))
  await page.setViewport({ width, height })
  await page.goto(url, { waitUntil: "networkidle2" })
  await page.waitForTimeout(3000)
  return await page.screenshot({ type: "png", omitBackground: true })
}
