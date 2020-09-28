import NextDocument, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/core'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await NextDocument.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <ColorModeScript initialColorMode='system' />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
