import { screen, SelectorMatcherOptions } from '@testing-library/react'
import { customTheme } from '../utils/theme/theme'
import { ChakraProvider, ColorMode, useColorMode } from '@chakra-ui/core'
import '@testing-library/jest-dom'
import { useEffect } from 'react'

const UseColor: React.FC<{ colorMode: ColorMode }> = ({ colorMode }) => {
  const { setColorMode } = useColorMode()
  useEffect(() => {
    setColorMode(colorMode)
  }, [colorMode])
  return <></>
}

export const ChakraWrapper: React.FC<{ colorMode?: ColorMode }> = ({ children, colorMode }) => {
  return (
    <ChakraProvider resetCSS theme={customTheme}>
      {colorMode && <UseColor colorMode={colorMode} />}
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
