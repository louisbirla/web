import { render, RenderOptions, screen } from '@testing-library/react'
import { customTheme } from '../utils/theme/theme'
import { ChakraProvider } from '@chakra-ui/core'
import { ReactElement } from 'react'
import '@testing-library/jest-dom'

const Providers: React.FC = ({ children }) => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      {children}
    </ChakraProvider>
  )
}

const customRender = (ui: ReactElement, options: Omit<RenderOptions, 'queries'> = {}) =>
  render(ui, { wrapper: Providers, ...options })

export const findFirstText = async (text: string) => {
  const instances = await screen.findAllByText(text)
  return instances[0]
}

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
