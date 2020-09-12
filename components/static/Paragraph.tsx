import { Text, Container } from '@chakra-ui/core'

export const Paragraph: React.FC = ({ children }) => {
  return (
    <Container maxW='sm'>
      <Text>{children}</Text>
    </Container>
  )
}
