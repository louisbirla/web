import { Image as ChakraImage, ImageProps, useColorMode } from '@chakra-ui/core'
import { dark } from '../../utils/theme/dark'

export const Image: React.FC<ImageProps> = (props) => {
  const { colorMode } = useColorMode()
  return <ChakraImage width='xl' style={{ filter: dark({ colorMode }) ? 'invert(1)' : undefined }} {...props} />
}
