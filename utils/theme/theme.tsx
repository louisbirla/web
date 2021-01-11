import { extendTheme } from "@chakra-ui/core"

export const customTheme = extendTheme({
  styles: {
    global: () => ({
      body: {
        bg: "white",
        color: "black",
        fontFamily: "body",
        lineHeight: "base",
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        variant: "ghost",
      },
    },
  },
})
