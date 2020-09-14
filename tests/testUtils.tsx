import { render, RenderOptions, screen, SelectorMatcherOptions } from '@testing-library/react'
import { customTheme } from '../utils/theme/theme'
import { ChakraProvider } from '@chakra-ui/core'
import { ReactElement } from 'react'
import '@testing-library/jest-dom'

/** Wraps the renders with the styling from chakra */
const Providers: React.FC = ({ children }) => {
  return <>{children}</>
}

export const ChakraWrapper: React.FC = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      {children}
    </ChakraProvider>
  )
}

const customRender = (ui: ReactElement, options: Omit<RenderOptions, 'queries'> = {}) =>
  render(ui, { wrapper: Providers, ...options })

export const findFirstText = async (text: string, options?: SelectorMatcherOptions) => {
  const instances = await screen.findAllByText(text, options)
  return instances[0]
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
