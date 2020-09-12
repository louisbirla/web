import { HeadingProps, Heading } from '@chakra-ui/core'

export const SectionHeading: React.FC<HeadingProps> = (props) => {
  const { children } = props
  return (
    <Heading maxW='sm' display='inline-block' textAlign='center' as='h2' {...props} fontSize='2.5rem'>
      {children}
    </Heading>
  )
}
