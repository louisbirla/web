import { screen, SelectorMatcherOptions } from "@testing-library/react"
import { customTheme } from "../utils/theme/theme"
import { ChakraProvider } from "@chakra-ui/core"
import "@testing-library/jest-dom"

export const ChakraWrapper: React.FC = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      {children}
    </ChakraProvider>
  )
}

export const findFirstText = async (text: string, options?: SelectorMatcherOptions) => {
  const instances = await screen.findAllByText(text, options)
  return instances[0]
}

export const jukeError = async (toRun: () => void) => {
  const originalError = console.error
  console.error = jest.fn()
  toRun()
  console.error = originalError
}
