import { AppProps } from 'next/dist/next-server/lib/router/router'
import { ChakraProvider } from '@chakra-ui/core'
import { customTheme } from '../utils/theme/theme'
import {Metadata} from '../components/Metadata'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      <Metadata />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
