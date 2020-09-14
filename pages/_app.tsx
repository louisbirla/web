import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ChakraProvider } from '@chakra-ui/core'
import { customTheme } from '../utils/theme/theme'
import { Metadata } from '../components/Metadata'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import { init } from '@sentry/react'

const prod = process.env.NODE_ENV === 'production'

if (prod) {
  init({
    dsn: 'https://190272e39fa74484a58c821b9ed30555@o336780.ingest.sentry.io/5420493',
  })
}

const client = new ApolloClient({
  uri: 'https://api.loop.page',
  cache: new InMemoryCache(),
})

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider resetCSS theme={customTheme}>
        <Metadata ga={prod} />
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
