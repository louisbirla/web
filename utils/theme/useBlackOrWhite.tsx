import { useColorMode } from "@chakra-ui/core"

export const useBlackOrWhite = () => {
  const { colorMode } = useColorMode()
  if (colorMode === 'light') {
    return {
      color: 'black',
      opposite: 'white',
    }
  }
  return {
    color: 'white',
    opposite: 'black'
  }
}
