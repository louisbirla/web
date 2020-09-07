import { extendTheme } from '@chakra-ui/core'
import { dark } from './dark'

export const customTheme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        bg: dark(props) ? 'black' : 'white',
        color: dark(props) ? 'white' : 'black',
        fontFamily: 'body',
        lineHeight: 'base',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        variant: 'ghost',
      },
    },
  },
})
