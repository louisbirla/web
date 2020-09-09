import { BoxProps, Box } from '@chakra-ui/core'

export const Card: React.FC<BoxProps> = (props) => {
  const { children } = props
  return (
    <Box {...props} display='inline-block' border='2px solid' borderColor='white' boxShadow='md' rounded='lg' p={6}>
      {children}
    </Box>
  )
}
