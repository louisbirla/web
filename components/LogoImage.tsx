import { ImageProps, Image, useColorMode } from '@chakra-ui/core'
import { dark } from '../utils/theme/dark'

export const LogoImage: React.FC<ImageProps> = (props) => {
  const { colorMode } = useColorMode()
  const src = dark({ colorMode }) ? '/donuts/white-donut.svg' : '/donuts/black-donut.svg'
  return <Image src={src} alt='Loop Logo' {...props} />
}
