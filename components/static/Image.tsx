import { Image as ChakraImage, ImageProps } from "@chakra-ui/core"

export const Image: React.FC<ImageProps> = (props) => {
	return <ChakraImage width='xl' {...props} />
}
