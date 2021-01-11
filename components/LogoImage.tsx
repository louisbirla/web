import { ImageProps, Image } from "@chakra-ui/core"
import { useState, useEffect } from "react"

export const LogoImage: React.FC<ImageProps & { skipLoading?: boolean }> = (props) => {
  // The image shows an ugly alt before loading, so don't show before loaded
  const [isLoading, setIsLoading] = useState(true)
  const src = "/donuts/black-donut.svg"
  const onLoad = () => setIsLoading(false)
  useEffect(() => {
    if (props.skipLoading) {
      onLoad()
    }
  }, [onLoad, props.skipLoading])

  return (
    <Image
      opacity={isLoading ? 0 : 1}
      title={isLoading ? "logo loading" : "loop logo"}
      onLoad={onLoad}
      src={src}
      alt='Loop Logo'
      {...props}
    />
  )
}
