import { ImageProps, Image, useColorMode } from '@chakra-ui/core'
import { dark } from '../utils/theme/dark'
import { useState, useEffect } from 'react'

/** The logo, which changes dynamically based on color mode */
export const LogoImage: React.FC<ImageProps & { skipLoading?: boolean }> = (props) => {
  // The image shows an ugly alt before loading, so don't show before loaded
  const [isLoading, setIsLoading] = useState(true)
  // Choose the right version of the logo
  const { colorMode } = useColorMode()
  const src = dark({ colorMode }) ? '/donuts/white-donut.svg' : '/donuts/black-donut.svg'
  const onLoad = () => setIsLoading(false)
  useEffect(() => {
    if (props.skipLoading) {
      onLoad()
    }
  }, [onLoad, props.skipLoading])

  return (
    <Image
      opacity={isLoading ? 0 : 1}
      title={isLoading ? 'logo loading' : 'loop logo'}
      onLoad={onLoad}
      src={src}
      alt='Loop Logo'
      {...props}
    />
  )
}
