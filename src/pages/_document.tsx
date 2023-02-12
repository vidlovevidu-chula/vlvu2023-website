import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from "next/document"

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="th">
        <Head>
          <meta charSet="utf-8" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="apple-touch-icon" sizes="180x180" href="/assets/meta/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/assets/meta/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/assets/meta/favicon-16x16.png" />
          <script async src="https://www.googletagmanager.com/gtag/js?id=G-NKCB853XT4"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NKCB853XT4', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
